<template>
  <b-container class="mt-5">
    <nuxt-link to="/">Retour</nuxt-link>
    <h1 class="text-center m-5">Inscription</h1>
    <b-row class="">
      <b-col md="10" lg="8" class="mx-auto card p-4">
        <b-form @submit.prevent="register">
          <Notification :message="message" v-if="message" :class="color"/>
          <b-form-group id="input-group-pseudo" label="Pseudo :" label-for="input-pseudo">
            <b-form-input id="input-pseudo" type="text" placeholder="Votre pseudo" required
                          v-model="username"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-password" label="Mot de passe :" label-for="input-password">
            <b-form-input id="input-password" type="password" placeholder="********" required
                          v-model="password"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-email" label="Email :" label-for="input-email">
            <b-form-input id="input-email" type="email" placeholder="username@mail.com" required
                          v-model="email"></b-form-input>
          </b-form-group>
          <button class="btn btn-panel text-white mt-3 float-right" type="submit">Je me connecte</button>
        </b-form>
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
      username: '',
      email: '',
      password: '',
      message: null,
      color: 'alert-danger'
    }
  },

  mounted() {
    if (sessionStorage.getItem('token')) {
      this.$router.push('/panel')
    }
  },

  methods: {
    async register() {
      this.$root.$loading.start();
      try {
        await this.$axios.post('sign-in', {
          username: this.username,
          password: this.password,
          email: this.email,
        }).then(() => {
          this.$router.push('/login')
        })
      } catch (e) {
        this.message = e.response.data.error_description
      }
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
