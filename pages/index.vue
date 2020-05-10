<template>
  <section class="section">
    <template v-if="featured && featured.length">
      <big-carousel :value="featured"/>
      <br/>
    </template>
    <div class="has-text-centered" v-if="!$store.state.user">
      <b-button size="is-medium" icon-left="plus" type="is-primary" tag="nuxt-link" to="/community/create">
        Ajoute la tienne
      </b-button>
      <b-button size="is-medium" icon-left="magnify" type="is-primary" outlined tag="nuxt-link" to="/community/">
        Trouve où jouer
      </b-button>
    </div>
    <div>
      <h1 class="title is-4"> Dernières communautés </h1>
      <small-carousel items-to-show="6.5" :value="latest"/>
      <br/>
    </div>
    <br/>
    <div>
      <h1 class="title is-4"> Thèmes </h1>
      <small-carousel items-to-show="4.5" :value="tags"/>
    </div>
  </section>
</template>

<script>
import BigCarousel from '../components/carousels/big-carousel.vue';
import SmallCarousel from '../components/carousels/small-carousel.vue';

export default {
  components: { BigCarousel, SmallCarousel },
  async asyncData({ $axios }) {
    const { featured, latest, tags } = await $axios.$get('/home');
    return { featured, latest, tags };
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">

</style>
