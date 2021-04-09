const store = new Vuex.Store({
  state: {
    logined: false,
    rules: '',
    user: {
      UserID: "",
      UserName: "",
      LastName: "",
      FirstName: "",
      Sex: false,
      Phone: "",
      Email: "",
      GroupID: null,
      DepartmentID: "",
      LastLogin: "",
      links: []
    },
    showQR: false,
  },
  mutations: {
    setLogined(state, payload){
      state.logined = payload;
    },
    addNewLink(state,payload){
      state.user.links.push({
        link: payload,
        totalClick: 0
      })
    },
    setVisibleQR(state, payload){
      state.showQR = payload;
    },
    setUserInfo(state, payload){
      state.logined = true;
      state.user = {
        ...state.user,
        ...payload,
        links: []
      }
    }
  }
})

export default store;