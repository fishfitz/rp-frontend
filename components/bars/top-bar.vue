<template>
  <b-navbar type="is-primary" wrapper-class="container" spaced shadow>
    <!-- todo: améliorer la responsivité -->
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }"> RPZone </b-navbar-item>
      <!-- todo: faire un logo -->
    </template>
    <template slot="end">
      <b-navbar-item tag="nuxt-link" to="/community">
        <b-icon icon="magnify"/> &nbsp; Communautés
      </b-navbar-item>
      <b-navbar-item href="/about">
        À propos
      </b-navbar-item>
      <b-navbar-item v-if="$store.state.user" @click="$store.commit('SET_SIDEBAR', true)">
        <figure class="image is-1by1 is-24x24">
          <img class="is-rounded" :src="$store.state.user.avatar"/>
        </figure>
      </b-navbar-item>
      <b-navbar-item v-else @click="$store.dispatch('INITIATE_LOGIN')">
        Login
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
