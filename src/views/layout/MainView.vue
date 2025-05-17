<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const drawer = ref(false)
const mini = ref(false)
const isMobile = ref(false)
const drawerWidth = ref(280) // default width

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const updateDrawerSettings = () => {
  isMobile.value = window.innerWidth <= 768
  drawerWidth.value = isMobile.value ? window.innerWidth : 580
}

onMounted(() => {
  updateDrawerSettings()
  window.addEventListener('resize', updateDrawerSettings)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDrawerSettings)
})
</script>

<template class="main-template">
  <v-responsive class="border rounded">
    <v-app>
      <!-- Drawer Sidebar (right, collapsible) -->

      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        :mini-variant-width="80"
        :temporary="true"
        width="280"
        right
        color="#3C1213"
      >
        <!-- Profile -->
        <v-sheet class="text-center" rounded="lg">
          <v-img src="/image/logo.png" />
        </v-sheet>

        <v-list nav dense>
          <v-list-item
            :to="'/home'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-format-list-bulleted</v-icon>
              <span v-if="!mini" class="icon-mdi">Song Lists</span>
            </div>
          </v-list-item>

          <v-list-item
            :to="'/profile'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-heart</v-icon>
              <span v-if="!mini" class="icon-mdi">Favorites</span>
            </div>
          </v-list-item>

          <v-list-item
            :to="'/appointments'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-archive</v-icon>
              <span v-if="!mini" class="icon-mdi">My songs</span>
            </div>
          </v-list-item>

          <v-list-item
            :to="'/DeleteHistory'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px"> mdi-history</v-icon>
              <span v-if="!mini" class="icon-mdi">History/Top</span>
            </div>
          </v-list-item>

          <v-list-item
            :to="'/about'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-information-outline</v-icon>
              <span v-if="!mini" class="icon-mdi">About Us</span>
            </div>
          </v-list-item>
          <v-list-item
            :to="'/about'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-server</v-icon>
              <span v-if="!mini" class="icon-mdi">Folders</span>
            </div>
          </v-list-item>

          <v-list-item
            :to="'/about'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-music</v-icon>
              <span v-if="!mini" class="icon-mdi">Chords</span>
            </div>
          </v-list-item>

          <v-divider class="my-2" />

          <v-list-item
            :to="'/contact'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-cog</v-icon>
              <span v-if="!mini" class="icon-mdi">Settings</span>
            </div>
          </v-list-item>
          <v-list-item @click="handleLogoutClick" class="font-color-nav">
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px"> mdi-help</v-icon>
              <span v-if="!mini" class="icon-mdi">F.A.Q.</span>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar flat fixed height="64" class="main-color">
        <!-- Left: Menu + Title -->
        <div class="left-group d-flex align-center">
          <v-btn icon @click="toggleDrawer">
            <v-icon size="35">mdi-menu</v-icon>
          </v-btn>
          <h1 class="app-title">Guitar Song</h1>
        </div>

        <!-- Right: Icon Group -->
        <div class="icon-group-fixed d-flex align-center">
          <v-btn icon class="ms-2">
            <v-icon size="35">mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon class="ms-2">
            <v-icon size="35">mdi-reload</v-icon>
          </v-btn>
          <v-btn icon class="ms-2">
            <v-icon size="35">mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <!--main diri-->
      <v-main>
        <v-container>
          <div class="top-button-bar d-flex justify-center align-center w-100">
            <v-btn class="mx-2 rounded-xl btn-color"><b>Artists</b></v-btn>
            <v-btn class="mx-2 rounded-xl btn-color"><b>Songs</b></v-btn>
          </div>

          <v-dialog>
            <!--delay appear dialog-->
          </v-dialog>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<style scoped>
main {
  background-image: url('/public/image/bg-wood.png'); /* Ensure the path is correct relative to your project structure */
  background-repeat: repeat;
  background-size: auto;
  background-position: center;
  background-attachment: fixed;
}
.main-color {
  background: #ddb887;
  mix-blend-mode: multiply;
  width: 100%;
  height: 50px;
  max-height: 100%;
  margin: 0;
  padding: 0;
}
.font-color-nav {
  color: #b3b3b3;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 15px;
  margin-left: -20px;
}
.main-template {
  border-radius: 20px;
}
/*for v-app-bar*/
.left-group {
  position: fixed;
  top: 4px;
  left: 10px;
  z-index: 999;
}

.app-title {
  font-size: 20px;
  margin-left: 10px;
  color: #000000;
}

.icon-group-fixed {
  position: fixed;
  top: 4px;
  right: 10px;
  z-index: 999;
}
.top-button-bar {
  position: fixed;
  top: 70px; /* 64px app-bar + spacing */
  left: 0;
  width: 100%;
  z-index: 0;
  padding: 10px 0;
}
.btn-color {
   background-image: url('/public/image/btn-color.png'); /* Ensure the path is correct relative to your project structure */

  mix-blend-mode: multiply;
  opacity: 1;
}
</style>
