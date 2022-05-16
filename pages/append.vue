<template>
  <div id="file-drag-drop">
    <v-row v-if="alert" justify="end">
      <v-alert
        v-if="message"
        transition="fade-transition"
        :value="alert"
        color="green"
        type="info"
      >{{ message }}
      </v-alert>
    </v-row>
    <form ref="fileform" class="fileform" @dragenter="alert = true">
      <span class="drop-files">Drop the Panels file here...</span>
    </form>
    <v-row class="pt-4 justify-center">
      <p>Название файла: {{ file.name }}</p>
    </v-row>
    <v-row justify="center">
      <v-btn
        v-if="file === ''"
        disabled
        color="primary"
        elevation="2"
        large>
        Submit to DB
      </v-btn>
      <v-btn
        v-if="file !== '' "
        color="primary"
        elevation="2"
        large
        @click="submitFile(result)"
      >Submit to DB
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import * as XLSX from "xlsx"
import TableService from "@/services/table.service"

export default {
  name: "AppendPage",
  data() {
    return {
      drag: false,
      file: "",
      message: "",
      alert: false,
      result: []
    }
  },
  mounted() {
    this.dragAndDropCapable()
  },
  methods: {
    dragAndDropCapable() {
      this.drag = this.determineDragAndDropCapable()
      if (this.drag) {
        ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(function(event) {
          this.$refs.fileform.addEventListener(event, e => {
            e.preventDefault()
            e.stopPropagation()
          }, false)
        }.bind(this))
        this.$refs.fileform.addEventListener("drop", function(e) {
          this.file = e.dataTransfer.files[0]
          console.log(this.file)
          const reader = new FileReader()
          reader.onload = e => {
            const data = e.target.result
            const workbook = XLSX.read(data)
            /*  const filename = 'Panels_copy.xlsm'
             XLSX.writeFile(workbook, filename); */
            const workSheet = workbook.Sheets.DATA
            const Excel_copy = XLSX.utils.sheet_to_json(workSheet)
            const result = []
            // eslint-disable-next-line array-callback-return
            Excel_copy.map((value, key) => {
              const obj = {
                "MATERIAL": value.MATERIAL || null,
                "CLAIM": value.CLAIM || null,
                "INCH (FACT)": value["INCH (FACT)"] || null,
                "SERIAL NUMBER": value["SERIAL NUMBER"] || null,
                "SU": value.SU || null,
                "DESTINATION": value.DESTINATION || null,
                "CODE": value.CODE || null,
                "RB BARCODE": value["RB BARCODE"] || null,
                "COMMENT": value.COMMENT || null,
                "1st Insp DATE": value.DATE || null,
                "2nd Insp DATE": null,
                "Putaway DATE": null,
                "Outbound DATE": null,
                "Scrap DATE": null
              }
              result.push(obj)
            })
            this.result = []
            return this.result.push(result)
          }
          reader.readAsArrayBuffer(this.file)
        }.bind(this))
      }
    },
    determineDragAndDropCapable() {
      const div = document.createElement("div")
      return (("draggable" in div)
          || ("ondragstart" in div && "ondrop" in div))
        && "FormData" in window
        && "FileReader" in window
    },
    submitFile(data) {
      console.log(data[0])
      TableService.postDataTable(data[0])
      this.message = "Данные успешно добавлены"
      window.setTimeout(() => {
        this.alert = false
        this.message = ''
        this.file = ""
        this.result = ""
        // this.$router.push("/")
      }, 4000)
    }
  }
}
</script>

<style lang="scss" scoped>
.fileform {
  cursor: default;
  border: 2px solid #ffffff;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 100px;
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  width: 100%;

  &:-moz-drag-over {
    background: #1976d2;
    cursor: copy;
  }
}

a.submit-button {
  display: block;
  text-align: center;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  background-color: #CCC;
  color: white;
  font-weight: bold;
  margin: 20px auto auto;
}
</style>
