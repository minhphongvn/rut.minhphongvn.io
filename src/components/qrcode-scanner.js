const template = /*html*/`
  <v-dialog v-model="dialog" persistent :max-width="$vuetify.breakpoint.mobile?'100%':'60vh'" class="d-flex justify-center align-center">
    <template v-slot:activator="{ attrs }">
      <input style="display: none" ref="imageInput" type="file" accept="image/*" @change="onFileChange">
      <v-btn @click="pickFile" v-bind="attrs" class="rounded-circle" tile depressed icon>
        <v-icon :class="iconColor">mdi-qrcode-scan</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-1" flat tile>
      <div style="height: 50px;" class="d-flex justify-end align-center">
        <v-btn color="#2a5bd7" class="mr-2" @click="closeDialog" icon><v-icon size="30">mdi-close</v-icon></v-btn>
      </div>
      <div class="d-flex flex-column justify-center align-center py-3">
        <v-img :src="image" alt="Image"/>
        <div :class="status?'':'red--text'">{{ linkQR }}<span><v-btn v-if="linkQR && status" @click="copyLink" v-clipboard.copy="linkQR" class="ml-1 rounded-circle" color="grey" tile dark icon>
         <v-icon small>mdi-content-copy</v-icon>
      </v-btn></span></div>
      </div>
    </v-card>
    <v-snackbar v-model="copied" :timeout="1000"
      color="success darken-3" rounded rounded="pill"
      elevation="24" text bottom>
      Đã copy link {{linkQR}} !
    </v-snackbar>
  </v-dialog>
`

export default {
  template: template,
  props: {
    iconColor: String,
  },
  data: ()=>({
    dialog: false,
    image: '',
    linkQR: '',
    status: false,
    copied: false,
  }),
  methods: {
    pickFile() {
      this.image = "";
      this.linkQR = "";
      this.$refs.imageInput.click();
    },
    async onFileChange(e) {
      let html5QrCode = new Html5Qrcode("reader")
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length){return};
      this.createImage(files[0]);
      await html5QrCode.scanFile(files[0], true).then(qrCodeMessage => {
        this.status = true;
        this.linkQR = qrCodeMessage;
      })
      .catch(err => {
        this.status = false;
        this.linkQR = 'Lỗi rồi. Vui lòng đưa máy ảnh gần hơn.';
      });
      this.dialog = true;
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    closeDialog() {
      this.dialog = false;
      this.image = "";
    },
    copyLink(){
      this.copied = true;
    },
  },
}