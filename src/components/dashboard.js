const template = /*html*/`
  <div>
    <v-row justify="center">
      <v-col md="9">
        <div class="ml-1 mb-2">Danh sách link đã tạo:</div>
        <v-card class="dashboard mb-2" outlined flat>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>
                    Link rút gọn
                  </th>
                  <th>
                    Lượt click
                  </th>
                  <th class="text-center">
                    Công cụ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in links"
                  :class="{red: (i === removePos)}"
                  class="lighten-4"
                  :key="item.link"
                >
                  <td style="height: 60px;">{{item.link}}</td>
                  <td style="height: 60px;">{{item.totalClick}}</td>
                  <td style="height: 60px;" :class="$vuetify.breakpoint.mobile?'d-flex flex-row align-center':'text-center'">
                    <v-btn color="#2a5bd7" v-clipboard:copy="item.link" v-clipboard:success="copyLink" icon><v-icon size="20">mdi-content-copy</v-icon></v-btn>
                    <v-btn color="#2a5bd7" icon><v-icon size="20">mdi-qrcode</v-icon></v-btn>
                    <v-btn color="#ee6123" @click="removeLink(i);" icon><v-icon size="20">mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-snackbar v-model="copied" :timeout="1000"
            color="success darken-3" rounded rounded="pill"
            elevation="24" text bottom>
            Đã copy link !
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </div>
`

export default {
  template: template,
  data: () => ({
    // links: []
    copied: false,
    removePos: -1
  }),
  methods: {
    removeLink(i) {
      this.removePos = i;
      setTimeout(() => {
        this.removePos = -1;
        this.links.splice(i, 1);
      }, 200)
    },
    copyLink() {
      this.copied = true;
    },
  },
  computed: {
    links: {
      get(){
        return this.$store.state.user.links;
      },
      set(value){
        this.$store.commit('addNewLink',value);
      }
    }
  },
};