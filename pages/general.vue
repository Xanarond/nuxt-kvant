<template>
  <v-container>
    <h2>Полная таблица</h2>
    <h2>{{ content }}</h2>
  </v-container>
</template>

<script>
import TableService from '@/services/table.service'

export default {
  name: 'GeneralPage',
  data: () => ({
    content: '',
  }),
  mounted() {
    TableService.getPublicContent().then(
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
      }
    )
  },
}
</script>

<style scoped></style>
