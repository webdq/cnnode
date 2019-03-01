let state = JSON.parse(sessionStorage.getItem("cnnode")) || {
  tab: '',
  token: '',
  user: {}
}

export default state
