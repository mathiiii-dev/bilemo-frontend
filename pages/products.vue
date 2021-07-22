<template>
  <b-container class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row>
      <b-col md="10" lg="8" class="mx-auto" v-for="product of products" v-bind:key="product.id">
        <b-card :title="product._product" v-if="product._product" class="mt-3">
          <div class="card-body">
            <p>Marque : {{ product.brand }}</p>
            <p>Prix : {{ product.price }} € </p>
            <p>Pièces disponible : {{ product.stock }}</p>
          </div>
          <div class="card-read-more text-right">
            <nuxt-link :to="{ name: 'product-id', params: { id: product.id }}" variant="primary"
                       class="btn-panel text-white btn mt-3">Details
            </nuxt-link>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="text-center my-3">
      <b-col>
        <b-button-group>
          <b-button v-on:click="goPrevious" id="previous">‹</b-button>
          <b-button v-on:click="goNext" id="next">›</b-button>
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
      pages: null
    }
  },

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getProducts()
      if (this.currentPage === 1) {
        document.getElementById('previous').disabled = true
      }
      this.pages = this.products[ this.products.length - 1]._embedded.pages
      this.$nuxt.$loading.finish()
    })
  },

  methods: {
    async getProducts() {
      this.products = await this.$axios.$get(`products?page=${this.currentPage}`)
    },
    goNext() {
      this.currentPage++
      if (this.currentPage > 1) {
        document.getElementById('previous').disabled = false
      }
      if (this.currentPage >= this.pages) {
        document.getElementById('next').disabled = true
      }
      this.getProducts()
    },
    goPrevious() {
      this.currentPage--
      this.getProducts()
      if (this.currentPage === 1) {
        document.getElementById('previous').disabled = true
      }
      if (this.currentPage < this.pages) {
        document.getElementById('next').disabled = false
      }
    }
  }
}
</script>
