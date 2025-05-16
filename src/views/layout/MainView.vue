<script setup>

//dri sugud
/* === Imports === */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'

/* === Router === */
const router = useRouter()

/* === Theme === */
const theme = useTheme()
const currentTheme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  theme.global.name.value = currentTheme.value
  localStorage.setItem('theme', currentTheme.value)
}

watch(currentTheme, (val) => {
  theme.global.name.value = val
  localStorage.setItem('theme', val)
})

/* === Responsive Drawer & Mobile === */
const drawer = ref(false)
const mini = ref(false)
const isMobile = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

/* === Snackbar === */
const snackbar = ref(false)
const snackbarMsg = ref('')
const snackbarColor = ref('')

/* === User Profile === */
const currentUserId = ref(null)
const currentUserProfile = ref({
  firstname: '',
  lastname: '',
  avatar_url: '',
  is_public_tutor: false,
})

//display profile public nav
const fetchCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    currentUserId.value = user.id
    const { data, error } = await supabase
      .from('profiles')
      .select('firstname, lastname, avatar_url')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return
    }

    // Directly set the avatar URL and user info
    currentUserProfile.value = {
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      avatar_url: data.avatar_url || 'default-avatar-url', // Set a default if empty
    }
  }
}

/* === Logout === */
const handleLogoutClick = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout failed:', error.message)
    snackbarMsg.value = 'Logout failed. Try again.'
    snackbarColor.value = 'red'
    snackbar.value = true
    return
  }

  currentUserId.value = null
  currentUserProfile.value = {
    firstname: '',
    lastname: '',
    avatar_url: '',
    is_public_tutor: false,
  }

  localStorage.removeItem('theme')

  snackbarMsg.value = 'Logged out successfully!'
  snackbarColor.value = 'green'
  snackbar.value = true

  setTimeout(() => {
    router.push('/')
  }, 1000)
}

/* === Tutors === */
const tutors = ref([])

const fetchTutors = async () => {
  const { data } = await supabase.from('profiles').select('*').eq('is_public_tutor', true)
  tutors.value = data || []
}

/* === Messaging === */
const messageInput = ref('')
const contacts = ref([
  {
    name: 'Charles Q. Neri',
    position: 'Developer',
    email: 'charlesneri0201@gmail.com',
    phone: '+639916474108',
    photo: 'public/image/charles-neri.png',
    description:
      'As a developer, I am in charge of how the platform works behind the scenes. I ensure that everything runs smoothly, from storing data to processing the bookings, so that students can easily schedule their sessions.',
  },
  {
    name: 'Erica Ellazo',
    position: 'Analyst',
    email: '0144mine@gmail.com',
    phone: '+639635680457',
    photo: 'public/image/erica.jpg',
    description:
      'As a data analyst, I look at how students use the platform to find patterns and ways to improve the system. I use data to help make the booking process better, so students can find the right mentor quickly and easily.',
  },
  {
    name: 'Jade C. Collado',
    position: 'Developer',
    email: 'jadecollado8@gmail.com',
    phone: '+639102889791',
    photo: 'public/image/jade.jpg',
    description:
      'As a developer, I work on the look and feel of the platform, making sure it is easy for students to use. I focus on creating a simple, smooth design that helps students book their sessions without any trouble.',
  },
])
/*
const sendMessage = () => {
  console.log('Message sent:', messageInput.value)
  messageInput.value = ''
}*/

/* === Lifecycle Hooks === */
onMounted(async () => {
  theme.global.name.value = currentTheme.value
  checkMobile()
  window.addEventListener('resize', checkMobile)

  await fetchCurrentUser()
  await fetchTutors()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})

// sending feedback to the supabase
const sendMessage = async () => {
  if (!messageInput.value.trim()) {
    snackbarMsg.value = 'Please enter a message.'
    snackbarColor.value = 'red'
    snackbar.value = true
    return
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    snackbarMsg.value = 'You must be logged in to send feedback.'
    snackbarColor.value = 'red'
    snackbar.value = true
    return
  }

  const { error } = await supabase.from('feedbacks').insert([
    {
      user_id: user.id,
      message: messageInput.value.trim(),
    },
  ])

  if (error) {
    console.error('Insert error:', error.message)
    snackbarMsg.value = 'Failed to send feedback.'
    snackbarColor.value = 'red'
    snackbar.value = true
  } else {
    snackbarMsg.value = 'Feedback sent. Thank you!'
    snackbarColor.value = 'green'
    snackbar.value = true
    messageInput.value = ''
  }
}

  
</script>
<template>
    <v-responsive class="border rounded">
    <v-app :theme="theme">
      
  <!-- Drawer Sidebar (right, collapsible) -->
  <transition name="fade-slide-up">
      <v-navigation-drawer
        v-if="drawer"
        :temporary="isMobile"
        :permanent="!isMobile"
        :width="isMobile ? '100%' : 280"
        right
        app
        :scrim="isMobile"
      >
        <!-- Menu Icon that toggles drawer size -->
        <v-btn icon class="ms-5 mt-5 d-lg-none" @click="toggleDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <!-- Profile -->
        <v-sheet
          class="pa-4 text-center"
          rounded="lg"
        >
          <v-avatar size="100" class="mb-3">
            <v-img :src="currentUserProfile.avatar_url" cover>
              <template #error>
                <v-icon size="80" color="grey-darken-1">mdi-account</v-icon>
              </template>
            </v-img>
          </v-avatar>

          <h3 v-if="!mini">{{ currentUserProfile.firstname }} {{ currentUserProfile.lastname }}</h3>
        </v-sheet>

        <v-divider class="my-2" />

        <v-list nav dense>
          <v-list-item :to="'/home'" tag="RouterLink" @click="isMobile && (drawer = false)">
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-home-outline</v-icon>
              <span v-if="!mini" class="icon-mdi">Home</span>
            </div>
          </v-list-item>

          <v-list-item :to="'/profile'" tag="RouterLink" @click="isMobile && (drawer = false)">
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-account-outline</v-icon>
              <span v-if="!mini" class="icon-mdi">My Profile</span>
            </div>
          </v-list-item>

          <v-list-item :to="'/appointments'" tag="RouterLink" @click="isMobile && (drawer = false)">
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-calendar</v-icon>
              <span v-if="!mini" class="icon-mdi">My Appointments</span>
            </div>
          </v-list-item>

          <v-list-item
            :to="'/DeleteHistory'"
            tag="RouterLink"
            @click="isMobile && (drawer = false)"
          >
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px"> mdi-delete-outline</v-icon>
              <span v-if="!mini" class="icon-mdi">Deleted Appointments</span>
            </div>
          </v-list-item>

          <v-divider class="my-2" />
          
          <v-list-item :to="'/about'" tag="RouterLink" @click="isMobile && (drawer = false)">
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-information-outline</v-icon>
              <span v-if="!mini" class="icon-mdi">About Us</span>
            </div>
          </v-list-item>

          <v-list-item :to="'/contact'" tag="RouterLink" @click="isMobile && (drawer = false)">
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-phone-outline</v-icon>
              <span v-if="!mini" class="icon-mdi">Contact Us</span>
            </div>
          </v-list-item>
          <v-list-item @click="handleLogoutClick">
            <div class="d-flex align-center" style="gap: 8px; width: 100%">
              <v-icon size="30" style="margin-left: 15px">mdi-logout</v-icon>
              <span v-if="!mini" class="icon-mdi">Logout</span>
            </div>
          </v-list-item>
          <!-- Theme toggle -->
          <div class="text-center mt-4">
            <v-btn icon @click="toggleTheme">
              <v-icon>{{
                currentTheme === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
              }}</v-icon>
            </v-btn>
          </div>
        </v-list>
      </v-navigation-drawer>
    </transition>
    <!-- App Bar -->
    <v-app-bar flat class="backside-color main-color">
      <!-- Menu Icon that toggles drawer size -->
      <v-btn icon class="ms-5" @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-container
        class="d-flex align-center pa-0"
        :class="{
          'transition-all': !isMobile,
          'no-transition': isMobile,
        }"
      >
      
      </v-container>
    </v-app-bar>

      <v-main>
        <v-container>
          <h1>Main Content</h1>
          
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
  </template>
  <style scoped>
  main,.backside-color{
    background: repeating-linear-gradient(
    to right,
    #e6b481,
     #e6b481 30px,
    #dca36d 30px,
     #dca36d 60px
  );
  }
  .main-color{
    background: #ddb887;
  mix-blend-mode: multiply;
  pointer-events: none;
  width: 100%;
  height: 50px;
  max-height: 100%;
  margin: 0;
  padding: 0;
  }
</style>