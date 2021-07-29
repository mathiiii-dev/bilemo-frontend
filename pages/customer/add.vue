<template>
  <b-container class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row class="card py-5">
      <b-col md="8" lg="10" class="mx-auto">
        <Notification :message="message" v-if="message" :class="color"/>
        <b-form>
          <b-form-group id="input-group-pseudo" label="Pseudo :" label-for="input-pseudo">
            <b-form-input id="input-pseudo" type="text" placeholder="Votre pseudo" required
                          v-model="username"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-telephone" label="Telephone :" label-for="input-telephone">
            <b-form-input id="input-telephone" type="text" placeholder="0674096595" required
                          v-model="telephone"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-email" label="Email :" label-for="input-email">
            <b-form-input id="input-email" type="email" placeholder="mail@mail.com" required
                          v-model="email"></b-form-input>
          </b-form-group>
          <button class="btn btn-panel text-white mt-3" v-on:click="add">Ajouter un customer</button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Notification from "../../components/Notification";

export default {
  components: {
    Notification
  },
  data() {
    return {
      username: '',
      telephone: '',
      email: '',
      message: null,
      color: null,
    }
  },

  methods: {
    async add(event) {
      event.preventDefault()
      const data = {
        username: this.username,
        telephone: this.telephone,
        email: this.email,
      }
      this.$root.$loading.start();
      try {
        await this.$axios.post('customers/add', data).then(
          e => {
            localStorage.setItem('success-message', e.data.success)
            this.color = 'alert-success'
            this.$router.push('/panel')
          }
        )
      } catch (e) {
        this.color = 'alert-danger'
        this.message = e.response.data.error_description
      }
      this.$root.$loading.finish();
    }
  }
}
</script>
