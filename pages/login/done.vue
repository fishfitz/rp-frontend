<template>
  <div>
    Connexion réussie !
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('LOGIN', this.$route.query);
    await this.$store.commit('SET_SIDEBAR', true);
    if (this.$store.state.saved_community && this.$store.state.saved_community.ready) {
      await this.$store.dispatch('CREATE_COMMUNITY', this.$store.state.saved_community);
      this.$router.replace('/');
    }
    else if (this.$store.state.redirect_route) this.$router.replace(this.$store.state.redirect_route);
    else this.$router.replace('/');
  }
};
</script>
