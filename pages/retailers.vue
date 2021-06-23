<template>
  <main>
    <h2>Authorized Retailers:</h2>
    <p class="lead-in">
      Enter your zipcode below to find the nearest authorized retailers
    </p>
    <div class="store-type">
      <label>
        <input
          v-model="filterConvertible"
          type="checkbox"
          name="filter-convertible"
        >
        Convertible Collection Retailers
      </label>
      <label>
        <input
          v-model="filterCapeCod"
          type="checkbox"
          name="filter-cape-cod"
        >
        Cape Cod Retailers
      </label>
      <label>
        <input
          v-model="filterEveningTide"
          type="checkbox"
          name="filter-evening-tide"
        >
        Evening Tide Retailers
      </label>
    </div>
    <div class="search">
      <input
        id="address"
        v-model="inputAddress"
        :class="inputAddress.length ? 'dirty' : ''"
        name="address"
        type="text"
        class="address"
        list="addressOptions"
        @keyup.enter="selectFirstAddress"
      >
      <label for="address">Address or Zipcode</label>
      <ul
        v-if="options"
        id="addressOptions"
      >
        <li
          v-for="(option, key) of options"
          :key="key"
          @click="selectAddress(option)"
        >
          {{ option.label }}
        </li>
      </ul>
      <ul
        v-else
        id="addressOptions"
      >
        <li>No results in this area.</li>
      </ul>
    </div>
    <div id="results">
      <div class="map-container">
        <div
          id="map"
          ref="map"
        />
      </div>
      <table
        v-if="filteredList.length"
        id="retailerList"
      >
        <tr
          v-for="(retailer, index) in filteredList"
          :key="index"
          @mouseover="hover(retailer)"
          @click="click(retailer)"
        >
          <td
            class="location"
            v-html="formatAddress(retailer)"
          />
          <td class="info">
            <p>{{ retailer.properties.distance.toFixed(2) }} miles away</p>
            <div class="retailer-type">
              <CapeCodLogo v-if="retailer.properties.capeCod === true" />
              <ConvertibleLogo v-if="retailer.properties.convertible === true" />
              <EveningTideLogo v-if="retailer.properties.eveningTide === true" />
            </div>
          </td>
        </tr>
      </table>

      <div
        v-else
        id="retailerList"
      >
        No Locations In this Area.
      </div>
    </div>
  </main>
</template>

<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import retailers from '~/data/retailers'
import CapeCodLogo from '~/assets/images/logos/logo-cape-cod-icon.svg?inline'
import ConvertibleLogo from '~/assets/images/logos/logo-convertible-icon.svg?inline'
import EveningTideLogo from '~/assets/images/logos/logo-evening-tide-icon.svg?inline'

/**
 * calculateDistance
 * calculate the distance between two points given two arrays of longituted & lattitude
 * NOTE: first array pair is long/lat and second array is lat/long
 * Optionally send unit = "k" for kilometers
 */
function calculateDistance([lon1, lat1], [lat2, lon2], unit) {
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  // K for kilometers
  if (unit === 'K') {
    dist = dist * 1.609344
  }
  return dist
}

/**
 * getFeaturesInView
 *
 * create a list of geoJson features shown on the leaflet map
 * additionally run through all the data points and add the property `distance` and
 * set it equal to the distance to the current `center` (not the center of the map)
 */
function getFeaturesInView(map, center) {
  const features = []
  const L = window.L
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
      if (map.getBounds().contains(layer.getLatLng())) {
        if (layer.feature) {
          layer.feature.properties.distance = calculateDistance(
            layer.feature.geometry.coordinates,
            center
          )
          features.push(layer.feature)
        }
      }
    }
  })

  features.sort(function(a, b) {
    return a.properties.distance - b.properties.distance
  })
  return features
}

export default {
  components: {
    CapeCodLogo,
    ConvertibleLogo,
    EveningTideLogo
  },
  data() {
    return {
      // default to Cape Cod Bay - should be saved as lat/lon
      inputAddress: '',
      center: [41.839598, -70.22163],
      filteredList: [],
      filterCapeCod: true,
      filterConvertible: true,
      filterEveningTide: true,
      map: {},
      allLayer: {},
      capeCodLayer: {},
      convertibleLayer: {},
      eveningTideLayer: {},
      options: [],
      selectedAddress: ''
    }
  },
  watch: {
    async inputAddress(newAddress, oldAddress) {
      const provider = new OpenStreetMapProvider({
        params: {
          countrycodes: 'us',
          limit: 4
        }
      })
      if (newAddress !== this.selectedAddress) {
        const tmpList = await provider.search({ query: newAddress })
        this.options = []
        if (tmpList.length) {
          tmpList.forEach(tmp => {
            this.options.push(tmp)
          })
        }
      }
    },
    filterCapeCod(next, prev) {
      if (next) {
        this.map.addLayer(this.capeCodLayer)
        this.map.addLayer(this.allLayer)
      } else {
        this.map.removeLayer(this.capeCodLayer)
      }
      this.filteredList = getFeaturesInView(this.map, this.center)
    },
    filterConvertible(next, prev) {
      if (next) {
        this.map.addLayer(this.convertibleLayer)
        this.map.addLayer(this.allLayer)
      } else {
        this.map.removeLayer(this.convertibleLayer)
      }
      this.filteredList = getFeaturesInView(this.map, this.center)
    },
    filterEveningTide(next, prev) {
      if (next) {
        this.map.addLayer(this.eveningTideLayer)
        this.map.addLayer(this.allLayer)
      } else {
        this.map.removeLayer(this.eveningTideLayer)
      }
      this.filteredList = getFeaturesInView(this.map, this.center)
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (process.browser) {
        const L = require('leaflet')

        this.map = L.map(this.$refs.map).setView(this.center, 10)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map)

        // add all markers to the map
        this.allLayer = L.geoJSON(retailers, {
          filter: function(feature, layer) {
            return (
              (feature.properties.capeCod === true &&
                feature.properties.convertible === true) ||
              (feature.properties.capeCod === true &&
                feature.properties.eveningtide) ||
              (feature.properties.convertible === true &&
                feature.properties.eveningtide)
            )
          },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(this.formatAddress(feature))
          },
          pointToLayer: function(feature, latlng) {
            const markerIcon = L.icon({
              iconUrl: require('~/assets/images/markers/marker-icon.png'),
              iconRetinaUrl: require('~/assets/images/markers/marker-icon-2x.png'),
              shadowUrl: require('~/assets/images/markers/marker-shadow.png'),
              iconSize: [25, 41], // size of the icon
              // shadowSize: [50, 64], // size of the shadow
              iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
              // shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
            })
            return L.marker(latlng, { icon: markerIcon })
          }
        }).addTo(this.map)

        this.capeCodLayer = L.geoJSON(retailers, {
          filter: function(feature, layer) {
            return (
              feature.properties.convertible !== true &&
              feature.properties.capeCod === true &&
              feature.properties.eveningTide !== true
            )
          },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(this.formatAddress(feature))
          },
          pointToLayer: function(feature, latlng) {
            const markerIcon = L.icon({
              iconUrl: require('~/assets/images/markers/marker-capeCod.png'),
              iconRetinaUrl: require('~/assets/images/markers/marker-capeCod-2x.png'),
              shadowUrl: require('~/assets/images/markers/marker-shadow.png'),
              iconSize: [25, 41], // size of the icon
              // shadowSize: [50, 64], // size of the shadow
              iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
              // shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
            })
            return L.marker(latlng, { icon: markerIcon })
          }
        }).addTo(this.map)

        this.convertibleLayer = L.geoJSON(retailers, {
          filter: function(feature, layer) {
            return (
              feature.properties.convertible === true &&
              feature.properties.capeCod === false
            )
          },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(this.formatAddress(feature))
          },
          pointToLayer: function(feature, latlng) {
            const markerIcon = L.icon({
              iconUrl: require('~/assets/images/markers/marker-convertible.png'),
              iconRetinaUrl: require('~/assets/images/markers/marker-convertible-2x.png'),
              shadowUrl: require('~/assets/images/markers/marker-shadow.png'),
              iconSize: [25, 41], // size of the icon
              // shadowSize: [50, 64], // size of the shadow
              iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
              // shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
            })
            return L.marker(latlng, { icon: markerIcon })
          }
        }).addTo(this.map)

        this.eveningTideLayer = L.geoJSON(retailers, {
          filter: function(feature, layer) {
            return (
              feature.properties.convertible !== true &&
              feature.properties.capeCod !== true &&
              feature.properties.eveningTide === true
            )
          },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(this.formatAddress(feature))
          },
          pointToLayer: function(feature, latlng) {
            const markerIcon = L.icon({
              iconUrl: require('~/assets/images/markers/marker-eveningTide.png'),
              iconRetinaUrl: require('~/assets/images/markers/marker-eveningTide-2x.png'),
              shadowUrl: require('~/assets/images/markers/marker-shadow.png'),
              iconSize: [25, 41], // size of the icon
              // shadowSize: [50, 64], // size of the shadow
              iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
              // shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
            })
            return L.marker(latlng, { icon: markerIcon })
          }
        }).addTo(this.map)

        // add marker to map at this.center
        const markerCenterIcon = L.icon({
          iconUrl: require('~/assets/images/markers/marker-center-icon.png'),
          iconRetinaUrl: require('~/assets/images/markers/marker-center-icon-2x.png'),
          shadowUrl: require('~/assets/images/markers/marker-shadow.png'),

          iconSize: [25, 41], // size of the icon
          // shadowSize: [50, 64] // size of the shadow
          iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
          // shadowAnchor: [4, 62], // the same for the shadow
          popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
        })
        this.centerMarker = L.marker(this.center, {
          icon: markerCenterIcon
        }).addTo(this.map)

        // set initial filtered list
        this.filteredList = getFeaturesInView(this.map, this.center)

        // update filtered list on any move event
        this.map.on('moveend', () => {
          // center of map:
          this.filteredList = getFeaturesInView(this.map, this.center)
        })
      }
    })
  },
  head() {
    return {
      title: 'Find a Cape Cod Retailer',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Locate a Cape Cod Jewelry Retailer near you.'
        }
      ]
    }
  },
  methods: {
    formatAddress(feature) {
      let formattedAddress = '<h6>' + feature.properties.name + '</h6>'
      formattedAddress += '<p>' + feature.properties.address1
      formattedAddress += feature.properties.address2
        ? '<br>' + feature.properties.address2
        : ''
      formattedAddress +=
        '<br>' +
        feature.properties.city +
        ', ' +
        feature.properties.state +
        ' ' +
        feature.properties.zip +
        '</p>'
      return formattedAddress
    },
    selectFirstAddress() {
      // user has pressed return in address field; grab the first autocomplete
      this.selectAddress(this.options[0])
    },
    selectAddress(data) {
      // user has selected an address from the autocomplete options
      this.inputAddress = this.selectedAddress = data.label
      this.options = []
      this.center = [data.y, data.x]
      this.map.flyTo([data.y, data.x], 12)
      this.centerMarker
        .setLatLng([data.y, data.x])
        .bindPopup('<h5>' + data.label + '</h5>')
        .update()
    },
    hover(data) {
      const pos = data.geometry.coordinates
      const L = window.L
      this.map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
          const latLng = layer.getLatLng()
          if (latLng.lat === pos[1] && latLng.lng === pos[0]) {
            layer._icon.classList.add('is-active')
          } else {
            layer._icon.classList.remove('is-active')
          }
        }
      })
    },
    click(data) {
      const pos = data.geometry.coordinates
      const L = window.L
      this.map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
          const latLng = layer.getLatLng()
          if (latLng.lat === pos[1] && latLng.lng === pos[0]) {
            layer.openPopup()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import 'leaflet/dist/leaflet.css';

.lead-in {
  text-align: center;
}
div.search {
  margin: 3rem auto 2rem;
  max-width: 100%;
  position: relative;
  text-align: center;
  width: 600px;

  label,
  input,
  span {
    @include font-accent;
    display: block;
    outline: none;
    text-align: center;
    width: 100%;
  }
  input {
    background: #dddddd;
    border: 1px solid #dddddd;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    color: #333333;
    padding: 1rem;
    transition: all $transition-duration linear;
    &:focus {
      color: #333333;
    }
  }

  label {
    cursor: text;
    font-size: 1rem;
    position: absolute;
    transition: all $transition-duration ease-in-out;
    top: 1rem;
  }
  input:focus,
  textarea:focus,
  input.dirty,
  textarea.dirty {
    & ~ label {
      font-size: 0.75rem;
      top: -1.25rem;
    }
  }

  input:focus,
  textarea:focus {
    background-color: #ffffff;
    // border-color: #ffffff;
    box-shadow: 0 25px 15px -15px rgba(0, 0, 0, 0.25);
    color: #000000;
  }

  input.valid,
  textarea.valid {
    &:not(:focus) {
      border-color: getColor(state, success);
    }
    & ~ label,
    & ~ span.error {
      color: getColor(state, success);
    }
  }
  #addressOptions {
    li {
      @include font-accent;
      font-size: pxToEm(10);
      background: darken(getColor(background, light), 10%);
      padding: 0.5rem 0;
      position: relative;
      &::after {
        background: linear-gradient(
          90deg,
          rgba(125, 125, 125, 0) 0%,
          rgba(125, 125, 125, 1) 50%,
          rgba(125, 125, 125, 0) 100%
        );
        bottom: 0;
        content: '';
        display: block;
        height: 1px;
        position: absolute;
        width: 100%;
        z-index: 12;
      }
      &:hover {
        cursor: pointer;
        background: getColor(background, light);
      }
    }
  }
}

#map {
  border: 2px solid getColor(base, primary);
  display: block;
  height: 400px;
  margin: 1rem auto;
  max-height: 80vh;
  width: 90vw;
  @include tablet {
    margin: 1rem;
  }
  h6 {
    @include font-accent;
    line-height: 1;
    margin: 0 0 1rem;
    text-align: center;
  }
  p {
    line-height: 1;
    margin: 0;
    text-align: center;
  }
}
div#retailerList {
  @include font-accent;
  margin: 1rem auto;
  text-align: center;
}
.retailer-type {
  display: flex;
  flex-direction: row;
  min-height: 60px;
  svg {
    display: inline-block;
    margin: 5px;
    min-height: 40px;
    min-width: 40px;
  }
}
@include tablet {
  #results {
    align-items: flex-start;
    display: flex;
    #map {
      height: 80vh;
      max-height: 80vh;
      max-width: 60vw;
    }
  }
  .map-container {
    align-self: start;
    position: -webkit-sticky;
    position: sticky;
    top: 80px;
  }
  div#retailerList {
    min-width: 40px;
  }
}
table#retailerList {
  background: linear-gradient(
    90deg,
    rgba(125, 125, 125, 0) 0%,
    rgba(125, 125, 125, 1) 50%,
    rgba(125, 125, 125, 0) 100%
  );
  border-collapse: collapse;
  border-spacing: 0;
  margin: 1rem auto;
  width: 100%;
  @include tablet {
    margin: 1rem;
    width: auto;
  }
  tr,
  td {
    background: linear-gradient(to top, transparent 1px, #fff 2px);
  }
  td {
    padding: 0.25rem 0.5rem;
  }
  td {
    vertical-align: middle;
  }
  li {
    @include clearfix;
    align-items: center;
    align-content: center;
    background: white;
    display: flex;
    justify-content: space-between;
    padding: 0.25rem;
    position: relative;
    width: 400px;
  }
  h6,
  p {
    @include font-accent;
    line-height: 1.2;
    text-align: left;
  }
  p {
    font-size: pxToEm(12);
  }
  .info {
    p {
      margin-bottom: 0;
      text-align: right;
    }
  }
}
@keyframes bounce {
  from {
    top: 0;
  }
  to {
    top: -15px;
  }
}
.leaflet-marker-icon.is-active {
  animation: bounce 0.25s 8 alternate;
}
</style>
