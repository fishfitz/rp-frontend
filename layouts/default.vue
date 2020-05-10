<template>
  <div>
    <top-bar/>
    <side-bar v-if="$store.state.user"/>
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import TopBar from '../components/bars/top-bar.vue';
import SideBar from '../components/bars/side-bar.vue';

export default { components: { TopBar, SideBar } };
</script>
