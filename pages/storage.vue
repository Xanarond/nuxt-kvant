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
      <StockTable />
    </div>
    <v-container />
  </v-container>
</template>

<script>
import LoadingScreen from '../components/LoadingScreen'
import StockTable from '../components/StockTable'
import UpdateButton from '../components/UpdateButton'
export default {
  name: 'StoragePage',
  components: { StockTable, UpdateButton, LoadingScreen },
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
