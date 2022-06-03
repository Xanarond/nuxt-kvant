<template>
  <v-container fluid>
    <div id="app">
      <v-row v-if="alert" justify="end">
        <v-alert
          v-if="message && successful"
          transition="fade-transition"
          :value="alert"
          color="green"
          type="info"
        >
          {{ message }}
        </v-alert>
        <v-alert
          v-if="message && !successful"
          transition="fade-transition"
          :value="alert"
          color="red"
          type="info"
        >
          {{ message }}
        </v-alert>
      </v-row>
      <v-spacer v-else class="pb-12" />
      <form method="post" @submit.prevent="handleRegister">
        <v-card class="mx-auto card" max-width="500">
          <v-card-title class="headline justify-center">
            Register user into KWANT
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
              :rules="username_rules"
              hide-details="auto"
            />
          </v-row>
          <v-row>
            <!--            :rules="[password_rules.password]"-->
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
          <v-row>
            <v-select
              v-model="user.role"
              :items="['admin', 'worker']"
              label="User Role"
            />
          </v-row>
          <v-row>
            <v-select
              v-show="user.role === 'worker'"
              v-model="user.division"
              :rules="div_rules"
              :items="['Inspection','Storage', 'Repair']"
              label="Division"
            />
          </v-row>
          <v-row justify="center">
            <v-btn
              v-if="!user.username || !user.password || !user.role || (user.role === 'worker' && !user.division)"
              disabled
              block
              color="primary"
              type="submit"
              @click="alert = true"
            >
              Add user
            </v-btn>
            <v-btn
              v-else
              block
              color="primary"
              type="submit"
              @click="alert = true"
            >
              Add user
            </v-btn>
          </v-row>
        </v-card>
      </form>
    </div>
  </v-container>
</template>

<script>
import User from '@/models/user'

export default {
  name: 'SignupPage',
  data () {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      successful: false,
      loading: false,
      valid: true,
      value: true,
      alert: false,
      message: '',
      username_rules: [
        value => !!value || 'Username Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
        value => value.length < 20 || 'Username is too long!'
      ],
      div_rules: [
        value => !!value || 'Division Required.'
      ]
    }
  },

  mounted () {
    this.hideAlert()
  },

  methods: {
    handleRegister () {
      this.message = ''
      this.submitted = true
      this.$store.dispatch('register', this.user).then(
        (data) => {
          this.message = data.message
          this.successful = true
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          this.successful = false
        }
      )
    },
    hideAlert () {
      window.setInterval(() => {
        this.alert = false
      }, 7000)
    }
  }
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
