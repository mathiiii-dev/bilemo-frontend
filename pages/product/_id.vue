<template>
  <b-jumbotron :header="product._product" :lead="product.description" class="mx-5 mt-5 py-3">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row>
      <b-col md="4">
        <p>Pieces restantes : {{ product.stock }}</p>
      </b-col>
      <b-col md="4">
        <p>Prix : {{ product.price }} €</p>
      </b-col>
      <b-col md="4">
        <p>Couleur : {{ product.color }}</p>
      </b-col>
      <b-col md="4">
        <p>Marque : {{ product.brand }}</p>
      </b-col>
      <b-col md="4">
        <p>Date de sortie : {{ product.release_date }}</p>
      </b-col>
      <b-col md="4">
        <p>Reference : {{ product.reference }}</p>
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<script>

export default {
  data() {
    return {
      product: {}
    }
  },
  mounted() {
      this.$nextTick( async () => {
        this.$nuxt.$loading.start()
        await this.getProducts()
        this.$nuxt.$loading.finish()
      })
  },
  methods: {
    async getProducts() {
      try {
        this.product = await this.$axios.$get(`product/${this.$route.params.id}`, {
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
