<template>
  <v-btn
    block
    :loading="loading"
    class="ma-2"
    color="primary"
    @click.prevent="loader = 'loading'"
    @click="$nuxt.$emit('updatetable')"
  >
    Update Table
  </v-btn>
</template>

<script>
export default {
  name: 'UpdateButton',
  data () {
    return {
      loader: null,
      loading: false
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 2000)

      this.loader = null
    },
  },
  methods: {
  }
}
</script>

<style scoped>
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
