<template>
  <div id="file-drag-drop">
    <div v-if="loading">
      <LoadingScreen />
    </div>
    <div v-else>
      <v-row v-if="alert" justify="end" class="pt-4 pe-6">
        <v-alert
          v-if="message"
          v-model="alert"
          transition="fade-transition"
          color="green"
          type="info"
        >
          {{ message }}
        </v-alert>
      </v-row>
      <!--    <v-row justify="center">
        <v-col cols="3">
          <v-file-input
            v-model="file"
            show-size
            label="File input"
            @change="uploadFile"
          />
        </v-col>
      </v-row>-->
      <!--    <form ref="fileform" class="fileform" @dragenter="alert = true">
        <span class="drop-files">Drop the Panels file here...</span>
      </form>-->
      <v-row justify="center" class="pt-4">
        <v-col cols="4">
          <p>Название файла: {{ file }}</p><br>
          <p>Дата создания: {{ create_date }}</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="4">
          <p>Дата изменения файла: {{ modified_date }}</p>
          <br>
          <p>Дата доступа к файлу: {{ access_date }}</p>
        </v-col>
      </v-row>
      <v-row justify="center" class="pt-2">
        <v-btn
          v-if="file === ''"
          disabled
          color="primary"
          elevation="2"
          large
        >
          Submit to DB
        </v-btn>
        <v-btn
          v-if="file !== '' "
          color="primary"
          elevation="2"
          large
          @click="submitFile"
          @loadeddata="alert = true"
        >
          Submit to DB
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script>
// import * as fs from 'fs';
// import * as XLSX from "xlsx"
import moment from 'moment'
import LoadingScreen from '../components/LoadingScreen'
import TableService from '@/services/table.service'

export default {
  name: 'AppendPage',
  components: { LoadingScreen },
  data () {
    return {
      drag: false,
      file: [],
      message: '',
      alert: false,
      result: [],
      data_string: '',
      create_date: '',
      modified_date: '',
      access_date: '',
      loading: false,
    }
  },
  created () {
  },
  mounted () {
    // this.dragAndDropCapable()
    this.loading = true
    TableService.getFileInfo().then((res) => {
      this.file = res.data.File_description
      this.create_date = moment(res.data.Create_timestamp).add(3, 'hours').utc().format('DD.MM.YYYY HH:mm:ss')
      this.modified_date = moment(res.data['Last modified timestamp']).add(3, 'hours').utc().format('DD.MM.YYYY HH:mm:ss')
      this.access_date = moment(res.data['Last access timestamp']).add(3, 'hours').utc().format('DD.MM.YYYY HH:mm:ss')
      this.loading = false
    })
  },
  methods: {
    /*  uploadFile () {
      // XLSX.set_fs(fs);
      console.log(process.cwd())
      console.log(this.file)
      const file = this.file
      const formData = new FormData()
      formData.append('Panels', file)
      return formData
    }, */
    /* dragAndDropCapable () {
      this.drag = this.determineDragAndDropCapable()
      if (this.drag) {
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
          this.$refs.fileform.addEventListener(event, (e) => {
            e.preventDefault()
            e.stopPropagation()
          }, false)
        }.bind(this))
        this.$refs.fileform.addEventListener('drop', function (e) {
          this.file = e.dataTransfer.files[0]
          console.log(this.file)
          const reader = new FileReader()
          reader.onload = (e) => {
            this.data_string = e.target.result
            return this.data_string
            /!* const workbook = XLSX.read(data, { type: "binary", cellDates: true })
            /!*  const filename = 'Panels_copy.xlsm'
             XLSX.writeFile(workbook, filename); *!/
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
                "Scrap DATE": null,
                "Global Status": "Inspection",
                "Local Status": "Pending",
                "BOX": null,
                "Location": null
              }
              result.push(obj)
            })
            this.result = []
            return this.result.push(result) *!/
          }
          reader.readAsDataURL(this.file)
        }.bind(this))
      }
    }, */
    determineDragAndDropCapable () {
      const div = document.createElement('div')
      return (('draggable' in div) ||
          ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window &&
        'FileReader' in window
    },
    submitFile () {
      /* const dataSet = new Set(data[0])
      const filterArr = [...dataSet] */
      const user = this.$store.state.user
      TableService.postDataTable(user).then((res) => {
        this.alert = true
        this.message = res.data.message
      })
      this.message = 'Данные успешно добавлены'
      console.log(this.$route)
      window.setTimeout(() => {
        this.alert = false
        this.message = ''
        this.file = []
        this.result = ''
        this.create_date = null
        this.modified_date = null
        this.access_date = null
        if (this.$route.path === '/append') {
          this.$router.push('/')
        }
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
