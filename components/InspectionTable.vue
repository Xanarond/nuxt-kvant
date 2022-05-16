<template>
  <v-row justify="center">
    <DxDataGrid
      :show-borders="true"
      :data-source="content"
      alignment="center"
      key-expr="ID"
    >
      <DxExport :enabled="true" :allow-export-selected-data="true" />
      <DxHeaderFilter
        :visible="showHeaderFilter"
        :allow-header-filtering="true"
      />
      <DxPaging :enabled="false" />
      <DxEditing
        :allow-updating="true"
        :allow-adding="false"
        :allow-deleting="false"
        mode="popup"
      >
        <DxPopup
          :show-title="true"
          :width="700"
          :height="525"
          title="Inspection Info"
        />
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="MATERIAL" />
            <DxItem data-field="CLAIM" />
            <DxItem data-field="INCH (FACT)" />
            <DxItem data-field="SERIAL NUMBER" />
            <DxItem data-field="SU" />
            <DxItem data-field="BOX" />
            <DxItem data-field="RB BARCODE" />
            <DxItem
              :col-span="2"
              :editor-options="{ height: 100 }"
              data-field="COMMENT"
              editor-type="dxTextArea"
            />
          </DxItem>
          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
            caption="Dates"
          >
            <DxItem data-field="1st Insp DATE" :value="'17/03/2022'" />
            <DxItem data-field="2nd Insp DATE" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn :width="70" data-field="ID" :allow-editing="false" />
      <DxColumn data-field="MATERIAL" caption="MATERIAL" />
      <DxColumn data-field="CLAIM" />
      <DxColumn data-field="INCH (FACT)" />
      <DxColumn :width="180" data-field="SERIAL NUMBER" />
      <DxColumn :width="170" data-field="SU" />
      <DxColumn :width="125" data-field="STATUS" />
      <DxColumn :width="170" data-field="BOX" />
      <DxColumn :width="170" data-field="RB BARCODE" />
      <DxColumn data-field="COMMENT" />
      <DxColumn data-field="1st Insp DATE" data-type="date" />
      <DxColumn data-field="2nd Insp DATE" data-type="date" />
      <DxScrolling
        column-rendering-mode="virtual"
        row-rendering-mode="infinite"
      />
    </DxDataGrid>
  </v-row>
</template>

<script>
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxExport,
  DxFilterRow,
  DxForm,
  DxHeaderFilter,
  DxPaging,
  DxPopup,
  DxScrolling,
} from 'devextreme-vue/data-grid'
import { DxTextArea } from 'devextreme-vue/text-area'
import { DxItem } from 'devextreme-vue/form'
import TableService from '@/services/table.service'
import EventBus from '@/middleware/EventBus'

export default {
  name: 'InspectionTable',
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
    DxEditing,
    DxPopup,
    DxForm,
    DxItem,
    DxPaging,
  },

  data: () => ({
    content: '',
    showFilterRow: true,
    showHeaderFilter: true,
    columns: [
      'ID',
      'MATERIAL',
      'CLAIM',
      'INCH (FACT)',
      'SERIAL NUMBER',
      'SU',
      'STATUS',
      'BOX',
      'RB BARCODE',
      'COMMENT',
      '1st Insp DATE',
      '2nd Insp DATE',
    ],
  }),
  mounted() {
    TableService.getInspectionTable().then(
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
        if (error.response && error.response.status === 403) {
          EventBus.dispatch('logout')
        }
      },
    )
  },
}
</script>

<style scoped></style>
