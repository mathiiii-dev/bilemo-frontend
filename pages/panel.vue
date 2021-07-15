<template>
  <b-container class="mt-5">
    <Notification :message="message" v-if="message"/>
    <b-row>
      <b-col md="6" class="mx-auto">
        <b-card title="Get Product" class="mt-3">
          <b-form-group id="input-group-1" label="Product id :" label-for="product-id">
            <b-form-input id="product-id" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-primary mt-3" v-on:click="getId('product')">Voir le produit</button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Get Products" class="mt-3">
          <div class="card-read-more mt-3">
            <nuxt-link to="/products" variant="primary" class="btn btn-primary mt-3">Voir les produits</nuxt-link>
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
            <button class="btn btn-primary mt-3" v-on:click="getId('customer')">Voir l'utilisateur</button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Add Customer" class="mt-3">
          <div class="card-read-more mt-3">
            <nuxt-link to="/customer/add" class="btn-primary btn mt-3">Ajouter un utilisateur</nuxt-link>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card title="Get Customers" class="mt-3">
          <b-form-group id="input-group-3" label="Customer id :" label-for="customers-id">
            <b-form-input id="customers-id" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn btn-primary mt-3" v-on:click="getId('customers')">Voir les utilisateurs</button>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card title="Delete Customer" class="mt-3">
          <b-form-group id="input-group-4" label="Customer id :" label-for="customer-id-delete">
            <b-form-input id="customer-id-delete" required></b-form-input>
          </b-form-group>
          <div class="card-read-more mt-3">
            <button class="btn-primary btn mt-3" v-on:click="deleteCustomer">Supprimer un utilisateur</button>
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
      message: null
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
      try {
        await this.$axios.delete(`customer/delete/${document.getElementById('customer-id-delete').value}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        }).then(
          e => {
            this.message = e.data.success
          }
        )
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

<style>


.card {
  display: block;
  margin-bottom: 20px;
  line-height: 1.42857143;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow .25s;
}

.card:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.img-card {
  width: 100%;
  height: 200px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  display: block;
  overflow: hidden;
}

.img-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all .25s ease;
}

.card-content {
  padding: 15px;
  text-align: left;
}

.card-title {
  margin-top: 0px;
  font-weight: 700;
  font-size: 1.65em;
}

.card-title a {
  color: #000;
  text-decoration: none !important;
}

.card-read-more {
  border-top: 1px solid #D4D4D4;
}

.card-read-more a {
  text-decoration: none !important;
  padding: 10px;
  font-weight: 600;
  text-transform: uppercase
}
</style>
