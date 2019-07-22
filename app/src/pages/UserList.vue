<template>
  <div class="flex">
      <app-table :users="users"></app-table>
  </div>
</template>

<script>
import Table from '@/components/Table';
import ApiService from '@/services/ApiService.js';

export default {
  components: {
    'app-table': Table,
  },
  data: () => ({
      users: [],
  }),
  mounted() {
    ApiService
        .users()
        .then((response) => {
            this.users = response.data;
        });
  },
}
</script>
