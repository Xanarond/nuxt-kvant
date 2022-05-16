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
                      ></v-text-field>
                    </template>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="section"
                      :items="[...manageItems]"
                      label="Global Status"
                      required
                    ></v-select>
                    <v-select
                      v-model="status"
                      :items="[...manageLocalStatus]"
                      label="Local Status"
                    ></v-select>
                    <v-text-field
                      ref="field"
                      label="Location"
                    ></v-text-field>
                    <v-text-field
                      ref="field"
                      label="BOX"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
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
import TableService from "@/services/table.service"

export default {
  name: "AddItemDialog",
  data: () => ({
    su_rules: [
      value => !!value || "SU Number Required.",
      value => (value && value.length <= 6) || "Max 6 characters"
    ],
    dialog: false,
    panels: [],
    section: [],
    status: "",
    location: "",
    box: "",
    componentKey: 0
  }),
  computed: {
    manageItems() {
      if (this.$store.state.user.role === "ROLE_ADMIN") {
        return ["Inspection", "Repair", "Storage", "Archive"]
      }
      return this.$store.state.user.division
    },
    manageLocalStatus() {
      switch (this.section) {
        case "Inspection":
          return ["Pending", "Checked", "Scrap", "Archived"]
        case "Storage":
          return ["Pending", "SERK_repair", "Scrap", "Archived"]
        case "Repair":
          return ["Pending", "SERK_repair", "Checked", "Scrap", "Archived"]
        case "Archive":
          return ["Scrap", "Archived"]
        default:
          return
      }
    }
  },
  methods: {
    closeDialog() {
      this.panels = []
      this.section = ""
      this.status = ""
      this.location = ""
      this.box = ""
      this.componentKey += 1
      this.dialog = false
    },
    handleItemAdd() {
      const panelsSet = new Set().add(...this.panels)
      console.log(panelsSet, this.section, this.status, this.location, this.box)
      TableService.postItems([...panelsSet], this.section, this.status, this.location, this.box)
      this.panels = []
      this.section = ""
      this.status = ""
      this.componentKey += 1

      switch (this.section) {
        case "Inspection":
          break
        case "Storage":
          break
        case "Repair":
          break
        case "Archive":
          break
      }
    }
  }
}
</script>

<style scoped></style>
