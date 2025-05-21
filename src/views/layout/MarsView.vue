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

// dialog
const showCheckConnection = ref(false)
const showSuggestions = ref(false)

const openSuggestions = () => {
  showCheckConnection.value = false
  showSuggestions.value = true
}

setTimeout(() => {
  showCheckConnection.value = true
}, 1000)

// audio control
const currentAudio = ref(null)
const currentPlayingIndex = ref(null)
const isManuallyPaused = ref({})
const audioStatusUpdateTrigger = ref(0)

const toggleAudio = (index, src) => {
  if (currentPlayingIndex.value !== null && currentPlayingIndex.value !== index) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
  }

  if (!currentAudio.value || currentPlayingIndex.value !== index) {
    if (currentAudio.value) {
      currentAudio.value.pause()
      currentAudio.value.currentTime = 0
    }

    currentAudio.value = new Audio(src)
    currentPlayingIndex.value = index

    currentAudio.value
      .play()
      .then(() => {
        audioStatusUpdateTrigger.value++ // force UI update
      })
      .catch((err) => console.error(err))

    currentAudio.value.onended = () => {
      currentPlayingIndex.value = null
      audioStatusUpdateTrigger.value++
    }
  } else {
    if (currentAudio.value.paused) {
      currentAudio.value
        .play()
        .then(() => {
          audioStatusUpdateTrigger.value++
        })
        .catch((err) => console.error(err))
    } else {
      currentAudio.value.pause()
      audioStatusUpdateTrigger.value++
    }
  }
}

const isPlaying = (index) => {
  audioStatusUpdateTrigger.value // access to make it reactive
  return currentPlayingIndex.value === index && currentAudio.value && !currentAudio.value.paused
}

//stop music back or download all butn
const stopAudio = () => {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }
  currentPlayingIndex.value = null
  isManuallyPaused.value = {}
}
//for back dialog
const showConfirmExitDialog = ref(false)

const handleBack = () => {
  showConfirmExitDialog.value = true
}

const confirmExit = () => {
  stopAudio()
  showSuggestions.value = false
  showConfirmExitDialog.value = false
}

const cancelExit = () => {
  showConfirmExitDialog.value = false
}
//for download all dialog
const snackbar = ref(false)
const snackbarText = ref('')

const handleDownloadAll = () => {
  stopAudio()
  snackbarText.value = 'Successfully added the songs to your playlist!'
  snackbar.value = true
  showSuggestions.value = false
}
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
          <h1 class="app-title">Guitar Song</h1>
        </div>

        <!-- Right: Icon Group -->
        <div class="icon-group-fixed d-flex align-center">
          <v-btn icon class="icon-margin">
            <v-icon class="icon-size">mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon class="icon-margin">
            <v-icon class="rotate-position icon-size icon-margin">mdi-reload</v-icon>
          </v-btn>
          <v-btn icon class="icon-margin">
            <v-icon class="icon-size">mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <!--main diri-->
      <v-main>
        <!--for songs only-->
        <div class="scroll-area">
          <v-container class="pa-4">
            <div class="mb-4 font-weight-bold tc">Bruno Mars Songs</div>
            <v-row>
              <!-- Box 1 -->
              <!-- Box 1 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
            
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded d-flex justify-center align-center" style="height: 100px">
                    <v-icon size="90" color="#000000">mdi-music-note</v-icon>
                  </div>
                  <span class="tc">24K Magic</span>
                </v-card>
              </v-col>

              <!-- Box 2 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded d-flex justify-center align-center" style="height: 100px">
                    <v-icon size="90" color="#000000">mdi-music-note</v-icon>
                  </div>
                  <span class="tc">Billionaire</span>
                </v-card>
              </v-col>

              <!-- Box 3 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded d-flex justify-center align-center" style="height: 100px">
                    <v-icon size="90" color="#000000">mdi-music-note</v-icon>
                  </div>
                  <span class="tc">Grenade</span>
                </v-card>
              </v-col>

              <!-- Box 4 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded d-flex justify-center align-center" style="height: 100px">
                    <v-icon size="90" color="#000000">mdi-music-note</v-icon>
                  </div>
                  <span class="tc">It Will Rain</span>
                </v-card>
              </v-col>
              <!-- Box 5 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded d-flex justify-center align-center" style="height: 100px">
                    <v-icon size="90" color="#000000">mdi-music-note</v-icon>
                  </div>
                  <span class="tc">Marry You</span>
                </v-card>
              </v-col>

              <!-- Box 6 -->
              <v-col cols="6" sm="6" md="4" lg="3" xl="3">
                <v-card class="pa-4 text-center artists-container">
                  <div class="img-rounded d-flex justify-center align-center" style="height: 100px">
                    <v-icon size="90" color="#000000">mdi-music-note</v-icon>
                  </div>
                  <span class="tc">Uptown Funk</span>
                </v-card>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-16">
              <v-btn class="mx-2 rounded-xl btn-color" to="/" exact active-class="my-active-class">
                <b>Back</b>
              </v-btn>
            </v-row>
          </v-container>
        </div>
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
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.2rem, 2.5vw, 2rem); /* responsive font size */
  margin-left: 10px;
  color: #000000;
  font-weight: bold;
}

.top-button-bar {
  position: fixed;
  top: 70px; /* 64px app-bar + spacing */
  left: 0;
  width: 100%;
  z-index: 0;
  padding: 10px 0;
}
.tab-active {
  background-color: #c78c3f !important; /* or any color you prefer */
  color: #d6d6d6 !important;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid #a6793e !important;
  transition: all 0.2s ease;
}
.tab-inactive {
  border: none !important;
  box-shadow: none !important;
}
.btn-color {
  background-image: url('/image/btn-color.png'); /* remove /public if you're in Vue/Vite */
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
  width: 25%;
  max-width: 250px; /* limit max width for large screens */
  min-width: 150px; /* ensure it doesn't get too small */
}

.rotate-position {
  transform: rotate(-90deg); /* or 90deg */
  transform-origin: center;
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
  background-image: url('/public/image/bg-wood.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* Original varnish color with opacity */
  background-color: rgba(236, 194, 139, 0.851); /* #ECD5B7 with 50% opacity */

  background-blend-mode: multiply;

  /* Optional slight glassy effect */
  backdrop-filter: brightness(0.9) saturate(1.05);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.artists-container:hover {
  background-color: rgba(226, 146, 42, 0.803); /* a bit stronger on hover */
  backdrop-filter: brightness(0.85) saturate(1.1);
  box-shadow: 0 8px 20px rgba(172, 145, 102, 0.4);
  transform: scale(1.03);
}
.tc {
  font-weight: bold;
  color: #78362a;
  text-shadow: 0 1px 2px rgba(120, 54, 42, 0.3);
}
.img-rounded img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
}

/* dialog */
::v-deep(.centered-dialog-wrapper) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: clamp(12px, 4vw, 24px);
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
  padding: 0.5rem;
}

.dialog-title {
  text-align: center;
  font-weight: bold;
  font-size: clamp(1rem, 4vw, 1.8rem); /* responsive text */
  line-height: 1.4;
  word-break: break-word;
  padding: 0 8px;
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
  min-width: 100px;
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: none;
  padding: 0.4rem 1.2rem;
  background-color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
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
  margin: 5px;
}
.artist-name,
.song-title,
.btn-no-color {
  color: #f1f3f4;
}
.song-title,
.btn-no-color {
  opacity: 0.9;
  font-size: clamp(1rem, 2vw, 1.5rem);
}
.artist-name {
  font-size: 10px;
}
/*for suggestion songs dialog*/
::v-deep(.suggestion-dialog-wrapper) {
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}
::v-deep(.suggestion-dialog) {
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}
.suggest-dialog-btn {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}

/*for audio*/
.song-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
}

.song-info {
  flex: 1;
  min-width: 0; /* Ensures truncation works */
  overflow: hidden;
}

.song-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold;
  color: #f1f3f4;
}

.artist-name {
  font-size: 10px;
  color: #f1f3f4;
}

.song-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0; /* Prevents shrinking */
}
.responsive-title {
  text-align: left;
  padding: 8px 12px;
  word-break: break-word;
  margin-left: 3%;
}

.responsive-text {
  font-size: clamp(0.9rem, 2.5vw, 1.4rem); /* Responsive from small to large */
  line-height: 1.3;
  display: inline-block;
  width: 100%;
  max-width: 100%;
  white-space: normal;
}

/* Tablet and below (≤768px) */
@media (max-width: 768px) {
  .btn-pill {
    min-width: 90px;
    height: 38px;
    font-size: 0.95rem;
    padding: 0.35rem 1rem;
  }
  .suggest-dialog-btn {
    justify-content: center;
  }
}

@media (min-width: 600px) {
  .artists-container {
    aspect-ratio: 1 / 1.1;
  }
  ::v-deep(.suggestion-dialog) {
    border-radius: 0;
    max-height: 100vh;
    padding: 12px !important;
  }
}
/* Mobile (≤480px) */
@media (max-width: 480px) {
  .btn-pill {
    min-width: 80px;
    height: 36px;
    font-size: 0.9rem;
    padding: 0.3rem 0.9rem;
  }
  .suggest-dialog-btn {
    flex-direction: column-reverse !important;
    align-items: stretch;
    gap: 8px;
  }

  .suggest-dialog-btn .v-btn {
    width: 100%;
  }
}
/* Very small devices (≤360px) */
@media (max-width: 360px) {
  .btn-pill {
    width: 100%;
    font-size: 0.85rem;
    height: 34px;
    padding: 0.3rem 0.8rem;
  }

  .dialog-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
}
</style>
