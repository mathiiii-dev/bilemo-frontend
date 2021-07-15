<template xmlns="http://www.w3.org/1999/html">
  <b-container>
    <b-row>
      <b-col md="12">
        <div class="error-template">
          <h1>Oops!</h1>
          <h2>500 Not Found</h2>
          <div class="error-details">
            <p v-if="message">{{ message }}</p>
            <p v-else>Sorry, an error has occured, Requested page not found!</p>
          </div>
          <div class="error-actions">
            <nuxt-link to="/panel">Retour</nuxt-link>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.error-template {
  padding: 40px 15px;
  text-align: center;
}

.error-actions {
  margin-top: 15px;
  margin-bottom: 15px;
}

.error-actions .btn {
  margin-right: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      message: localStorage.getItem('message-404') ?? null
    }
  }
}
</script>
