<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="1050px"
      border="left"
      colored-border
      overlay-color="#dd1c1c"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Error entering the ordinal status. Check the correctness of the filling!</span>
        </v-card-title>
        <v-textarea
          background-color="primary lighten-1"
          filled
          auto-grow
          :value="statuses"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click.stop="closeDialog"
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
  name: 'FailStatusAlert',
  // eslint-disable-next-line vue/require-prop-types
  props: ['statuses'],
  data () {
    return {
      dialog: false,
      dialogKey: 0
    }
  },
  mounted () {
    this.$nuxt.$on('alert_status', () => {
      this.dialog = true
    })
  },
  beforeDestroy () {
    this.$nuxt.$off('alert_status')
  },
  methods: {
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
<style scoped>
</style>
