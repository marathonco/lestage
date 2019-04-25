<template>
  <main class="content responsibility">
    <h4>We respect and believe in human rights, and strictly adhere to the following:</h4>
    <section>
      <h4>RJC Compliance</h4>
      <p>Marathon Company/LeStage Manufacturing is a jewelry manufacturing and distribution company based in Attleboro, Massachusetts. We have one site located in Attleboro Massachusetts and employ approximately 75 personnel.</p>
      <p>Marathon is a member of the Responsible Jewellery Council (RJC). The RJC is a standards-setting organization that has been established to advance responsible ethical, human rights, social and environmental practices throughout the diamond, gold and platinum group metals jewelry supply chain.</p>
      <p>The RJC has developed a benchmark standard for the jewelry supply chain and credible mechanisms for verifying responsible business practices through third party auditing.</p>
      <p>As an RJC member, we commit to operating our business in accordance with the RJC Code of Practices. We commit to integrating ethical, human rights, social and environmental considerations into our day-to-day operations, business planning activities and decision making processes.</p>
    </section>
    <section>
      <h4>Kimbereley Process</h4>
      <p>The World Diamond Council created a System of Warranties for diamonds that has been endorsed by all KPCS participants. Under this system, Marathon Company/LeStage Manufacturing includes the following affirmative statement on all invoices:</p>
      <p>“The diamonds herein invoiced have been purchased from legitimate sources not involved in funding conflict and in compliance with United Nations resolutions. The seller hereby guarantees that these diamonds are conflict free, based on personal knowledge and/or written guarantees provided by the supplier of these diamonds.”</p>
      <p>It is considered a violation of the KPCS to issue a warranty declaration on a sales invoice unless it can be corroborated by warranty invoices received for purchases. Each company trading in diamonds must also keep records of the warranty invoices received and the warranty invoices issued when buying or selling diamonds. This flow of warranties in and out must be audited and reconciled on an annual basis by the company’s auditors.</p>
      <p>
        In addition, the diamond industry organizations and their members have adopted the following principles of self-regulation:
        <ul>
          <li>to trade only with companies that include warranty declarations on their invoices;</li>
          <li>to not buy diamonds from suspect sources or unknown suppliers, or which originate in countries that have not implemented the Kimberley Process Certification Scheme;</li>
          <li>to not buy diamonds from any sources that, after a legally binding due process system, have been found to have violated government regulations restricting the trade in conflict diamonds;</li>
          <li>to not buy diamonds in or from any region that is subject to an advisory by a governmental authority indicating that conflict diamonds are emanating from or available for sale in such region, unless diamonds have been exported from such region in compliance with the Kimberley Process Certification Scheme;</li>
          <li>to not knowingly buy or sell or assist others to buy or sell conflict diamonds;</li>
          <li>to ensure that all company employees that buy or sell diamonds within the diamond trade are well informed regarding trade resolutions and government regulations restricting the trade in conflict diamonds.</li>
        </ul>
      </p>
    </section>
    <section>
      <h4>Dodd-Frank Act Compliance Policy Statement</h4>
      <p>In 2010, a new law was enacted, the Dodd-Frank Wall Street Reform and Consumer Protection Act. Within the Act, there is a provision regarding so-called “Conflict Minerals” (Tin, Tungsten, Tantalum and Gold) requiring U.S. based public companies to disclose measures they have taken to identify these metals within their supply chains and to demonstrate that they have not been sourced either directly or indirectly from the Democratic Republic of Congo (DCR) and adjoining nations. It is the policy of the Marathon Company/LeStage Manufacturing to be compliant with the requirements of this provision of the Dodd-Frank Act and require our supply chain to assure compliance as well.</p>
      <p>It is our policy that we do not use any metals in our products that come from conflict areas as outlined in the Dodd-Frank Act. We only partner with suppliers who are in compliance with this Act and can provide evidence of compliance.</p>
    </section>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'Preserving Cape Cod',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content:
            'Protecting workers and customers with responsible manufacturing and sourcing materials.'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.responsibility {
  section,
  h4 {
    margin: 1rem auto;
    max-width: 600px;
  }
  ul li {
    list-style-type: circle;
    margin-left: 1rem;
    text-align: left;
  }
}
</style>
