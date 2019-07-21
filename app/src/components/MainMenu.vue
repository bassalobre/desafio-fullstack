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
          :to="'/'"
          active-class="grey--text "
        >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Principal</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="#006dc5"
      dark
      fixed
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Test BS2</v-toolbar-title>
    </v-toolbar>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true
      }
    }
  }
</script>
