<template>
  <v-app id="inspire">
    <MainMenu/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex>
            <flash-message></flash-message>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import MainMenu from './components/MainMenu'
  export default {
    components: {
      MainMenu,
    },
    data: () => ({
      drawer: true
    })
  }
</script>
