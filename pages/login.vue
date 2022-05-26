<template>
  <v-container fluid>
    <v-row v-if="alert" justify="end">
      <v-alert
        v-if="message"
        transition="fade-transition"
        :value="alert"
        color="red"
        type="warning"
      >
        {{ message }}
      </v-alert>
    </v-row>
    <v-spacer v-else class="pb-12" />
    <form id="app" method="post" @submit.prevent="handleLogin">
      <v-card class="mx-auto card" max-width="500">
        <v-card-title class="headline justify-center">
          Welcome to KWANT
        </v-card-title>
        <v-row justify="center">
          <v-col cols="4">
            <v-img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              class="login_img"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-text-field
            v-model="user.username"
            label="Username"
            :rules="rules"
            hide-details="auto"
          />
        </v-row>
        <v-row>
          <!-- :rules="[password_rules.required, password_rules.password]""-->
          <v-text-field
            v-model="user.password"
            autocomplete="current-password"
            label="Password"
            hint="Your password passed! Password rules are not meant to be broken!"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            :type="value ? 'password' : 'text'"
            @click:append="() => (value = !value)"
            @input="_ => (user.password = _)"
          />
        </v-row>
        <v-row justify="center">
          <v-btn
            v-if="user.username === '' || user.password === ''"
            block
            color="primary"
            disabled
            type="submit"
            @click="alert = true"
          >
            Login
          </v-btn>
          <v-btn v-else block color="primary" type="submit" @click="alert = true">
            Login
          </v-btn>
        </v-row>
      </v-card>
    </form>
  </v-container>
</template>

<script>
import User from '@/models/user'

export default {
  name: 'LoginPage',
  data: () => ({
    rules: [
      value => !!value || 'Username Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
    user: new User('', ''),
    loading: false,
    valid: true,
    value: true,
    alert: false,
    message: '',
    password_rules: {
      required: value => !!value || 'Required.',
      password: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/
        return (
          pattern.test(value) ||
          'Min. 8 characters with at least one capital letter, a number and a special character.'
        )
      },
    },
  }),
  computed: {
    loggedIn () {
      return this.$store.state.status.loggedIn
    },
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/')
    }
  },
  mounted () {
    this.hideAlert()
  },
  methods: {
    handleLogin () {
      JSON.parse(localStorage.getItem('user'))
      if (this.user.username && this.user.password) {
        this.loading = true
        this.$store.dispatch('login', this.user).then(
          () => {
            this.$router.push('/')
          },
          (error) => {
            this.loading = false
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          },
        )
      }
    },
    hideAlert () {
      window.setInterval(() => {
        this.alert = false
      }, 7000)
    },
  },
}
</script>

<style scoped>
.card {
  padding: 40px 40px;
}

.login_img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}
</style>
