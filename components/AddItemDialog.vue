<template>
  <div>
    <FailInputSUAlert :su="mismatchSU" />
    <FailStatusAlert :statuses="warningSU" />
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
            <v-container>
              <v-row v-if="useAdminRules" justify="center">
                <v-col cols="12" md="8">
                  <v-select
                    v-model="section"
                    :items="[...manageItems]"
                    label="Global Status"
                    required
                    class="pa-0"
                  />
                  <v-select
                    v-model="status"
                    :items="[...manageAdminLocalStatus]"
                    label="Local Status"
                    class="pa-0"
                  />
                  <v-text-field
                    ref="field"
                    v-model="location"
                    label="Location"
                    class="pa-0"
                  />
                  <v-text-field
                    ref="field"
                    v-model="box"
                    label="BOX"
                    class="pa-0"
                  />
                </v-col>
              </v-row>
              <v-row v-if="!useAdminRules" justify="center">
                <v-col cols="12" md="8">
                  <v-select
                    v-model="$store.state.user.division"
                    :item-value="$store.state.user.division"
                    :item-text="$store.state.user.division"
                    :items="[...$store.state.user.division]"
                    label="Global Status"
                    required
                    class="pa-0"
                  />
                  <v-select
                    v-model="status"
                    :items="[...manageLocalStatus]"
                    label="Local Status"
                    class="pa-0"
                  />
                  <v-text-field
                    ref="field"
                    v-model="location"
                    label="Location"
                    class="pa-0"
                  />
                  <v-text-field
                    ref="field"
                    v-model="box"
                    label="BOX"
                    class="pa-0"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="10">
                  <v-divider class="pa-0" />
                </v-col>
              </v-row>
            </v-container>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="1">
                    <template v-for="(index) in 150">
                      <v-text-field
                        :key="index"
                        :value="index"
                        readonly
                        color="#fff"
                      />
                    </template>
                  </v-col>
                  <v-col cols="12" md="11">
                    <template v-for="(item, index) in 150">
                      <v-text-field
                        :key="item.key"
                        ref="field"
                        v-model="panels[index]"
                        label="№ SU"
                        :rules="su_rules"
                      />
                    </template>
                  </v-col>
                </v-row>
              </v-container>
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
import FailInputSUAlert from '@/components/FailInputSUAlert'
import FailStatusAlert from '@/components/FailStatusAlert'

export default {
  name: 'AddItemDialog',
  components: { FailInputSUAlert, FailStatusAlert },
  data: () => ({
    su_rules: [
      value => !!value || 'SU Number Required.',
      value => (value && value.length <= 6) || 'Max 6 characters',
    ],
    su_num: {
      nums: (value) => {
        const pattern =
          /\d+/
        return (
          pattern.test(value) ||
          'Only number symbols'
        )
      },
    },
    dialog: false,
    panels: [],
    section: [],
    status: '',
    location: '',
    box: '',
    componentKey: 0,
    mismatchSU: [],
    warningSU: [],
    alert_input: false,
    dialogKey: 0
  }),
  computed: {
    manageItems () {
      if (this.$store.state.user.role === 'ROLE_ADMIN') {
        return ['Inspection', 'Storage', 'Repair']
      }
      return this.$store.state.user.division
    },
    manageAdminLocalStatus () {
      switch (this.section) {
        case 'Inspection':
          return ['Pre-stock after Inspection', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
        case 'Storage':
          return ['Stock', 'Pre-repair on SRDC', 'Pre-repair on SERK', 'Transfer to SERK', 'Transfer to Consignment', 'Pre-verification', 'Transfer verification', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
        case 'Repair':
          return ['On Repair', 'Pre-stock after repair']
        default:
          return
      }
    },

    manageLocalStatus () {
      switch (this.$store.state.user.division) {
        case 'Inspection':
          return ['Pre-stock after Inspection', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
        case 'Storage':
          return ['Stock', 'Pre-repair on SRDC', 'Pre-repair on SERK', 'Transfer to SERK', 'Transfer to Consignment', 'Pre-verification', 'Transfer verification', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
        case 'Repair':
          return ['On Repair', 'Pre-stock after repair']
        default:
          return
      }
    },
    currentUser () {
      return this.$store.state.user
    },
    useAdminRules () {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === 'ROLE_ADMIN'
      }
      return false
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
      this.alert_input = false
      this.alert_status = false
      this.mismatchSU = []
      this.warningSU = []
    },
    handleItemAdd () {
      const panelsSet = new Set(this.panels)
      // console.log([...panelsSet].flat(1), this.section, this.status, this.location, this.box)
      TableService.postItems([...panelsSet].flat(1), this.section, this.status, this.location, this.box, this.$store.state.user.username)
        .then((value) => {
          console.log(value.data)
          if (value.data.mismatchSU > 0 && value.data.alert === true) {
            this.mismatchSU = value.data.mismatchSU
            this.$nuxt.$emit('alert_input')
          }
          if (value.data.warningSU !== undefined && value.data.warningSU.length > 0 && value.data.alert === true) {
            const errors = []
            value.data.warningSU.forEach((value) => {
              errors.push(Object.values(value))
            })
            this.warningSU = errors
            this.$nuxt.$emit('alert_status')
          }
        })

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
