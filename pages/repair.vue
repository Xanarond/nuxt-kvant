<template>
  <v-container fluid>
    <div v-if="loading">
      <LoadingScreen />
    </div>
    <div v-else>
      <v-row justify="end" class="pe-2">
        <v-col align-self="center">
          <v-toolbar-title>Repair Table</v-toolbar-title>
        </v-col>
        <v-col cols="3">
          <UpdateButton />
        </v-col>
      </v-row>
      <RepairTable />
    </div>
  </v-container>
</template>

<script>
import UpdateButton from '../components/UpdateButton'
import RepairTable from '../components/RepairTable'
import LoadingScreen from '../components/LoadingScreen'
export default {
  name: 'RepairPage',
  components: { UpdateButton, RepairTable, LoadingScreen },
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
