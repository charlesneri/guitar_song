<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'

import { computed } from 'vue'

const isFavorited = ref(false)
const favoriteSongs = ref([]) // You can later move this to a global store or shared state
const router = useRouter()
// Raw lyrics with chords
const rawLyrics = ref(`
 Capo 2
 
I know that we are young. And I know you that may love me.
But I just can't be with you like this anymore. Alejandro.
 
 
[Intro]
 
Am C Em x4
 
 
[Verse 1]
 
          Am         C        Em
She's got both hands,  in her pockets
    Am                C                  Em
And she won't look at you, won't look at you
          Am        C          Em
She hides true love,  en su bolsillo
            Am              C              Em
She's got a halo 'round her finger, around you
 
 
[Bridge]
 
Am              C             Em
You know that I love you boy, hot like Mexico, rejoice
Am              C               Em
At this point I gotta choose, nothing to lose
 
 
[Chorus]
 
              F                   C        G       Am
Don't call my name, don't call my name, Alejandro
             F                  C        G      Am
I'm not your babe, I'm not your babe, Fernando
            F                 C                     G                 Am
Don't wanna kiss, don't wanna touch, just smoke one cigarette and hush
              F                   C       G     Am
Don't call my name, don't call my name, Roberto
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
 
 
[Interlude]
 
Am          C     Em                   Am     C            Em
(Just stop. please, just let me go. Alejandro, just let me go)
 
 
[Verse 2]
 
          Am     C             Em
She's not broken, she's just a baby
        Am                 C                Em
But her boyfriend's like a dad, just like a dad
               Am                  C         Em
And all  those flames that, burn before him
    Am                C                     Em
Now he's gonna find a fight, gonna fool the bad
 
 
[Bridge]
 
Am              C             Em
You know that I love you boy, hot like Mexico, rejoice
Am              C               Em
At this point I gotta choose, nothing to lose
 
 
[Chorus]
 
              F                   C        G       Am
Don't call my name, don't call my name, Alejandro
             F                  C        G      Am
I'm not your babe, I'm not your babe, Fernando
            F                 C                     G                 Am
Don't wanna kiss, don't wanna touch, just smoke one cigarette and hush
              F                   C       G     Am
Don't call my name, don't call my name, Roberto
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
 
             Am               C   Em
Don't bother me, don't bother me, Alejandro
              Am                  C     Em
Don't call my name, don't call my name, my Fernando
             F                  C     G  Am
I'm not your babe, I'm not your babe, Alejandro
            F                 C         G      Am
Don't wanna kiss, don't wanna touch, Fernando
              F                   C        G      Am
Don't call my name, don't call my name, Alejandro
             F                   C        G     Am
I'm not your babe,  I'm not your babe, Fernando
            F                 C                     G                 Am
Don't wanna kiss, don't wanna touch, just smoke one cigarette and hush
              F                   C       G     Am
Don't call my name, don't call my name, Roberto
 
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
 
 
[Outro]
 
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
   F          C      G  Am
Alejandro, Alejandro
F               C           G  Am
Ale-ale-jandro, Ale-ale-jandro
   Am
Alejandro



`)

// Highlight chords dynamically
const formattedLyrics = computed(() => {
  return rawLyrics.value
    .split('\n')
    .map((line) => {
      // Check if the line is mostly chords
      const isChordLine =
        /^(\s*[A-G][#b]?(maj|min|m|dim|aug|sus|add)?[0-9]*(\/[A-G][#b]?)?\s*)+$/i.test(line.trim())

      if (isChordLine) {
        return `<span style="color: #1976d2; font-weight: bold; display: block; margin-bottom: 4px; font-family: 'Courier New', monospace;">${line}</span>`
      }

      // Inline-style chords within lyric lines
      return line.replace(
        /\b([A-G][#b]?(maj|min|m|dim|aug|sus|add)?[0-9]*(\/[A-G][#b]?)?)\b/g,
        (_, space, chord) =>
          `${space}<span style="color: #1976d2; font-weight: bold;">${chord}</span>`,
      )
    })
    .join('\n')
})
//autoscroll
/*
const lyricsContainer = ref(null)

const isPlaying = ref(false)
let scrollInterval = null

const togglePlayback = () => {
  isPlaying.value = !isPlaying.value

  if (isPlaying.value) {
    lyricsContainer.value.scrollTop = 0 // optional: reset scroll to top

    scrollInterval.value = setInterval(() => {
      const el = lyricsContainer.value
      if (!el) return

      el.scrollTop += 1.5

      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        clearInterval(scrollInterval.value)
        isPlaying.value = false
      }
    }, 20)
  } else {
    clearInterval(scrollInterval.value)
  }
}
onBeforeUnmount(() => {
  clearInterval(scrollInterval.value)
})
  */
onMounted(() => {
  const stored = localStorage.getItem('favoriteSongs')
  if (stored) {
    favoriteSongs.value = JSON.parse(stored)
    isFavorited.value = favoriteSongs.value.some((song) => song.title === 'Alejandro')
  }

  // optional default render position
  iconPosition.value = 'bottom'
})
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value

  if (isFavorited.value) {
    // Add to favorites
    favoriteSongs.value.push({
      title: 'Alejandro',
      artist: 'Lady Gaga',
      lyrics: rawLyrics.value,
      image: '/image/gaga.jpg',
    })
  } else {
    // Remove from favorites
    favoriteSongs.value = favoriteSongs.value.filter((song) => song.title !== 'Alejandro')
  }

  localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs.value))
}
const showPositionPicker = ref(false)

const setIconPosition = (position) => {
  iconPosition.value = position
  showPositionPicker.value = false // hide after selecting
}

const iconPosition = ref('bottom') // default position

const iconDirectionClass = computed(() => {
  return ['top', 'bottom'].includes(iconPosition.value) ? 'horizontal-icons' : 'vertical-icons'
})

const iconPositionStyles = computed(() => {
  switch (iconPosition.value) {
    case 'top':
      return {
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 'auto',
        right: 'auto',
      }
    case 'right':
      return {
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        bottom: 'auto',
        left: 'auto',
      }
    case 'bottom':
      return {
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 'auto',
        right: 'auto',
      }
    case 'left':
      return {
        top: '50%',
        left: '20px',
        transform: 'translateY(-50%)',
        bottom: 'auto',
        right: 'auto',
      }
    default:
      return {}
  }
})
</script>

<template class="main-template">
  <v-responsive class="border rounded">
    <v-app>
      <v-app-bar flat fixed height="64" class="main-color">
        <!-- Left: Menu + Title -->
        <div class="left-group d-flex align-center">
          <v-btn icon @click="router.back()">
            <v-icon class="icon-size">mdi-arrow-left</v-icon>
          </v-btn>
          <h1 class="app-title">Alejandro</h1>
        </div>

        <!-- Right: Icon Group -->
        <div class="icon-group-fixed d-flex align-center">
          <v-btn icon class="icon-margin">
            <v-icon class="icon-margin fontawesome-icon">mdi-unfold-more-vertical</v-icon>
          </v-btn>

          <v-btn icon class="icon-margin" @click="togglePlayback">
            <v-icon v-if="isPlaying">mdi-pause</v-icon>
            <v-icon v-else>mdi-play</v-icon>
          </v-btn>

          <v-btn icon class="icon-margin">
            <v-icon class="icon-margin">mdi-reload</v-icon>
          </v-btn>
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn icon v-bind="props" class="icon-margin">
                <v-icon class="icon-size">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list class="menu-list">
              <v-list-group value="Preference">
                <template #activator="{ props }">
                  <v-list-item v-bind="props">
                    <v-list-item-title>Preference</v-list-item-title>
                  </v-list-item>
                </template>

                <v-list-item
                  @click="setIconPosition('top')"
                  :class="{ 'active-position': iconPosition === 'top' }"
                >
                  <v-list-item-title>Top</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="setIconPosition('bottom')"
                  :class="{ 'active-position': iconPosition === 'bottom' }"
                >
                  <v-list-item-title>Bottom</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="setIconPosition('left')"
                  :class="{ 'active-position': iconPosition === 'left' }"
                >
                  <v-list-item-title>Left</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="setIconPosition('right')"
                  :class="{ 'active-position': iconPosition === 'right' }"
                >
                  <v-list-item-title>Right</v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-item>
                <v-list-item-title>Song Language</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>View</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Help</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Disable</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>

      <!--main diri-->
      <v-main>
        <div class="lyrics-container pa-6" ref="lyricsContainer">
          <div class="lyrics" v-html="formattedLyrics"></div>
          <!-- Fixed button group -->
          <div class="fixed-footer-icons" :class="iconDirectionClass" :style="iconPositionStyles">
            <v-btn flat class="icon-trans" @click="toggleFavorite">
              <v-icon class="icon-size">
                {{ isFavorited ? 'mdi-star' : 'mdi-star-outline' }}
              </v-icon>
            </v-btn>
            <v-btn flat class="icon-trans"><v-icon class="icon-size">mdi-thumb-up</v-icon></v-btn>
            <v-btn flat class="icon-trans"
              ><v-icon class="icon-size">mdi-share-variant</v-icon></v-btn
            >
            <v-btn flat class="icon-trans">
              <iconify-icon icon="fe:app-menu" class="square-9"></iconify-icon>
            </v-btn>
          </div>
        </div>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<style scoped>
.v-main {
  padding-top: 64px; /* Add this so v-main respects the fixed app-bar */
  background-image: url('/public/image/bg-wood.png');
  background-color: #ffffff;
  background-repeat: repeat;
  background-size: 50px;
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
  font-size: 30px;
}
.fontawesome-icon {
  transform: rotate(90deg);
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
.lyrics-container {
  padding-top: 80px; /* 64px for app bar + some spacing */
  background-image: url('/public/image/bg-note.png');
  background-color: #ffffff;
  background-repeat: repeat;
  background-size: 50px;
  background-position: center;
  background-attachment: fixed;
  overflow-y: auto;
  height: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  scroll-behavior: smooth;
}

.lyrics {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.8;
  color: #000000;
  font-weight: 700;
}

.icon-trans {
  background-color: transparent;
}

.square-9,
.icon-size {
  font-size: clamp(24px, 4vw, 50px);
}

.fixed-footer-icons {
  position: fixed;
  z-index: 1000;
  background-color: transparent;
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  max-width: 90vw;
}

.horizontal-icons {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.vertical-icons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.position-picker {
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: #fff;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.active-position {
  background-color: #ca9b5e !important;
  color: white !important;
  font-weight: bold;
}
@media (max-width: 600px) {
  .fixed-footer-icons {
    padding: 6px 8px;
    gap: 8px;
  }

  .icon-size {
    font-size: 32px;
  }
}
</style>
