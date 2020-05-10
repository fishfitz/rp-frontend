<template>
    <b-carousel with-carousel-list :indicator="false" :pause-hover="false">
      <b-carousel-item v-for="item in value" :key="item.name">
        <figure class="image is-3by1">
          <img :src="item.big_image">
        </figure>
      </b-carousel-item>
      <template slot="list" slot-scope="props">
        <b-carousel-list v-model="props.active" :config="listConfig"
          :data="formattedItems" @switch="props.switch($event, false)" as-indicator/>
      </template>
    </b-carousel>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      active: 0,
      listConfig: {
        hasGrayscale: true,
        itemsToShow: 2,
        breakpoints: {
          768: {
            hasGrayscale: false,
            itemsToShow: 4
          },
          960: {
            hasGrayscale: true,
            itemsToShow: 6
          }
        }
      },
      selectedItem: {}
    };
  },
  computed: {
    formattedItems() {
      return this.value.map(v => ({ title: v.name, image: v.image_small }));
    }
  }
};
</script>
