<template>
  <b-alert show dismissible :class="color">
    {{ message }}
  </b-alert>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message', 'color']
}
</script>
