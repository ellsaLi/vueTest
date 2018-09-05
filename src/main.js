// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue()
var houseCom = {
  data: function () {
    return {
      placeholder: '请输入母房型ID',
      disabledFlag: false,
      houseVal: ''
    }
  },
  template: '      <div>\n' +
  '        <label for="house-id">母房型ID： </label>\n' +
  '        <input :placeholder="placeholder"' +
  '               @blur="blurHouse()"' +
  '               @keyup.enter="blurHouse()"' +
  '               :disabled="disabledFlag"' +
  '               class="input-base"\n' +
  '               id="house-id"\n' +
  '               name="house-id" v-model.trim="houseVal"/>\n' +
  '      </div>',
  methods: {
    blurHouse: function () {
      vm.$emit('houseId', this.houseVal)
    }
  },
  mounted: function () {
    var self = this
    vm.$on('subHouseId', function (subHouseId) {
      if (subHouseId) {
        var url = 'api/house'
        var exist = false
        this.$http.get(url)
          .then(function (response) {
            var houses = response.body.data
            houses.forEach(function (house) {
              house.subhouses.forEach(function (subhouse) {
                if (subhouse.id === subHouseId) {
                  exist = true
                  self.houseVal = house.id
                }
              })
            })
            if (!exist) {
              self.placeholder = '无母房型ID'
              self.houseVal = ''
            }
          })
      } else {
        self.placeholder = '请输入母房型ID'
      }
    })
  },
  watch: {
    houseVal: function (val) {
      if (val === '') {
        vm.$emit('houseId', this.houseVal)
      }
    }
  }
}

// subHouse
var subHouseCom = {
  data: function () {
    return {
      placeholder: '请输入子房型ID',
      subDisabledFlag: false,
      subHouseVal: '',
      label: ''
    }
  },
  template: '      <div class="sub-house">\n' +
  '        <label for="sub-id">子房型ID： </label>\n' +
  '        <input :placeholder="placeholder" ' +
  '               @blur="blurSubHouse()" ' +
  '               @keyup.enter="blurSubHouse()"' +
  '               :disabled="subDisabledFlag" ' +
  '               class="input-base" ' +
  '               id="sub-id"\n' +
  '               name="sub-id" ' +
  '               v-model.trim="subHouseVal"/>\n' +
  '      </div>',
  methods: {
    blurSubHouse: function () {
      vm.$emit('subHouseId', this.subHouseVal)
    }
  },
  mounted: function () {
    var self = this
    vm.$on('houseId', function (houseId) {
      if (houseId) {
        self.subHouseVal = ''
        self.subDisabledFlag = true
      } else {
        self.subDisabledFlag = false
      }
    })
  }
}

new Vue({
  el: '#app',
  components: {
    'house-com': houseCom,
    'sub-house-com': subHouseCom
  }
})
