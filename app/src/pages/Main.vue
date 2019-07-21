<template>
  <div class="flex">
      {{ title }}
      {{ test }}
  </div>
</template>

<script>
import ApiService from '@/services/ApiService.js'

export default {
  data: () => ({
    title: '',
  }),
  mounted() {
    ApiService.test().then((response) => {
        this.title = response.data;
    });
  },
}
</script>
