<template>
  <b-container v-else class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row>
      <b-col md="6" v-for="customer of customers" v-bind:key="customer.id" class="mt-3">
        <b-card :title="customer.username">
          <nuxt-link :to="{ name: 'customer-id', params: { id: customer.id }}" variant="primary">Details</nuxt-link>
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
      customers: [],
      currentPage: 1
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getCustomers()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getCustomers() {
      this.customers = await this.$axios.$get(`customers?page=${this.currentPage}&id=${this.$route.params.id}`)
    },
    goNext() {
      this.currentPage++
      this.getCustomers()
    },
    goPrevious() {
      this.currentPage--
      this.getCustomers()
    }
  }
}
</script>
