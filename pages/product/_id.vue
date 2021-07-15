<template>
  <b-container class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <h5 class="font-weight-light">{{ product.brand }}</h5>
    <h1 class="font-bold">{{ product._product }}</h1>
    <p class="lead">{{ product.description }}</p>
      <b-row class="text-center mt-5">
        <b-col md="2">
          <h4 class="font-bold">Pieces disponible</h4>
          <p>{{ product.stock }}</p>
        </b-col>
        <b-col md="2">
          <h4 class="font-bold">Prix</h4>
          <p>{{ product.price }} €</p>
        </b-col>
        <b-col md="2">
          <h4 class="font-bold">Couleur</h4>
          <p>{{ product.color }}</p>
        </b-col>
        <b-col md="2">
          <h4 class="font-bold">Date de sortie</h4>
          <p>{{ new Date(product.release_date).toDateString() }}</p>
        </b-col>
        <b-col md="2">
          <h4 class="font-bold">Reference</h4>
          <p>{{ product.reference }}</p>
        </b-col>
      </b-row>
  </b-container>
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
