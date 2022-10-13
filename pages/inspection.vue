<template>
  <v-container fluid>
    <div v-if="loading">
      <LoadingScreen />
    </div>
    <div v-else>
      <v-row justify="end" class="pe-2">
        <v-col align-self="center">
          <v-toolbar-title>Inspection Table</v-toolbar-title>
        </v-col>
        <v-col cols="3">
          <UpdateButton />
        </v-col>
      </v-row>
      <InspectionTable />
    </div>
  </v-container>
</template>

<script>
import UpdateButton from '../components/UpdateButton'
import InspectionTable from '../components/InspectionTable'
export default {
  name: 'InspectionPage',
  components: { InspectionTable, UpdateButton },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
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
      }, 2200)
    }
  }
}
</script>

<style scoped></style>
