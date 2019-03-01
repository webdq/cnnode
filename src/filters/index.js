import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFormat', (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
})
