<template>
  <b-container class="mt-5">
    <nuxt-link to="/panel">Retour</nuxt-link>
    <b-row>
      <b-col md="8" lg="10" class="mx-auto">
        <Notification :message="message" v-if="message"/>
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
          <b-button type="button" variant="primary" class="float-right" @click="add">Ajouter un customer</b-button>
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
      message: null
    }
  },

  methods: {
    async add() {
      const headers = {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
      const data = {
        username: this.username,
        telephone: this.telephone,
        email: this.email,
      }
      this.$root.$loading.start();
      try {
        await this.$axios.post('customer/add', data, {
          headers: headers
        }).then(
          e => {
            localStorage.setItem('success-message', e.data.success)
            this.$router.push('/panel')
          }
        )
      } catch (e) {
        this.message = e.response.data.error.message
      }
      this.$root.$loading.finish();
    }
  }
}
</script>
