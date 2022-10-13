<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="1050px"
      border="center"
      colored-border
      overlay-color="#dd1c1c"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Error entering the ordinal status. Check the correctness of the filling!</span>
        </v-card-title>
        <DxDataGrid
          :show-borders="true"
          :data-source="statuses"
          :allow-column-reordering="true"
          alignment="center"
          key-expr="su"
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
          <DxColumn data-field="su" caption="SU" alignment="center" />
          <DxColumn data-field="current_status" caption="Current Status" alignment="center" />
          <DxColumn data-field="enter_status" caption="Enter Status" alignment="center" />
          <DxColumn data-field="indicator" caption="Indicator" alignment="center" />
          <DxPaging :page-size="10" />
          <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="[10, 20, 50, 100, 250, 500]"
          />
          <DxSearchPanel :visible="true" placeholder="Search..." />
          <DxScrolling column-rendering-mode="virtual" row-rendering-mode="infinite" />
          <DxSummary>
            <DxTotalItem
              column="SU"
              summary-type="count"
              display-format="Rows: {0}"
            />
          </DxSummary>
        </DxDataGrid>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

import {
  DxDataGrid,
  DxExport,
  DxFilterRow,
  DxHeaderFilter, DxPager, DxPaging,
  DxScrolling, DxColumn,
  DxSearchPanel, DxSelection, DxSummary, DxTotalItem,
} from 'devextreme-vue/data-grid'
import { DxTextArea } from 'devextreme-vue/text-area'

export default {
  name: 'FailStatusAlert',
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
    DxSelection,
    DxSearchPanel,
    DxSummary,
    DxTotalItem
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['statuses'],
  data () {
    return {
      dialog: false,
      dialogKey: 0,
      content: '',
      showFilterRow: true,
      showHeaderFilter: true,
    }
  },
  mounted () {
    this.$nuxt.$on('alert_status', () => {
      this.dialog = true
      console.log(this.$props.statuses.warningSU)
    })
  },
  beforeDestroy () {
    this.$nuxt.$off('alert_status')
  },
  methods: {
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>
<style scoped>
</style>
