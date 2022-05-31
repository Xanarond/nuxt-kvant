<template>
  <div>
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
      <DxExport :enabled="true" :allow-export-selected-data="true" />
      <DxSelection mode="multiple" />
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
            <DxItem data-field="Location" />
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
            <DxItem data-field="1st Insp DATE" />
            <DxItem data-field="2nd Insp DATE" />
          </DxItem>
        </DxForm>
      </DxEditing>
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
      <DxColumn data-field="Storage Date" data-type="date" alignment="center" />
      <DxColumn data-field="2nd Insp DATE" data-type="date" alignment="center" format="dd.MM.yyyy" />
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
  </div>
</template>

<script>
import {
  DxColumn,
  DxDataGrid, DxEditing,
  DxExport,
  DxFilterRow,
  DxHeaderFilter, DxPager,
  DxPaging, DxPopup,
  DxScrolling, DxSearchPanel, DxSelection
} from 'devextreme-vue/data-grid'
import { DxTextArea } from 'devextreme-vue/text-area'
import { DxItem } from 'devextreme-vue/form'
import { DxForm } from 'devextreme-vue'

export default {
  name: 'StockTable',
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
    DxSelection,
    DxEditing,
    DxPopup,
    DxItem,
    DxForm
  },
  data () {
    return {
      content: '',
      showHeaderFilter: true,
      showFilterRow: true,
      showSearchPanel: true
    }
  },
}
</script>

<style scoped />
