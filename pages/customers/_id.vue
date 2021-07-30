<template>
  <b-container v-else class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row>
      <b-col md="6" v-for="customer of customers" :key="customer.id" class="mt-3">
        <b-card :title="customer.username" v-if="customer.id">
          <nuxt-link :to="{ name: 'customer-id', params: { id: customer.id }}" variant="primary">Details</nuxt-link>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="text-center my-3" v-if="this.pages !== 1">
      <b-col>
        <b-button-group>
          <b-button @click="goPrevious" id="previous" :disabled="this.currentPage === 1">‹</b-button>
          <b-button @click="goNext" id="next" :disabled="this.currentPage >= this.pages">›</b-button>
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
      currentPage: 1,
      pages: null,
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getCustomers()
      this.pages = this.customers[ this.customers.length - 1]._embedded.pages
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
