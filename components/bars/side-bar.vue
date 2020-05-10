<template>
  <b-sidebar :open.sync="open" right fullheight overlay>
    <!-- todo
      refaire peut-être entièrement ce fonctionnement, pas ouf sur mobile
      remplacer la bare latérale par une page à part ? jnsp
    -->
    <div style="padding: 1em">
      <b-menu>
        <b-menu-list label="Mes communautés">
          <b-menu-item v-for="community in $store.state.user.owned_communities" :key="community.id"
            tag="nuxt-link" :to="`/community/${community.id}`" :label="community.name">
          </b-menu-item>
          <b-menu-item tag="nuxt-link" to="/community/create" label="Nouvelle communauté" icon="plus"/>
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  computed: {
    open: {
      get() {
        return this.$store.state.sidebar;
      },
      set(v) {
        return this.$store.commit('SET_SIDEBAR', v);
      }
    }
  }
};
</script>
