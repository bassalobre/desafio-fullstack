<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
      dark
    >
      <v-list>
        <v-list-tile
          to="/"
          active-class="white--text"
        >
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Usuários</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      class="green"
      dark
      fixed
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Test BS2</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon class="white--text">exit_to_app</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-toolbar>
  </div>
</template>

<script>
  import AuthService from '@/services/AuthService';

  export default {
    data: () => ({
      drawer: true
    }),
    methods: {
      logout() {
        AuthService
          .logout()
          .then(() => this.$router.push('/login'));
      },
    },
  }
</script>
