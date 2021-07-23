<template>
  <b-container class="mt-5">
      <nuxt-link to="/panel">Retour</nuxt-link>
    <div class="card p-5">
    <h5 class="font-weight-light text-purple">{{ product.brand }}</h5>
      <h1 class="font-bold text-black-product">{{ product._product }}</h1>
      <p class="lead">{{ product.description }}</p>
      <b-row class="mx-auto text-center mt-5 border-success">
        <b-col md="2">
          <h4 class="font-bold text-black-product">Pieces disponible</h4>
          <p>{{ product.stock }}</p>
        </b-col>
        <b-col md="2">
          <h4 class="font-bold text-black-product">Prix</h4>
          <p>{{ product.price }} €</p>
        </b-col>
        <b-col md="2">
          <h4 class="font-bold text-black-product">Couleur</h4>
          <p>{{ product.color }}</p>
        </b-col>
        <b-col md="4">
          <h4 class="font-bold text-black-product">Date de sortie</h4>
          <p>{{ new Date(product.release_date).toDateString() }}</p>
        </b-col>
        <b-col md="2">
          <h4 class="font-bold text-black-product">Reference</h4>
          <p>{{ product.reference }}</p>
        </b-col>
      </b-row>
    </div>
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
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getProducts()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getProducts() {
      this.product = await this.$axios.$get(`product/${this.$route.params.id}`)
    }
  }
}
</script>

<style>
.text-purple {
  color: #563bff;
}

.text-black-product {
  color: #2a3156;
}
</style>
