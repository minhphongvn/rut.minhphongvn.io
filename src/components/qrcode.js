const template = /*html*/`
  <v-dialog v-model="dialog" persistent :max-width="$vuetify.breakpoint.mobile?'100%':'40vh'" class="d-flex justify-center align-center">
    <v-card class="pa-1" flat tile>
      <div style="height: 50px;" class="d-flex justify-end align-center">
        <v-btn color="#2a5bd7" class="mr-2" @click="dialog = !dialog" icon><v-icon size="30">mdi-close</v-icon></v-btn>
      </div>
      <div style="height: 40vh;" class="d-flex flex-column justify-center align-center">
        <div>
        <v-img :height="$vuetify.breakpoint.mobile?'180':'200'" :src="src" contain alt="QRCode" />
        </div>
        <div class="text-center text-caption mx-1 mt-4">{{url}}</div>
      </div>
    </v-card>
  </v-dialog>
`

export default {
  template: template,
  props: {
    url: String,
    src: String,
    small: {
      type: Boolean,
      default: false
    },
  },
  data: ()=>({
    // dialog: false
  }),
  computed: {
    dialog: {
      get(){
        return this.$store.state.showQR;
      },
      set(value){
        this.$store.commit('setVisibleQR',value);
      }
    }
  },
}