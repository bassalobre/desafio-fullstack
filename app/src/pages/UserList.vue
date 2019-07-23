<template>
  <div class="flex">
      <app-table :users="users"></app-table>
  </div>
</template>

<script>
import Table from '@/components/Table';
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';

export default {
  components: {
    'app-table': Table,
  },
  data: () => ({
      users: [],
  }),
  mounted() {
    const userService = new UserService();
    userService
        .usersList()
        .then((response) => {
            this.users = response.data;
        })
        .catch(error => {
            if (error.status === 401) this.unauthorized();
        });
  },
  methods: {
      unauthorized() {
          const authService = new AuthService();
          authService.logout();
          this.$router.push('/login');
      },
  },
}
</script>
