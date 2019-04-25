<template>
  <main>
    <h1
      v-show="!formSent"
      class="title"
    >
      Contact
    </h1>
    <div v-if="!formSent">
      <form
        name="contact"
        netlify-honeypot="emailField"
        data-netlify="true"
        method="POST"
        @submit.prevent="processForm"
      >
        <input
          type="hidden"
          name="form-name"
          value="contact"
        >
        <p class="nope">
          <input
            v-model="formData.nameField"
            v-validate="{ regex: /^\z/ }"
            type="text"
            name="nameField"
          >
        </p>
        <p class="nope">
          <input
            v-model="formData.emailField"
            type="text"
            name="emailField"
          >
        </p>
        <p>
          <input
            id="name"
            v-model="formData.name"
            v-validate="{ required: true, regex: /^([a-zA-Z ']*)$/ }"
            type="text"
            class="form-field"
            name="name"
          >
          <label
            class="form-label"
            for="name"
          >
            Name:
          </label>
          <span
            v-show="errors.has('name')"
            class="error"
          >
            {{
              errors.first('name')
            }}
          </span>
        </p>
        <p>
          <input
            id="email"
            v-model="formData.email"
            v-validate="{ required: true, email: true }"
            type="text"
            class="form-field"
            name="email"
          >
          <label
            class="form-label"
            for="email"
          >
            Email:
          </label>
          <span
            v-show="errors.has('email')"
            class="error"
          >
            {{
              errors.first('email')
            }}
          </span>
        </p>
        <p class="nope">
          <label
            class="form-label"
            for="nope"
          >
            Email:
          </label>
          <input
            id="required"
            v-model="formData.nope"
            type="text"
            class="form-field"
            name="nope"
          >
        </p>
        <p>
          <textarea
            id="message"
            v-model="formData.message"
            v-validate="{ required: true }"
            class="form-field"
            name="message"
          />
          <label class="form-label" for="message">Message:</label>
          <span v-show="errors.has('message')" class="error">
            {{
              errors.first('message')
            }}
          </span>
        </p>
        <button
          :disabled="!validForm"
          type="submit"
          class="button submit filled"
          @click.prevent="processForm"
        >
          Send
        </button>
      </form>
    </div>
    <div v-else class="fill sent">
      <h4>Message Sent</h4>
      <h4>{{ formData.name }}, thank you for contacting us.</h4>
    </div>
    <div v-show="error">
      {{ formError }}
    </div>
    <Warranty />
  </main>
</template>

<script>
import Warranty from '~/components/partials/Warranty'

// import VeeValidate, { Validator } from 'vee-validate'

export default {
  name: 'Contact',
  components: {
    Warranty
  },
  props: {
    formSent: {
      type: Boolean,
      default: false
    },
    formError: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
        emailField: ''
      }
    }
  },
  computed: {
    validForm() {
      if (
        this.formData.name &&
        this.formData.email &&
        this.formData.message &&
        !this.errors.any()
      ) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    const header = [
      {
        image: 'header-contact',
        heroTxt: '',
        subTxt:
          'Thank you for your interest in LeStage. Please leave your message below or email us directly at <a href="' +
          encodeURI('mailto:info@lestage.com') +
          '">' +
          encodeURI('info@lestage.com') +
          '</a>'
      }
    ]
    this.$store.dispatch('header/changeHeaders', header)
  },
  head() {
    return {
      title: 'Contact LeStage Manufacturing',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Authentic Cape Cod Jewelry'
        }
      ]
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    processForm(e) {
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.formError =
            'There is a problem with the form fields. Please check all the fields are correct.'
        } else {
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: this.encode({
              'form-name': 'contact',
              ...this.formData
            })
          })
            .then(() => {
              this.formSent = true
              return true
            })
            .catch(() => {
              this.formError =
                'There was a problem sending the form. Please email us to let us know.'
              return false
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.nope {
  @include hide;
}
form {
  margin-bottom: 1rem;
  max-width: 100%;
  padding: 0 1rem;
  * {
    @include font-accent;
  }
  p {
    margin: 2rem auto;
    max-width: 100%;
    position: relative;
    text-align: center;
    width: 500px;
  }
}
label,
input,
textarea,
button {
  display: block;
  outline: none;
}
input:not([type='submit']),
textarea {
  background: #dddddd;
  border: 1px solid #dddddd;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  color: #333333;
  padding: 1rem;
  text-align: left;
  transition: all $transition-duration linear;
  width: 100%;
  &:focus {
    color: #333333;
  }
}
textarea {
  height: 8rem;
}

label {
  cursor: text;
  font-size: 1rem;
  left: 1rem;
  position: absolute;
  transition: all $transition-duration ease-in-out;
  top: 1.25rem;
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

span.error {
  font-size: 0.75rem;
  right: 1rem;
  position: absolute;
  text-align: right;
  top: -1.25rem;
}
input:focus,
textarea:focus {
  background-color: #ffffff;
  // border-color: #ffffff;
  box-shadow: 0 25px 15px -15px rgba(0, 0, 0, 0.25);
  color: #000000;
}

input.invalid,
textarea.invalid {
  border-color: getColor(state, error);
  & ~ label,
  & ~ span.error {
    color: getColor(state, error);
  }
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
button.submit {
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
