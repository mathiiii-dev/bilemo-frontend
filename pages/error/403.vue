<template xmlns="http://www.w3.org/1999/html">
  <b-container class="mt-5">
    <b-row>
      <b-col md="10" lg="8" class="mx-auto p-4 font">
        <p class="bg-title">Access Denied</p>
        <h1 class="mt-3 font-weight-bold">Oops! 403 Access Denied</h1>
        <p class="lead lead-font-size">Sorry, an error has occured, you don't have permission!</p>
        <p v-if="message" class="message-font-size">{{ message }}</p>
        <nuxt-link to="/panel" class="btn-panel btn text-white float-right">Retour au panel</nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      message: localStorage.getItem('message-403')
    }
  }
}
</script>

<style>
.bg-title {
  background-color: #e5eaef;
  border-radius: 10px;
  padding: 7px;
  display: inline;
}
h1 {
  font-size: 400%;
}
.lead-font-size {
  font-size: 200%;
}
.message-font-size {
  font-size: 150%;
}
</style>
