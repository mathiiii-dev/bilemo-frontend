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
      try {
        this.customer = await this.$axios.$get(`customer/${this.$route.params.id}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })
      } catch (e) {
        if (e.response.status === 404) {
          await this.$router.push('/error/404')
          localStorage.setItem('message-404', e.response.data.error.message)
        }
        if (e.response.status === 401) {
          await this.$router.push('/login')
        }
      }
    }
  }
}
</script>
