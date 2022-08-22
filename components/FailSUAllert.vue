<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="1000px"
      border="left"
      colored-border
      overlay-color="#dd1c1c"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">These records are already in the database. Check the correctness of the data in the file!</span>
        </v-card-title>
        <v-textarea
          background-color="primary lighten-1"
          filled
          auto-grow
          :value="numbers"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

export default {
  name: 'FailSUAllert',
  // eslint-disable-next-line vue/require-prop-types
  props: ['numbers'],
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    this.$nuxt.$on('alert_su', () => {
      this.dialog = true
    })
  },
  beforeDestroy () {
    this.$nuxt.$off('alert_su')
  }
}
</script>
<style scoped>
</style>
