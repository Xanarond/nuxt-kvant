<template>
  <v-container fluid>
    <div v-if="loading">
      <LoadingScreen />
    </div>
    <div v-else>
      <v-row justify="end" class="pe-2">
        <v-col cols="3">
          <UpdateButton />
        </v-col>
      </v-row>
      <ArchiveTable />
    </div>
  </v-container>
</template>

<script>
import LoadingScreen from '../components/LoadingScreen'
import ArchiveTable from '../components/ArchiveTable'
import UpdateButton from '../components/UpdateButton'
export default {
  name: 'ArchivePage',
  components: { UpdateButton, ArchiveTable, LoadingScreen },
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
