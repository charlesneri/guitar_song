<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const drawer = ref(false)
const mini = ref(false)
const isMobile = ref(false)
const drawerWidth = ref(280) // default width
const currentView = ref('artists') // default view

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

//for dialog
const showCheckConnection = ref(false)
const showSuggestions = ref(false)

const openSuggestions = () => {
  showCheckConnection.value = false
  showSuggestions.value = true
}

onMounted(() => {
  setTimeout(() => {
    showCheckConnection.value = true
  }, 1000) // 1 second delay after app load
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
            <v-icon size="35" class="rotate-position">mdi-reload</v-icon>
          </v-btn>
          <v-btn icon class="ms-2">
            <v-icon size="35">mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </v-app-bar>
      <div class="top-button-bar d-flex justify-center align-center w-100">
        <v-btn
          class="mx-2 rounded-xl btn-color"
          :variant="currentView === 'artists' ? 'flat' : 'outlined'"
          @click="currentView = 'artists'"
        >
          <b>Artists</b>
        </v-btn>
        <v-btn
          class="mx-2 rounded-xl btn-color"
          :variant="currentView === 'songs' ? 'flat' : 'outlined'"
          @click="currentView = 'songs'"
        >
          <b>Songs</b>
        </v-btn>
      </div>

      <!--main diri-->
      <v-main>
        <!--for artists only-->
        <div class="scroll-area" v-if="currentView === 'artists'">
          <v-container class="pa-4 mt-16">
            <v-row>
              <!-- Box 1 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 2 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 3 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 4 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
              <!-- Box 5 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 6 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <!--for songs only-->
        <div class="scroll-area" v-if="currentView === 'songs'">
          <v-container class="pa-4 mt-16">
            <v-row>
              <!-- Box 1 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bini.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 2 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bini.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 3 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bini.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 4 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bini.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
              <!-- Box 5 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bini.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>

              <!-- Box 6 -->
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bini.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bini.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
              <v-col cols="6" sm="6" md="4" lg="4" xl="4">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded"><img src="/image/bruno.jpg" alt="" /></div>
                  <span>Bruno Mars</span>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <!--for internet-->
        <v-dialog
          v-model="showCheckConnection"
          persistent
          scroll-strategy="none"
          content-class="centered-dialog-wrapper"
          scrim="rgba(0, 0, 0, 0.7)"
        >
          <v-card class="hidden-card-shell">
            <v-sheet class="perfect-square-sheet">
              <div class="dialog-body">
                <h2 class="dialog-title">Check for Internet<br />Connection</h2>
              </div>

              <div class="dialog-actions">
                <v-btn
                  class="btn-pill btn-no"
                  variant="outlined"
                  @click="showCheckConnection = false"
                >
                  No
                </v-btn>
                <v-btn class="btn-pill btn-yes" variant="outlined" @click="openSuggestions">
                  Yes
                </v-btn>
              </div>
            </v-sheet>
          </v-card>
        </v-dialog>

        <!-- Song Suggestions Dialog -->
        <v-dialog v-model="showSuggestions" persistent max-width="500" scrim="rgba(0, 0, 0, 7)">
          <v-card class="pa-4 suggestion-dialog" color="#3C1213">
            <v-card-title
              ><b
                >Here are some recommended <br />
                songs based on Your Favorites:</b
              ></v-card-title
            >
            <v-divider thickness="2"></v-divider>
            <v-card-text class="mb-16 pb-16">
              <div class="d-flex align-center justify-between my-2">
                <div>
                  <span class="song-title"><b>Cardigan</b></span>
                  <div class="artist-name">Taylor Swift</div>
                </div>
                <v-spacer></v-spacer>
                <v-btn flat class="btn-no-color"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
              <div class="d-flex align-center justify-between my-2">
                <div>
                  <span class="song-title"><b>Ceilings</b></span>
                  <div class="artist-name">Lizyy McAlpine</div>
                </div>
                <v-spacer></v-spacer>
                <v-btn flat class="btn-no-color"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
              <div class="d-flex align-center justify-between my-2">
                <div>
                  <span class="song-title"><b>Die with a smile</b></span>
                  <div class="artist-name">Lady Gaga, Bruno Mars</div>
                </div>

                <v-spacer></v-spacer>
                <v-btn flat class="btn-no-color"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
              <div class="d-flex align-center justify-between my-2">
                <div>
                  <span class="song-title"> <b>Good Luck Babe!</b></span>
                  <div class="artist-name">Drake</div>
                </div>
                <v-spacer></v-spacer>
                <v-btn flat class="btn-no-color"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
              <div class="d-flex align-center justify-between my-2">
                <div>
                  <span class="song-title"><b>Slim Pickins</b></span>
                  <div class="artist-name">Sabrina Carpenter</div>
                </div>
                <v-spacer></v-spacer>
                <v-btn flat class="btn-no-color"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </v-card-text>

            <v-card-actions class="d-flex justify-end">
              <v-btn variant="text" @click="showSuggestions = false">Back</v-btn>
              <v-btn color="success" variant="flat">Download All</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  padding-top: 0;
  overflow-y: visible;
  height: auto;
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
  opacity: 1;
}
.rotate-position {
  transform: rotate(-90deg); /* or 90deg */
  transform-origin: center;
}
html,
body,
.v-application {
  height: 100%;
  overflow-y: auto;
}

.v-main {
  padding-top: 130px; /* accounts for app-bar + button bar */
  overflow-y: auto;
  height: 100%;
}

.top-button-bar {
  position: fixed;
  top: 64px; /* height of app-bar */
  left: 0;
  width: 100%;
  z-index: 998;
  padding: 8px 0;
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

/* This makes the actual card content scrollable */
.scroll-area {
  padding: 16px;
}
/* dialog */
::v-deep(.centered-dialog-wrapper) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  height: 100vh !important;
  padding: 16px;
  box-sizing: border-box;
}
.hidden-card-shell {
  background: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  border: none !important;
  outline: none !important;
  display: contents !important; /* 🔥 KEY TRICK */
}
.perfect-square-sheet {
  aspect-ratio: 1 / 1;
  width: 90vw;
  max-width: 400px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
}

/* Center the title text vertically */
.dialog-body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.dialog-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.4;
}

/* Move buttons to bottom right */
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

/* Capsule-style buttons */
.btn-pill {
  border-radius: 999px !important;
  min-width: 80px;
  height: 36px;
  font-weight: bold;
  text-transform: none;
  background-color: white;
}

.btn-no {
  color: red;
  border: 1.5px solid #f4cccc;
}

.btn-yes {
  color: green;
  border: 1.5px solid #cce8cc;
}
::v-deep(.suggestion-dialog) {
  border-radius: 20px !important;
  overflow: hidden; /* optional */
}
.btn-no-color {
  background-color: transparent;
  padding: 0;
  width: 36px; /* or any desired size */
  height: 36px;
  min-width: 0; /* override Vuetify's default min-width */
  border-radius: 8px; /* optional: for slight rounding */
  display: flex;
  align-items: center;
  justify-content: center;
}
.artist-name,
.song-title,
.btn-no-color {
  color: #f1f3f4;
}
.song-title,
.btn-no-color {
  opacity: 0.9;
  font-size: 20px;
}
.artist-name {
  font-size: 10px;
}

@media (min-width: 600px) {
  .artists-container {
    aspect-ratio: 1 / 1.1;
  }
}
</style>
