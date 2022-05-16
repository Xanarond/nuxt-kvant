<template>
  <DxDataGrid
    :columns="columns"
    :show-borders="true"
    :data-source="content"
    :column-width="150"
    alignment="center"
  >
    <DxExport :enabled="true" :allow-export-selected-data="true" />
    <!--      <DxHeaderFilter :allow-search="true"/>-->
  </DxDataGrid>
  <!--    <DxScrolling column-rendering-mode="virtual" row-rendering-mode="infinite"/>-->
</template>

<script>
import DxDataGrid, { DxExport } from 'devextreme-vue/data-grid'
import TableService from '@/services/table.service'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'MainTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { DxDataGrid, DxExport },
  data: () => ({
    content: '',
    columns: [
      'id',
      'TIME',
      '1st Insp DATE',
      'INSPECTOR',
      'PRODUCT TYPE',
      'MATERIAL',
      'P/N(SAP)',
      'CLAIM',
      'STATUS',
      'SHIPMENT',
      'TTN',
      'INCH (FACT)',
      'PANEL TYPE',
      'SERIAL NUMBER',
      'PPID',
      'SU',
      'DESTINATION',
      'CODE',
      'RB BARCODE',
      'COMMENT',
    ],
  }),
  mounted() {
    TableService.getPublicContent().then(
      response => {
        this.content = response.data
      },
      error => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      },
    )
  },
}
</script>

<style scoped></style>
