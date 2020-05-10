import Vue from 'vue';
import { set, remove } from '../assets/js/token';

export const state = () => ({
  user: null,
  lang: 'fr',
  config: {},
  loading: false,
  redirect_route: null,
  saved_community: null,
  sidebar: false
});

export const getters = {};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
    if (user && user.lang) {
      state.lang = user.lang;
      // Vue.i18nInstance.locale = user.lang;
    }
  },
  async SET_LANG(state, lang) {
    state.lang = lang;
    Vue.i18nInstance.locale = lang;
    state.user.lang = lang;
    await this.$axios.$put('/auth/lang', { lang });
  },
  SET_CONFIG(state, config) {
    state.config = config;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_REDIRECT_ROUTE(state, redirect) {
    state.redirect_route = redirect;
  },
  SET_SAVED_COMMUNITY(state, community) {
    state.saved_community = community ? { ...community } : null;
  },
  SET_SIDEBAR(state, sidebar) {
    state.sidebar = sidebar;
  }
};

export const actions = {
  async INITIATE_LOGIN() {
    window.location = await this.$axios.$get('/auth/discord/url');
  },
  async LOGIN({ commit }, { res, ...token }) {
    set(this.$axios, token, res);
    const user = await this.$axios.$get('/auth/user');
    commit('SET_USER', user);
  },
  async LOGOUT({ commit }) {
    await this.$axios.$post('/auth/logout');
    commit('SET_USER', null);
    remove();
  },
  async CREATE_COMMUNITY({ commit }, community) {
    await this.$axios.$post('/community', community);
    const user = await this.$axios.$get('/auth/user');
    commit('SET_USER', user);
    commit('SET_SAVED_COMMUNITY', null);
  }
};
