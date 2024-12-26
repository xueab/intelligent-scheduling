<!--生成排班方案-->
<template>
  <div class="wrapper">
<!--    <el-select v-model="value" placeholder="所有门店">-->
<!--      <el-option-->
<!--          v-for="item in storeArr"-->
<!--          :key="item.id"-->
<!--          :label="item.name"-->
<!--          :value="item.id">-->
<!--      </el-option>-->
<!--    </el-select>-->



    <div style="margin-top: 50px;" v-loading="loading">
        <div class="schedule">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
            <span>周排班</span>

            <el-button type="primary" size="small" @click="change" style="margin-right: 20px">生成排班方案</el-button>
        </div>

          <div style="margin-bottom: 20px; margin-top: 30px">
            <el-radio-group v-model="radio1">
              <el-radio-button label="周一"></el-radio-button>
              <el-radio-button label="周二"></el-radio-button>
              <el-radio-button label="周三"></el-radio-button>
              <el-radio-button label="周四"></el-radio-button>
              <el-radio-button label="周五"></el-radio-button>
              <el-radio-button label="周六"></el-radio-button>
              <el-radio-button label="周日"></el-radio-button>
            </el-radio-group>
          </div>

          <table border="1">
            <tr>
              <!--            <th>时间</th>-->
              <th>9:00 - 11:00</th>
              <th>11:00 - 13:00</th>
              <th>13:00 - 15:00</th>
              <th>15:00 - 17:00</th>
              <th>17:00 - 19:00</th>
              <th>19:00 - 21:00</th>
            </tr>

            <tr v-if="radio1 == '周一'">
              <td v-for="(a, b) in day1" :key="b">
                <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>
              </td>
            </tr>

            <tr v-if="radio1 == '周二'">
              <td v-for="(a, b) in day2" :key="b">
                <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>
              </td>
            </tr>

            <tr v-if="radio1 == '周三'">
              <td v-for="(a, b) in day3" :key="b">
                <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>
              </td>
            </tr>

            <tr v-if="radio1 == '周四'">
              <td v-for="(a, b) in day4" :key="b">
                <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>
              </td>
            </tr>

            <tr v-if="radio1 == '周五'">
              <td v-for="(a, b) in day5" :key="b">
                <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>
              </td>
            </tr>

            <tr v-if="radio1 == '周六'">
              <td v-for="(a, b) in day6" :key="b">
                <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>
              </td>
            </tr>

            <tr v-if="radio1 == '周日'">
              <td v-for="(a, b) in day7" :key="b">
                <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>
              </td>
            </tr>


          </table>



      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangeSchedule',
  data() {
    return {
      // arr:[],
      radio1: '周一',
      day1: [
        [{ name: 'h1' }, {name: 'h2'}],
        [{name: 'h1'}]

        // 其他班次...
      ],
      day2: [
        [{ name: 'h1' }, {name: 'h3'}],
        [{name: 'h1'}]

        // 其他班次...
      ],
      day3: [
        [{ name: 'h1' }, {name: 'h1'}],
        [{name: 'h1'}]

        // 其他班次...
      ],
      day4: [
        [{ name: 'h1' }, {name: 'h2'}],
        [{name: 'h1'}]

        // 其他班次...
      ],
      day5: [
        [{ name: 'h1' }, {name: 'h3'}],
        [{name: 'h1'}]

        // 其他班次...
      ],
      day6: [
        [{ name: 'h1' }, {name: 'h2'}],
        [{name: 'h1'}]

        // 其他班次...
      ],
      day7: [
        [{ name: 'h1' }, {name: 'h1'}],
        [{name: 'h1'}]
        // 其他班次...
      ],
      value: '',
      value2: 'month',
      loading: false,
      storeArr: [],
      colors:['#01D4F2', '#D8DF20', '#FFE550', '#F6931E', '#BFA', '#FF646C' , '#CB3398', '#33E680', '#B334FF'],
      //month: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      // time: ['9:00-9:30', '9:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00',
      //   '12:30-13:00', '13:00-13:30', '13:30-14:00', '14:00-15:30', '15:30-16:00', '16:00-16:30',
      //   '16:30-17:00', '17:00-17:30', '17:30-18:00', '18:30-19:00', '19:00-19:30', '19:30-20:00',
      //   '20:00-20:30', '20:30-21:00']
    }
  },
  created(){
    this.getStore()
  },
  methods:{
    get(e){
      this.$http({
        method: 'GET',
        url: 'http://192.168.1.102:8080/schedule/' + (e ? e :this.storeArr[0].id)
      }).then( result => {
        this.arr = result.data.data
        this.loading = false
      })
    },
    getStore(){
      this.$http({
        method: 'GET',
        url: 'http://192.168.1.102:8080/Store/stores'
      }).then( result => {
        this.storeArr = result.data.data
        this.get()
      })
    },
  },
  watch:{
    value(){
      this.get(this.value)
      this.loading = true
    }
  }

}
</script>

<style scoped>
.wrapper{
  margin: 24px;
}
table{
  width: 820px;
  height: 400px;
  font-size: 14px;
}
p{
  text-align: center;
  height: 10%;
  margin: 10px;
}
</style>