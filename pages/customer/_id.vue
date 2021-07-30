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
      try {
        await this.getCustomer()
      }
      catch (e) {
        if(e.response.status === 500) {
          localStorage.setItem('message-500', e.response.data.error_description)
          await this.$router.push('/error/500')
        }
      }
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
