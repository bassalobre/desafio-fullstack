<template>
  <v-app id="inspire">
    <app-menu/>
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
  import Menu from '@/components/Menu';

  export default {
    components: {
      'app-menu': Menu,
    },
    data: () => ({
      drawer: true
    })
  }
</script>
