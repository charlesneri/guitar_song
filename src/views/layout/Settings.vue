<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
const drawer = ref(false)
const mini = ref(false)
const isMobile = ref(false)
const drawerWidth = ref(280)
const currentView = ref('artists')
const router = useRouter()

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
  <v-responsive class="main-wrapper">
    <v-app class="fill-height">
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
          <v-btn icon @click="router.back()">
            <v-icon class="icon-size">mdi-arrow-left</v-icon>
          </v-btn>
          <h1 class="app-title">Settings</h1>
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
      <v-main class="fill-height">
        <div class="full-width-section">
          <v-list>
            <v-list-item @click="handleClick('View')" ripple>
              <div class="clickable-list-item ">View</div>
            </v-list-item>
            <v-list-item @click="handleClick('Synchronization')" ripple>
              <div class="clickable-list-item ">Synchronization</div>
            </v-list-item>
            <v-list-item @click="handleClick('System')" ripple>
              <div class="clickable-list-item">System</div>
            </v-list-item>
            <v-list-item @click="handleClick('D-Pad Keys')" ripple>
              <div class="clickable-list-item">D-Pad Keys</div>
            </v-list-item>
            <v-list-item @click="handleClick('Miscellaneous')" ripple>
              <div class="clickable-list-item">Miscellaneous</div>
            </v-list-item>
            <v-list-item @click="handleClick('Information')" ripple>
              <div class="clickable-list-item">Information</div>
            </v-list-item>
            <v-list-item @click="handleClick('Disable ads')" ripple>
              <div class="clickable-list-item">Disable ads</div>
            </v-list-item>
            <v-list-item @click="handleClick('Invite a friend')" ripple>
              <div class="clickable-list-item">Invite a friend</div>
            </v-list-item>
          </v-list>
        </div>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<style scoped>

.v-main {
  min-height: 100vh;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-image: url('/image/bg-wood.png');
  background-repeat: repeat;
  background-size: auto;
  background-position: center;
  background-attachment: fixed;
}
.main-wrapper {
  height: 100%;
  min-height: 100vh;
  width: 100%;
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
  font-size: clamp(1.2rem, 2.5vw, 2rem);
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
  font-size: clamp(25px, 5vw, 32px);
}
html,
body,
.v-application {
  height: 100%;
  overflow-y: auto;
}

.empty-folder-icon {
  font-size: clamp(58px, 20vw, 122px);
}

.empty-folder-text {
  font-size: clamp(16px, 4vw, 22px);
  font-weight: 500;
  color: #666;
}
.card-no-color {
  background-color: transparent !important;
  box-shadow: none !important;
}
.full-width-section {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
