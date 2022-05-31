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
      <MainTable />
    </div>
  </v-container>
</template>

<script>
import UpdateButton from '../components/UpdateButton'
import LoadingScreen from '../components/LoadingScreen'
import MainTable from '../components/MainTable'
export default {
  name: 'IndexPage',
  components: { MainTable, LoadingScreen, UpdateButton },
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
