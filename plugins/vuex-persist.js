import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      reducer: state => ({
        redirect_route: state.redirect_route,
        saved_community: state.saved_community
      })
    }).plugin(store);
  });
};
