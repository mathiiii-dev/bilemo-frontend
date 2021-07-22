<template>
  <b-container class="mt-5">
    <nuxt-link to="/">Retour</nuxt-link>
    <h1 class="text-center m-5">Connexion</h1>
    <Notification :message="message" v-if="message" :class="color"/>
    <b-row>
      <b-col md="10" lg="8" class="mx-auto">
        <b-form>
          <b-form-group id="input-group-pseudo" label="Pseudo :" label-for="input-pseudo">
            <b-form-input id="input-pseudo" type="text" placeholder="Votre pseudo" required
                          v-model="username"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-password" label="Mot de passe :" label-for="input-password">
            <b-form-input id="input-password" type="password" placeholder="********" required
                          v-model="password"></b-form-input>
          </b-form-group>
          <b-button type="button" variant="primary" class="float-right" @click="login">Je me connecte</b-button>
        </b-form>
      </b-col>
    </b-row>
    <div style="overflow: hidden;" class="fixed-bottom">
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        style="fill: #006ccf; width: 112%; height: 500px; transform: rotate(180deg) scaleX(-1);"
      >
        <path d="M1200 120L0 16.48V0h1200v120z"/>
      </svg>
    </div>
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
          const token = response.data.token
          if (response.data.token) {
            sessionStorage.setItem('token', token)
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
