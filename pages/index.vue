<template>
  <b-container class="mt-5">
    <h1 class="text-center my-5">Bilemo</h1>
    <b-row>
      <b-col md="6" class="mt-5">
        <b-card title="Connexion" class="text-center">
          <b-card-text>
            Accès aux produits et utilisateurs, ainsi que la gestion des utilisateurs
          </b-card-text>
          <nuxt-link to="/login" class="btn btn-primary">Se connecter</nuxt-link>
        </b-card>
      </b-col>
      <b-col md="6" class="mt-5">
        <b-card title="Inscription" class="text-center">
          <b-card-text>
            Inscription nécesaire pour acceder aux produits et aux utilisateurs
          </b-card-text>
          <nuxt-link to="/sign-in" class="btn btn-primary">S'inscrire</nuxt-link>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-5 pt-5">
      <b-col md="12" class="mt-5">
        <blockquote class="blockquote text-center">
          <p class="mb-0">Application frontend (Nuxt.JS) utilisant l'API BileMo (Symfony)</p>
          <footer class="blockquote-footer">crée par <cite title="Mathias Micheli"> <a
            href="https://github.com/mathiiii-dev">Mathias Micheli</a></cite></footer>
        </blockquote>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {}
</script>
