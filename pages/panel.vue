<template>
  <b-container class="mt-5">
    <b-row>
      <b-col md="6" class="mx-auto">
        <b-card title="Get Product" class="mt-3">
          <p>Get one product</p>
          Product id : <input type="text" id="product-id">
          <button class="btn btn-primary" v-on:click="getId('product')">Voir le produit</button>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Get Products" class="mt-3">
          <p>Get all product</p>
          <nuxt-link to="/products" variant="primary" class="btn btn-primary">Voir les produits</nuxt-link>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card title="Get Customer" class="mt-3">
          <p>Get one customer</p>
          Customer id : <input type="text" id="customer-id">
          <button class="btn btn-primary" v-on:click="getId('customer')">Voir l'utilisateur</button>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Get Customers" class="mt-3">
          <p>Get all customers for one user</p>
          user id : <input type="text" id="customers-id">
          <button class="btn btn-primary" v-on:click="getId('customers')">Voir les utilisateurs</button>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card title="Add Customer" class="mt-3">
          <p>Add a customer</p>
          <nuxt-link to="/customer/add" class="btn-primary btn">Ajouter un utilisateur</nuxt-link>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Delete Customer" class="mt-3">
          <p>Delete a customer</p>
          Customer id : <input type="text" id="customer-id-delete">
          <button class="btn-primary btn" v-on:click="deleteCustomer">Supprimer un utilisateur</button>
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

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      if (!sessionStorage.getItem('token')) {
        await this.$router.push('/')
      }
      this.$nuxt.$loading.finish()
    })
  },

  methods: {
    async getId(element) {
      await this.$router.push(`/${element}/${document.getElementById(`${element}-id`).value}`)
    },
    async deleteCustomer() {
      try {
        await this.$axios.delete(`customer/delete/${document.getElementById('customer-id-delete').value}`, {
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
  }
}
</script>
