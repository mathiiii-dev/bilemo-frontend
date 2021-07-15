<template>
    <b-container class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row>
      <b-col md="10" lg="8" class="mx-auto">
        <b-card :title="product._product" v-for="product of products" v-bind:key="product.id" class="mt-3">
          <div class="card-body">
            <p>Marque : {{ product.brand }}</p>
            <p>Prix : {{ product.price }} € </p>
            <p>Pièces disponible : {{ product.stock }}</p>
          </div>
          <div class="card-read-more text-right">
            <nuxt-link :to="{ name: 'product-id', params: { id: product.id }}" variant="primary" class="btn-primary btn mt-3">Details</nuxt-link>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="text-center my-3">
      <b-col>
        <b-button-group>
          <b-button v-on:click="goPrevious">‹</b-button>
          <b-button v-on:click="goNext">›</b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {

  data() {
    return {
      products: [],
      currentPage: 1,
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
        this.products = await this.$axios.$get(
          `products?page=${this.currentPage}`,
          {
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
    },
    goNext() {
      this.currentPage++
      this.getProducts()
    },
    goPrevious() {
      this.currentPage--
      this.getProducts()
    }
  }
}
</script>
