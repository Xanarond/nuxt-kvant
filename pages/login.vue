<template>
    <v-card
      class="mx-auto card"
      max-width="500"
    >
      <v-card-title class="headline justify-center">
        Welcome to KWANT
      </v-card-title>
      <v-row justify="center">
        <v-col cols="4">
          <v-img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="login_img"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-text-field
          label="Username"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          autocomplete="current-password"
          :value="userPassword"
          label="Password"
          hint="Your password passed! Password rules are not meant to be broken!"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[password_rules.password]"
          :type="value ? 'password' : 'text'"
          @click:append="() => (value = !value)"
          @input="_=>userPassword=_"
        ></v-text-field>
      </v-row>
      <v-row justify="center">
        <v-btn
          color="primary"
          to="/"
        >
          Login
        </v-btn>
      </v-row>
    </v-card>
</template>

<script>

export default {
  name: 'LoginPage',
  data: () => ({
    rules: [
      value => !!value || 'Username Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
    userPassword: "",
    valid: true,
    value: true,
    password_rules: {
      required: value => !!value || "Required.",
      password: value => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Min. 8 characters with at least one capital letter, a number and a special character."
        );
      }
    }
  }),
}
</script>

<style scoped>
.card {
  padding: 40px 40px;
}

.login_img {
  border-radius: 50%;
  height: 96px;
  width: 96px;
  margin: 0 10px;
}
</style>
