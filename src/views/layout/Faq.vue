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
          <h1 class="app-title">F.A.Q</h1>
        </div>

        <!-- Right: Icon Group -->
        <div class="icon-group-fixed d-flex align-center">
          <v-btn icon class="icon-margin">
            <v-icon class="icon-size icon-margin">mdi-file</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <!--main diri-->
      <v-main>
        <v-container>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How to change scroll Speed?</b></span>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How to display songs in a certain language?</b></span>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
            <!--Q 1-->
            <div class="faq-item">
              <span class="faq-question"><b>How to add songs to the setlists?</b></span>
              <p class="faq-answer">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn>
              </p>
            </div>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How to copy songs to “My songs” section?</b></span>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How to hide some artists from my list?</b></span>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How to change key of the songs (transpose)?</b></span>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How to change font size?</b></span>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span
              ><b
                >I want to help with the translation of the application into my native language. How
                can i do it?</b
              ></span
            >
            <p class="faq-answer">
              You can do it directly from the application go to settings and select “help to
              translate
            </p>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How can I add a new songs to the database?</b></span>
            <p class="faq-answer">
              Visit the website <u>en.guitarsongs.club</u>, log in using google account and you can
              add your favorite songs in a common database. New songs are immediately available for
              all users. Just click “Synchronize” button in the application.
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"
              ><b
                >Can I view next song while I am playing current song, without getting back to
                list?</b
              ></span
            >
            <p class="faq-answer">
              Yes, you can use gestures, swipe to the “left” or “right” gestures works only in the
              current folder.
            </p>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"
              ><b>What the numbers do the next to the names of the songs?</b></span
            >
            <p class="faq-answer">
              This numbers are the average rating of tabs and chords for the song. You can vote for
              songs from the menu option “Rate” on the lyrics view list. We added this feature to
              prevent our database from low quality songs. We will moderate songs with low rating
              more carefully and we will try to make them better if that possible.
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"
              ><b>I can’t listen the songs, I do not have any sound!</b></span
            >
            <p class="faq-answer">This is songbook,here you can find only lyrics of songs.</p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"
              ><b
                >After last update I have tons of bugs in the application, what should I do?</b
              ></span
            >
            <p class="faq-answer">
              Please, feel free to contact us with describing of each bug, your device model and
              android version.
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How to look on the chord layout?</b></span>
            <p class="faq-answer">Just press on the interested chord.</p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <span class="faq-question"><b>How could I add my song to the database? </b></span>
            <p class="faq-answer">
              Best of all - use the site <u> en.guiarsongs.club</u> , then you’ve added songs will
              be immediately available to other users. If tou want to add a song just for yourself,
              then do the following: while you on the “My songs” list go to the menu and choose
              “import...” after choose the folder tx-file.
            </p>
            <p class="faq-answer">
              <span class="youtube-line">
                Watch on Youtube →
                <v-btn class="eye-button" elevation="0">
                  <v-icon class="eye-icon">mdi-eye</v-icon>
                </v-btn></span
              >
            </p>
          </div>
          <!--Q 1-->
          <div class="faq-item">
            <spa class="faq-questionn"
              ><b>How to tell about bug, ask a question, or notify developer? </b></spa
            >
            <p class="faq-answer">
              Please write your message on our official page-
              <a href="#" class="faq-link"> https:// www.facebook.com/groups/guitarsongsclub/</a>
            </p>
          </div>
        </v-container>
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
  background: rgba(221, 184, 125, 0.85);
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
  font-size: clamp(25p x, 5vw, 32px);
}
html,
body,
.v-application {
  height: 100%;
  overflow-y: auto;
}
.faq-item {
  margin-bottom: 24px;
}

.faq-question {
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
}

.faq-answer {
  font-size: clamp(14px, 2vw, 18px);
  line-height: 1.6;
  display: flex;
  align-items: center;
  text-align: justify;
  flex-wrap: wrap;
  gap: 8px;
}

.eye-button {
  background-color: #efefef;
  min-width: 32px;
  height: 32px;
  width: auto;
  padding: 4px;
  border-radius: 8px;
}

.eye-icon {
  font-size: clamp(18px, 4vw, 25px);
  color: #000000;
}
.faq-link {
  color: #000000;
}
.faq-link:hover {
  color: rgb(211, 211, 216);
}
.youtube-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  white-space: nowrap;
}
@media (max-width: 400px) {
  .faq-answer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
