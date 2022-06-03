<template>
  <div>
    <v-row justify="center" style="margin-right: 10px">
      <v-dialog v-model="dialog" persistent scrollable max-width="1000px">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Update Items
          </v-btn>
        </template>
        <form
          id="app"
          :key="componentKey"
          method="post"
          @submit.prevent="handleItemAdd"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Update Status Panel</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="8">
                    <template v-for="(item, index) in 100">
                      <v-text-field
                        :key="item.key"
                        ref="field"
                        v-model="panels[index]"
                        label="№ SU"
                        :rules="su_rules"
                      />
                    </template>
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="section"
                      :items="[...manageItems]"
                      label="Global Status"
                      required
                    />
                    <v-select
                      v-model="status"
                      :items="[...manageLocalStatus]"
                      label="Local Status"
                    />
                    <v-text-field
                      ref="field"
                      v-model="location"
                      label="Location"
                    />
                    <v-text-field
                      ref="field"
                      v-model="box"
                      label="BOX"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="closeDialog">
                Close
              </v-btn>
              <v-btn
                v-if="panels.length === 0 || section.length === 0 && status === ''"
                color="blue darken-1"
                type="submit"
                text
                disabled
                @click="dialog = false"
              >
                Send
              </v-btn>
              <v-btn
                v-else
                color="blue darken-1"
                type="submit"
                text
                @click="dialog = false"
              >
                Send
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import TableService from '@/services/table.service'

export default {
  name: 'AddItemDialog',
  data: () => ({
    su_rules: [
      value => !!value || 'SU Number Required.',
      value => (value && value.length <= 6) || 'Max 6 characters'
    ],
    dialog: false,
    panels: [],
    section: [],
    status: '',
    location: '',
    box: '',
    componentKey: 0
  }),
  computed: {
    manageItems () {
      if (this.$store.state.user.role === 'ROLE_ADMIN') {
        return ['Inspection', 'Storage', 'Repair']
      }
      return this.$store.state.user.division
    },
    manageLocalStatus () {
      switch (this.section) {
        case 'Inspection':
          return ['Pre-stock after Inspection', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
        case 'Storage':
          return ['Stock', 'Pre-repair on SRDC', 'Pre-repair on SERK', 'Transfer to SERK', 'Transfer to Consignmet', 'Pre-verefication', 'Transfer verefication', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
        case 'Repair':
          return ['Pending', 'SRDC repair complete', 'Pre-stock after repair', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
        default:
          return
      }
    }
  },
  methods: {
    closeDialog () {
      this.panels = []
      this.section = ''
      this.status = ''
      this.location = ''
      this.box = ''
      this.componentKey += 1
      this.dialog = false
    },
    handleItemAdd () {
      const panelsSet = new Set(this.panels)
      console.log([...panelsSet].flat(1), this.section, this.status, this.location, this.box)
      TableService.postItems([...panelsSet].flat(1), this.section, this.status, this.location, this.box, this.$store.state.user.username)
      this.panels = []
      this.section = ''
      this.status = ''
      this.location = ''
      this.box = ''
      this.componentKey += 1
    }
  }
}
</script>

<style scoped></style>
