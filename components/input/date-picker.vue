<template>
  <div>
    <client-only>
      <b-datepicker v-model="dateValue" :disabled="disabled" :inline="inline" :position="position"/>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: 'datePicker',
    props: ['value', 'disabled', 'inline', 'position'],
    computed: {
      dateValue: {
        get() {
          if (this.value && this.value instanceof Date) return this.value;
          if (this.value && typeof this.value === 'string') return new Date(this.value.replace(/ \+/, '+'));
          return null;
        },
        set(v) {
          this.$emit('input', v && v.toString() || null);
        }
      }
    }
  };
</script>
