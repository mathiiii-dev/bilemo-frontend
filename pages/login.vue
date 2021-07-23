<template>
  <b-container class="mt-5">
    <nuxt-link to="/">Retour</nuxt-link>
    <h1 class="text-center m-5">Connexion</h1>
    <Notification :message="message" v-if="message" :class="color"/>
    <b-row>
      <b-col md="10" lg="8" class="mx-auto card p-4">
        <b-form>
          <b-form-group id="input-group-pseudo" label="Pseudo :" label-for="input-pseudo">
            <b-form-input id="input-pseudo" type="text" placeholder="Votre pseudo" required
                          v-model="username"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-password" label="Mot de passe :" label-for="input-password">
            <b-form-input id="input-password" type="password" placeholder="********" required
                          v-model="password"></b-form-input>
          </b-form-group>
          <b-button class="float-right btn-panel btn text-white" v-on:click="login">Je me connecte</b-button>
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

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      if (sessionStorage.getItem('token')) {
        await this.$router.push('/panel')
      }
      this.$nuxt.$loading.finish()
    })

  },

  data() {
    return {
      username: '',
      password: '',
      message: null,
      color: 'alert-danger'
    }
  },

  methods: {
    async login() {
      this.$root.$loading.start();
      try {
        await this.$axios.post('login_check', {
          username: this.username,
          password: this.password
        }).then(response => {
          console.log(response)
          const token = response.data.token
          const refreshToken = response.data.refresh_token
          if (token && refreshToken) {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('refresh_token', refreshToken)
            this.$router.push('/panel')
          }
        })
      } catch (e) {
        this.message = e.response.data.message
      }
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
