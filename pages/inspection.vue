<template>
  <h2>Таблица Инспекция</h2>
</template>

<script>
import EventBus from '@/middleware/EventBus'
import TableService from '@/services/table.service'

export default {
  name: 'InspectionPage',
  data: () => ({
    content: '',
  }),
  mounted() {
    TableService.getInspectionTable().then(
      (response) => {
        this.content = response.data
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
      }
    )
  },
}
</script>

<style scoped></style>
