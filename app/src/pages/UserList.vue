<template>
  <div class="flex">
      <app-table :users="users"></app-table>
  </div>
</template>

<script>
import Table from '@/components/Table';
import UserService from '@/services/UserService';

export default {
  components: {
    'app-table': Table,
  },
  data: () => ({
      users: [],
  }),
  mounted() {
    UserService
        .usersList()
        .then((response) => {
            this.users = response.data.data;
        });
  },
}
</script>
