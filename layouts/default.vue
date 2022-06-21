<template>
  <v-app>
    <v-main class="mt-10">
      <div v-show="loading">
        <LoadingScreen />
      </div>
      <div v-if="!loading">
        <Nuxt />
      </div>
    </v-main>
    <v-app-bar
      v-if="!$store.state.user"
      dense
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        color="primary"
        depressed
        nuxt
        to="/"
        style="margin-right: 10px"
      >
        Mainpage
      </v-btn>
      <v-btn color="primary" nuxt to="/login">
        Login
      </v-btn>
    </v-app-bar>
    <v-app-bar v-else dense :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <div v-if="$store.state.user">
        <AddItemDialog />
      </div>
      <v-btn
        v-if="useAdminRules"
        depressed
        nuxt
        to="/append"
        color="primary"
        style="margin-right: 10px"
      >
        Add Rows from file
      </v-btn>
      <v-btn
        v-if="useAdminRules"
        depressed
        nuxt
        to="/signup"
        color="primary"
        style="margin-right: 10px"
      >
        Add Users
      </v-btn>
      <v-btn
        v-if="!useAdminRules"
        color="primary"
        depressed
        nuxt
        to="/"
        style="margin-right: 10px"
      >
        MainPage
      </v-btn>
      <v-btn
        v-if="$store.state.user.division === 'Inspection' || !$store.state.user && !useAdminRules"
        color="primary"
        depressed
        nuxt
        to="/inspection"
        style="margin-right: 10px"
      >
        Inspection
      </v-btn>
      <v-btn
        v-if="$store.state.user.division === 'Storage' || !$store.state.user && !useAdminRules"
        color="primary"
        depressed
        nuxt
        to="/storage"
        style="margin-right: 10px"
      >
        Storage
      </v-btn>
      <v-btn
        v-if="$store.state.user.division === 'Repair'|| !$store.state.user && !useAdminRules"
        color="primary"
        depressed
        nuxt
        to="/repair"
        style="margin-right: 10px"
      >
        Repair
      </v-btn>
      <v-btn
        v-if="$store.state.user.division === 'Archive'|| !$store.state.user && !useAdminRules"
        color="primary"
        depressed
        nuxt
        to="/archive"
        style="margin-right: 10px"
      >
        Archive
      </v-btn>
      <v-menu v-if="useAdminRules" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            style="margin-right: 10px"
            v-on="on"
          >
            Sections
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            nuxt
            :to="item.to"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="!$store.state.user" color="primary" to="/login">
        Login
      </v-btn>
      <v-dialog
        v-else
        v-model="dialog"
        max-width="600px"
        persistent
      >
        <template #activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" dark v-on="on">
            Logout
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5 justify-center">
            Are you sure about that?
          </v-card-title>
          <!--<v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>-->
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="red darken-1"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click.prevent="logOut"
              @click="dialog = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-footer :absolute="true" app content="center">
      <span>KVANT DB &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import LoadingScreen from '../components/LoadingScreen'
import EventBus from '@/middleware/EventBus'

export default {
  name: 'NavDrawer',
  components: { LoadingScreen },
  data () {
    return {
      clipped: false,
      drawer: false,
      loading: true,
      items: [
        {
          title: 'Main Page',
          to: '/'
        },
        {
          title: 'Inspection',
          to: '/inspection'
        },
        {
          title: 'Storage',
          to: '/storage'
        },
        {
          title: 'Repair',
          to: '/repair'
        },
        {
          title: 'Archive',
          to: '/archive'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'KVANT',
      dialog: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    useAdminRules () {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === 'ROLE_ADMIN'
      }
      return false
    }
  },
  beforeDestroy () {
    EventBus.remove('logout')
  },
  mounted () {
    EventBus.on('logout', () => {
      this.logOut()
    })
    this.startTimer()
  },
  methods: {
    stopTimer () {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
    },
    startTimer () {
      this.stopTimer()
      this.interval = window.setInterval(() => {
        this.loading = false
      }, 3000)
    },
    logOut () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
html {
  overflow-y: auto;
}
/*.v-main {
  padding: 0px 0px 36px !important;
}*/
</style>
