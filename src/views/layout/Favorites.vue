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

//for search
const showSearch = ref(false)
const searchQuery = ref('')
import { computed } from 'vue'
const favoriteSongs = ref([])

onMounted(() => {
  const stored = localStorage.getItem('favoriteSongs')
  if (stored) {
    favoriteSongs.value = JSON.parse(stored)
  }
})

const filteredFavorites = computed(() => {
  const sorted = [...favoriteSongs.value].reverse() // clone and reverse for recent-first order

  if (!searchQuery.value) return sorted

  return sorted.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
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

const suggestionSongs = [
  { title: 'Cardigan', artist: 'Taylor Swift', src: '/audio/cardigan.mp3' },
  { title: 'Ceilings', artist: 'Lizzy McAlpine', src: '/audio/ceilings.mp3' },
  { title: 'Die With A Smile', artist: 'Lady Gaga, Bruno Mars', src: '/audio/lady gaga.mp3' },
  { title: 'Good Luck Babe!', artist: 'Chappell Roan', src: '/audio/goodluck.mp3' },
  { title: 'Slim Pickins', artist: 'Sabrina Carpenter', src: '/audio/slim.mp3' },
]
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
            :to="'/setlists'"
            class="font-color-nav"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-heart</v-icon>
              <span v-if="!mini" class="icon-mdi">Setlists</span>
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
              <iconify-icon
                icon="fluent:storage-32-filled"
                width="32"
                height="32"
                style="margin-left: 15px"
              ></iconify-icon>
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
          <h1 class="app-title">Favorites</h1>
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
        <div class="scroll-area" v-if="currentView === 'artists'">
          <v-container class="pa-4 mt-5">
            <v-container class="pa-4 mt-5">
              <div v-if="filteredFavorites.length === 0" class="empty-state">
                <v-icon class="empty-icon">mdi-folder-open-outline</v-icon>
                <div class="empty-text">Your favorites folder is empty</div>
              </div>

              <v-row v-else>
                <v-col
                  v-for="(song, index) in filteredFavorites"
                  :key="index"
                  cols="6"
                  sm="6"
                  md="4"
                  lg="3"
                  xl="3"
                >
                  <v-card class="pa-4 text-center artists-container" to="/alejandro">
                    <div class="img-rounded d-flex justify-center align-center">
                      <v-icon :size="iconSize" class="note-icon">mdi-music-note</v-icon>
                    </div>
                    <div class="song-info-block">
                      <span class="tc song-title-text">{{ song.title }}</span>
                      <div
                        class="favorite-label d-flex align-center justify-center"
                        style="gap: 4px"
                      >
                        <v-icon :size="iconSize" color="#FFC000">mdi-star</v-icon>
                        <span class="fav-text"></span>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
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
  padding: clamp(0.75rem, 2vw, 1.5rem);
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

/*for folder empty*/
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(32px, 8vw, 80px);
  text-align: center;
  width: 100%;
  min-height: 50vh;
  box-sizing: border-box;
}

.empty-icon {
  font-size: clamp(16px, 4vw, 22px);
}

.empty-text {
  font-size: clamp(16px, 4vw, 22px);
  font-weight: 500;
  color: #666;
}
.song-info-block {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.fav-text {
  font-size: clamp(0.75rem, 1.5vw, 0.9rem);
}

.note-icon {
  font-size: clamp(2rem, 5vw, 4rem); /* Adjust min, ideal, and max */
  color: #000;
}

/* Responsive song title */
.song-title-text {
  font-size: clamp(0.9rem, 2.5vw, 1.25rem);
  font-weight: 600;
  text-align: center;
  word-break: break-word;
}

/* Ensure the favorite label adapts on small screens */
.favorite-label {
  font-size: clamp(0.75rem, 2vw, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* Responsive padding inside each card */
.artists-container {
  padding: clamp(0.75rem, 2vw, 1.5rem);
}

/* Tweak icon size specifically on very small screens */
@media (max-width: 480px) {
  .note-icon {
    font-size: 60px !important;
  }

  .song-title-text {
    font-size: 1rem;
  }

  .fav-text {
    font-size: 0.8rem;
  }
}

@media (min-width: 600px) {
  .artists-container {
    aspect-ratio: 1 / 1.1;
  }
}
@media (max-width: 480px) {
  .app-title {
    font-size: 1.2rem;
  }

  .favorite-label {
    flex-direction: column;
  }

  .icon-size {
    font-size: 24px;
  }
  .note-icon {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
  }
}
</style>
