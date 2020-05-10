<template>
  <!-- todo: faire un lien direct via click sur l'item" -->
  <b-carousel-list :items-to-show="Number(itemsToShow)" :data="formattedItems" arrow arrow-hover repeat has-drag/>
</template>

<script>
export default {
  props: ['value', 'itemsToShow'],
  computed: {
    formattedItems() {
      return this.value.map(v => ({ title: v.name, image: v.image_small }));
    }
  }
};
</script>
