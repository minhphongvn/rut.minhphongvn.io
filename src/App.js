//Vuex
import store from './store/store.js';

//Import object components
import introduce from './components/introduce.js';
import dashboard from './components/dashboard.js';
import qrcode from './components/qrcode.js';
import qrscan from './components/qrcode-scanner.js';

//Functions
function setAuthToken(token) {
  axios.defaults.headers.common['Authorization'] = '';
  delete axios.defaults.headers.common['Authorization'];
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  }
}

new Vue({
  store: store,
  el: "#app",
  vuetify: new Vuetify(),
  components: {
    introduce, dashboard, qrcode, qrscan
  },
  data: () => ({
    drawer: false,
    completed: false,
    loading: false,
    link: "",
    linkError: false,
    qrcode: new QRious({ size: 300 }),

    //snackbar
    snackbar: false,
    snackbarText: "",
    snackbarColor: "",
    snackbarTimeout: 1000,
  }),
  methods: {
    shortenLink() {
      this.loading = true;
      this.linkError = false;
      if (!this.link) {
        this.linkError = true;
        this.loading = false;
        this.$refs.shortenBox.focus();
      } else {
        this.linkError = false;
        setTimeout(() => {
          this.loading = false;
          this.completed = true;
          this.link = 'https://rut.vn/' + Math.random().toString(36).substring(6);;
          if (this.logined) {
            this.links = this.link;
          }
        }, 0)
        // axios.post('http://localhost:3005/api/shortlink', {
        //   link: this.link
        // }).then((res) => {
        //   this.loading = false;
        //   this.completed = true;
        //   this.link = res.data.shortedLink;
        //   if(this.logined){ 
        //     this.links = this.link;
        //   }
        // }).catch((e) => {
        //   this.loading = false;
        //   this.snackbarText = `Lỗi ${e}`
        //   this.snackbarColor = "error";
        //   this.snackbar = true;
        //   this.snackbarTimeout = 2000;
        // });
      }
    },
    copyLink() {
      this.snackbarColor = "success darken-3";
      this.snackbarText = `Đã copy ${this.link}`;
      this.snackbar = true;
      this.snackbarTimeout = 1000;
    },
    replay() {
      this.link = "";
      this.completed = false;
      this.$refs.shortenBox.focus();
    },
    async getUserInfo() {
      const status = await axios.get(`https://api.fui.vn/fp/obj/userinfo`).then(res => {
        this.user = res.data.data;
        return parseInt(res && res.status);
      }).catch(err => {
        return parseInt(err.response && err.response.status);
      });
      return status;
    },
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    setCookie(name, value, days = 7, path = '/') {
      const expires = new Date(Date.now() + days * 864e5).toUTCString()
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
    },
    async login() {
      const code = await this.getUserInfo();
      if (!this.logined && code === 401) {
        location.assign('https://login.rut.vn/')
      }
    }
  },
  created() {
    this.setCookie('awt', 'eyJzaWQiOiI5RjkwNEU4OUE0MkU0ODRBIiwiZXhwIjoyMDkxMjM4NDkwfQ.xA5yDUj9WjZLd_78VZdwRH2HdGCRXUWjji8elFUe0-M');
    const token = this.getCookie('awt');
    setAuthToken(token);
    this.getUserInfo();
  },
  computed: {
    newQRCode() {
      this.qrcode.value = this.link;
      return this.qrcode.toDataURL();
    },
    logined: {
      get() {
        return this.$store.state.logined;
      },
      set(value) {
        this.$store.commit('setLogined', value);
      }
    },
    links: {
      get() {
        return this.$store.state.user.links;
      },
      set(value) {
        this.$store.commit('addNewLink', value);
      }
    },
    visibleQR: {
      get() {
        return this.$store.state.showQR;
      },
      set(value) {
        this.$store.commit('setVisibleQR', value);
      }
    },
    user: {
      get() {
        return this.$store.state.user;
      },
      set(value) {
        this.$store.commit('setUserInfo', value)
      }
    }
  },
})