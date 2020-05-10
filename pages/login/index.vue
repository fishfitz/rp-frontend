<template>
  <section class="section">
    You must login to access this page.
    <discord-login/>
  </section>
</template>

<script>
import DiscordLogin from '../../components/users/discord-login.vue';

export default { components: { DiscordLogin } };
</script>

<style lang="scss">

</style>
