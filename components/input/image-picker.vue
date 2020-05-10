<template>
  <div class="control">
    <template v-if="value">
      <img :src="imageSrc" style="width: 100px;"/>
      <br/>
      <b-input :value="imageText" size="is-small" style="width: 500px;" readonly/>
      <br/>
    </template>
    <b-upload @input="$emit('input', $event[0] ? $event[0] : $event)">
      <a class="button is-primary">
        <b-icon icon="upload"/>
        <span> Choisir un fichier </span>
      </a>
    </b-upload>
  </div>
</template>

<script>
  import toFormData from '../../assets/js/toFormData';
  const { readAndCompressImage } = typeof window === 'undefined' ? {} : require('browser-image-resizer');

  export default {
    props: ['value', 'resize'],
    data() {
      return { imageSrc: '' };
    },
    computed: {
      imageText() {
        if (!this.value) return '';
        if (typeof this.value === 'string') return this.value;
        if (typeof this.value === 'object') return this.value.name;
        return '';
      }
    },
    methods: {
      async upload() {
        if (typeof this.value === 'string') return;
        const { data: { link } } = await this.$axios.$post(
          'https://api.imgur.com/3/image',
          toFormData({ image: this.value }),
          { headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` } }
        );
        this.$emit('input', link);
      }
    },
    mounted() {
      if (typeof this.value === 'string') this.imageSrc = this.value;
    },
    watch: {
      async value(val) {
        if (!val) return '';
        if (typeof val === 'string') this.imageSrc = this.value;
        else if (typeof val === 'object') {
          if (this.resize) val = await readAndCompressImage(val, this.resize);

          const reader = new FileReader();
          reader.onload = async () => {
            this.imageSrc = reader.result;
          };
          reader.readAsDataURL(val);
        }
        else this.imageSrc = '';
      }
    }
  };
</script>
