<template>
  <b-alert show variant="info" dismissible>
    {{ message }}
  </b-alert>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message']
}
</script>
