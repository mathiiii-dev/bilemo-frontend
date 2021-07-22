<template>
  <b-container class="mt-5">
    <Notification :message="message" v-if="message" :class="color"/>
    <b-row>
      <b-col md="6" class="mx-auto">
        <b-card title="Get Customers" class="mt-3">
          <b-form-group id="input-group-3" label="User id :" label-for="customers-id">
            <b-form-input id="customers-id" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-panel text-white mt-3" v-on:click="getId('customers')">Voir les utilisateurs</button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Delete Customer" class="mt-3">
          <b-form-group id="input-group-4" label="Customer id :" label-for="customer-id-delete">
            <b-form-input id="customer-id-delete" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn-panel text-white btn mt-3" v-on:click="deleteCustomer">Supprimer un utilisateur</button>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card title="Get Customer" class="mt-3">
          <b-form-group id="input-group-2" label="Customer id :" label-for="customer-id">
            <b-form-input id="customer-id" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-panel text-white mt-3" v-on:click="getId('customer')">Voir l'utilisateur</button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Get Product" class="mt-3">
          <b-form-group id="input-group-1" label="Product id :" label-for="product-id">
            <b-form-input id="product-id" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-panel text-white mt-3" v-on:click="getId('product')">Voir le produit</button>
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
    async getId(element) {
      await this.$router.push(`/${element}/${document.getElementById(`${element}-id`).value}`)
    },
    async deleteCustomer() {
      await this.$axios.delete(`customer/delete/${document.getElementById('customer-id-delete').value}`).then(
        e => {
          this.message = e.data.success
          this.color = 'alert-success'
        }
      )
    },
  }
}
</script>

<style>

</style>
