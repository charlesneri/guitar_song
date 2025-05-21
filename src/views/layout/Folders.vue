<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const drawer = ref(false)
const mini = ref(false)
const isMobile = ref(false)
const drawerWidth = ref(280)
const currentView = ref('artists')

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
            :to="'/'"
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
            :to="'/favorites'"
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
            :to="'/mysongs'"
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
            :to="'/history'"
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
            :to="'/folders'"
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
            :to="'/chords'"
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
            :to="'/settings'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-cog</v-icon>
              <span v-if="!mini" class="icon-mdi">Settings</span>
            </div>
          </v-list-item>
          <v-list-item :to="'/faq'" @click="handleLogoutClick" class="font-color-nav">
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
            <v-icon class="icon-size">mdi-menu</v-icon>
          </v-btn>
          <h1 class="app-title">Folders</h1>
        </div>

        <!-- Right: Icon Group -->
        <div class="icon-group-fixed d-flex align-center">
          <v-btn icon class="icon-margin">
            <v-icon class="icon-size">mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon class="icon-margin">
            <v-icon class="icon-size icon-margin">mdi-share-variant-outline</v-icon>
          </v-btn>
          <v-btn icon class="icon-margin">
            <v-icon class="icon-size">mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <!--main diri-->
      <v-main>
        <!--for artists only-->

        <div class="scroll-area" v-if="currentView === 'artists'">
          <v-container class="pa-4 mt-5">
            <v-row>
              <!-- Box 1 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 2 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 3 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 4 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
              <!-- Box 5 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 6 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <!--for audio-->
        <audio ref="audioPlayer" src="/audio/lady gaga.mp3" preload="auto" />
      </v-main>
    </v-app>
  </v-responsive>
</template>
<style scoped>
.v-main {
  background-image: url('/public/image/bg-wood.png');
  background-color: #ffffff; /* Add this if missing */
  background-repeat: repeat;
  background-size: auto;
  background-position: center;
  background-attachment: fixed;
  overflow-y: auto;
  height: 100%;
}

.main-color {
  position: relative;
  background: rgba(221, 184, 135, 0.85);
  mix-blend-mode: multiply;
  z-index: 1;
  width: 100%;
  height: 64px;
  padding: 0;
}

.font-color-nav {
  color: #b3b3b3;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 15px;
  margin-left: -20px;
}

.left-group {
  /*for v-app-bar*/
  position: fixed;
  top: 4px;
  left: 10px;
  z-index: 999;
}

.app-title {
  font-size: clamp(1.2rem, 2.5vw, 2rem); /* responsive font size */
  margin-left: 10px;
  color: #000000;
  font-weight: bold;
}

.icon-group-fixed {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999;
  gap: 2px;
}
.icon-margin {
  background-color: transparent;
  width: 36px; /* or any desired size */
  height: 36px;
  min-width: 0; /* override Vuetify's default min-width */
  border-radius: 8px; /* optional: for slight rounding */
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-size {
  font-size: 30px;
}
html,
body,
.v-application {
  height: 100%;
  overflow-y: auto;
}

.artists-container {
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  background-color: #ddb887;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  transition: transform 0.2s ease;
}

.img-rounded img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
}
</style>
