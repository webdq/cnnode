export default {
  CHANGE_TAB(state,payload){
    state.tab = payload.tab
  },
  SIGNIN(state,payload){
    state.token = payload.token
    state.user = payload.user
    sessionStorage.setItem("cnnode", JSON.stringify(state))
  },
  SIGNOUT(state,payload){
    state.token = ''
    state.user = {}
    sessionStorage.removeItem("cnnode")
  }
}
