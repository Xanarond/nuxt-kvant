<template>
  <div>
    <v-row justify="center" style="margin-right: 10px">
      <v-dialog v-model="dialog" persistent scrollable max-width="1000px">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Add Items
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
              <span class="text-h5">Add/Update Status Panel</span>
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
                        label="№ Panel"
                        :rules="rules"
                      ></v-text-field>
                    </template>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="section"
                      :items="[...manageItems]"
                      label="Section"
                      required
                    ></v-select>
                    <v-select
                      v-model="status"
                      :items="['Scrap', 'Audit', 'Repair', 'Pending']"
                      label="Status"
                    ></v-select>
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
                v-if="panels.length === 0 || section.length === 0 || status === '' "
                color="blue darken-1"
                type="submit"
                text
                disabled
                @click="dialog = false"
              >
                Send to db
              </v-btn>
              <v-btn
                v-else
                color="blue darken-1"
                type="submit"
                text
                @click="dialog = false"
              >
                Send to db
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
    rules: [
      value => !!value || "Username Required.",
      value => (value && value.length >= 3) || "Min 3 characters"
    ],
    dialog: false,
    panels: [],
    section: [],
    status: "",
    componentKey: 0
  }),
  computed: {
    manageItems() {
      if (this.$store.state.user.role === "ROLE_ADMIN") {
        return ["Inspection", "Repair", "Storage", "Archive"]
      }
      return this.$store.state.user.division
    }
  },
  mounted() {
    console.log(this.$store.state.user)
  },
  methods: {
    closeDialog(){
      this.panels = []
      this.section = ""
      this.status = ""
      this.componentKey += 1
      this.dialog = false
    },
    handleItemAdd() {
      console.log(this.panels, this.section, this.status)
      TableService.postItems(this.panels, this.section, this.status)
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
