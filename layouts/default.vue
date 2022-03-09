<template>
  <v-app>
    <!--    <v-navigation-drawer
          v-model="drawer"
          :mini-variant="miniVariant"
          :clipped="clipped"
          fixed
          app
        >
          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>-->
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
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
      <v-btn color="primary" depressed nuxt to="/" style="margin-right: 10px"
        >Главная</v-btn
      >
      <v-btn color="primary" nuxt to="/login">Login</v-btn>
    </v-app-bar>
    <v-app-bar v-else dense :clipped-left="clipped" fixed app>
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <!--      <v-btn icon @click.stop="miniVariant = !miniVariant">-->
      <!--        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>-->
      <!--      </v-btn>-->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn color="primary" depressed nuxt to="/" style="margin-right: 10px"
        >Главная</v-btn
      >
      <v-btn
        v-if="$store.state.user.division === 'inspection'"
        color="primary"
        depressed
        nuxt
        to="/inspection"
        style="margin-right: 10px"
        >Inspection</v-btn
      >
      <v-btn
        v-if="$store.state.user.division === 'storage'"
        color="primary"
        depressed
        nuxt
        to="/storage"
        style="margin-right: 10px"
        >Storage</v-btn
      >
      <v-btn
        v-if="$store.state.user.division === 'repair'"
        color="primary"
        depressed
        nuxt
        to="/repair"
        style="margin-right: 10px"
        >Repair</v-btn
      >
      <v-btn v-if="!$store.state.user" color="primary" nuxt to="/login"
        >Login</v-btn
      >
      <v-btn v-else color="primary" @click.prevent="logOut">Logout</v-btn>
    </v-app-bar>
    <v-footer :absolute="true" app content="center">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import EventBus from '@/middleware/EventBus'

export default {
  name: 'NavDrawer',
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-human-greeting',
          title: 'Добро пожаловать',
          to: '/',
        },
        {
          icon: 'mdi-menu',
          title: 'Разделы',
          to: '/sections',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'KWANT',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN')
      }

      return false
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR')
      }
      return false
    },
  },
  beforeDestroy() {
    EventBus.remove('logout')
  },
  mounted() {
    EventBus.on('logout', () => {
      this.logOut()
    })
  },
  methods: {
    logOut() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style>
html {
  overflow-y: auto;
}
</style>
