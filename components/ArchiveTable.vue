<template>
  <DxDataGrid
    :show-borders="true"
    :data-source="content"
    :allow-column-reordering="true"
    alignment="center"
    key-expr="id"
    :column-width="150"
  >
    <DxExport :enabled="true" :allow-export-selected-data="true" />
    <DxHeaderFilter
      :visible="showHeaderFilter"
    />
    <DxFilterRow
      :visible="showFilterRow"
      alignment="center"
    />
    <DxSelection mode="multiple" />
    <DxPaging :enabled="false" />
    <DxColumn :width="120" data-field="id" :allow-editing="false" caption="ID" alignment="center" />
    <DxColumn :width="150" data-field="MATERIAL" caption="MATERIAL" alignment="center" />
    <DxColumn :width="150" data-field="CLAIM" alignment="center" />
    <DxColumn :width="150" data-field="INCH (FACT)" alignment="center" />
    <DxColumn :width="250" data-field="SERIAL NUMBER" alignment="center" />
    <DxColumn :width="130" data-field="SU" alignment="center" />
    <DxColumn :width="150" data-field="DESTINATION" alignment="center" />
    <DxColumn data-field="CODE" alignment="center" />
    <DxColumn data-field="RB BARCODE" alignment="center" />
    <DxColumn :width="200" data-field="COMMENT" alignment="center" />
    <DxColumn data-field="Upload Date" data-type="date" alignment="center" />
    <DxColumn data-field="1st Insp DATE" data-type="date" alignment="center" format="dd.MM.yyyy" />
    <DxColumn data-field="2nd Insp DATE" data-type="date" alignment="center" format="dd.MM.yyyy" />
    <DxColumn data-field="2nd Insp TIME" data-type="time" alignment="center" format="HH.mm.ss" />
    <DxColumn data-field="Putaway DATE" data-type="date" alignment="center" format="dd.MM.yyyy" />
    <DxColumn data-field="Outbound DATE" data-type="date" alignment="center" format="dd.MM.yyyy" />
    <DxColumn data-field="Scrap DATE" data-type="date" alignment="center" />
    <DxColumn data-field="Global Status" alignment="center" />
    <DxColumn data-field="Local Status" alignment="center" />
    <DxColumn data-field="BOX" alignment="center" />
    <DxColumn data-field="Location" alignment="center" />
    <DxColumn data-field="Responsible_user" alignment="center" caption="Responsible" />
    <DxPaging :page-size="10" />
    <DxPager
      :show-page-size-selector="true"
      :allowed-page-sizes="[10, 20, 50, 100, 250, 500]"
    />
    <DxSearchPanel :visible="true" placeholder="Search..." />
    <DxScrolling column-rendering-mode="virtual" row-rendering-mode="infinite" />
  </DxDataGrid>
  <!--    <DxScrolling column-rendering-mode="virtual" row-rendering-mode="infinite"/>-->
</template>

<script>
import {
  DxColumn,
  DxDataGrid,
  DxExport,
  DxFilterRow,
  DxHeaderFilter, DxPager,
  DxPaging,
  DxScrolling, DxSearchPanel, DxSelection
} from 'devextreme-vue/data-grid'
import { DxTextArea } from 'devextreme-vue/text-area'
import TableService from '../services/table.service'
import EventBus from '@/middleware/EventBus'

export default {
  name: 'ArchiveTable',
  components: {
    DxDataGrid,
    DxScrolling,
    DxColumn,
    DxExport,
    // eslint-disable-next-line vue/no-unused-components
    DxTextArea,
    DxHeaderFilter,
    // eslint-disable-next-line vue/no-unused-components
    DxFilterRow,
    DxPaging,
    DxPager,
    DxSearchPanel,
    DxSelection
  },
  // props: { loading: Boolean },
  data () {
    return {
      content: '',
      showHeaderFilter: true,
      showFilterRow: true,
      showSearchPanel: true
    }
  },
  mounted () {
    TableService.getArchiveTable().then(
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
    this.$nuxt.$on('updatetable', () => {
      TableService.getArchiveTable().then(
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
      this.$nuxt.$emit('updating')
    })
  },
  beforeDestroy () {
    this.$nuxt.$off('updatetable')
  }
}
</script>

<style scoped>

</style>
