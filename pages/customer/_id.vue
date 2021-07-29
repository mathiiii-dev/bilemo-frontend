<template>
  <b-container class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row>
      <b-col md="10" lg="8" class="mt-3 mx-auto">
        <b-card :title="customer.username">
          <b-card-text>
            Email : {{ customer.email }}
          </b-card-text>
          <b-card-text>
            Telephone : {{ customer.telephone }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      customer: []
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getCustomer()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getCustomer() {
      this.customer = await this.$axios.$get(`customers/${this.$route.params.id}`)
    }
  }
}
</script>
