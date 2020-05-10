<template>
  <b-button icon-left="discord" type="is-primary" @click="$store.dispatch('INITIATE_LOGIN')"
    style="background-color: #7289DA;" size="is-medium">
    {{ text || 'Connexion' }}
  </b-button>
</template>

<script>
export default { props: ['text'] };
</script>
