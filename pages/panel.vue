<template>
  <b-container class="mt-5">
    <Notification :message="message" v-if="message" :class="color"/>
    <b-row>
      <b-col md="6" class="mx-auto">
        <b-card title="Get Customers" class="mt-3">
          <b-form-group id="input-group-3" label="User id :" label-for="customers-id">
            <b-form-input id="customers-id" required v-model="clientId"></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-panel text-white mt-3" @click="getCustomers">Voir les utilisateurs</button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Delete Customer" class="mt-3">
          <b-form-group id="input-group-4" label="Customer id :" label-for="customer-id-delete">
            <b-form-input id="customer-id-delete" v-model="customerDeleteId" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn-panel text-white btn mt-3" @click="deleteCustomer">Supprimer un utilisateur</button>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card title="Get Customer" class="mt-3">
          <b-form-group id="input-group-2" label="Customer id :" label-for="customer-id">
            <b-form-input id="customer-id" required v-model="customerId"></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-panel text-white mt-3" @click="getCustomer">Voir l'utilisateur</button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Get Product" class="mt-3">
          <b-form-group id="input-group-1" label="Product id :" label-for="product-id">
            <b-form-input id="product-id" required v-model="productId"></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-panel text-white mt-3" @click="getProduct">Voir le produit</button>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card title="Add Customer" class="mt-3">
          <div class="card-read-more mt-3">
            <nuxt-link to="/customer/add" class="btn-panel text-white btn mt-3">Ajouter un utilisateur</nuxt-link>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Get Products" class="mt-3">
          <div class="card-read-more mt-3">
            <nuxt-link to="/products" variant="primary" class="btn mt-3 text-white btn-panel">Voir les produits
            </nuxt-link>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },

  data() {
    return {
      message: null,
      color: null,
      customerDeleteId: null,
      customerId: null,
      productId: null,
      clientId: null,
    }
  },

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      if (!sessionStorage.getItem('token')) {
        await this.$router.push('/')
      }
      if (localStorage.getItem('success-message')) {
        this.message = localStorage.getItem('success-message')
        this.color = 'alert-success'
      }
      localStorage.removeItem('success-message')
      this.$nuxt.$loading.finish()
    })
  },

  methods: {
    async getCustomers() {
      await this.$router.push(`customers/${this.clientId}`)
    },
    async getCustomer() {
      await this.$router.push(`customer/${this.customerId}`)
    },
    async getProduct() {
      await this.$router.push(`product/${this.productId}`)
    },
    async deleteCustomer() {
      await this.$axios.delete(`customers/delete/${this.customerDeleteId}`).then(
        e => {
          this.message = 'The customer has been deleted'
          this.color = 'alert-success'
        }
      )
    },
  }
}
</script>
