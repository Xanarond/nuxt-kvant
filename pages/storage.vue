<template>
  <div v-if="loading">
    <LoadingScreen />
  </div>
  <div v-else>
    <h2>Таблица Хранение</h2>
  </div>
</template>

<script>
import LoadingScreen from '../components/LoadingScreen'
export default {
  name: 'StoragePage',
  components: { LoadingScreen },
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
      }, 3200)
    }
  }
}
</script>

<style scoped></style>
