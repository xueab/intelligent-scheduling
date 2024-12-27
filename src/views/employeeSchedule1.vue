<!--员工查看周排班-->
<template>
  <div class="wrapper">

    <div style="margin-top: 50px;" v-loading="loading">
      <div class="schedule">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
          <span>周排班</span>
        </div>

        <div style="margin-bottom: 20px; margin-top: 30px">
          <el-radio-group v-model="radio1" @change="updateSchedule">
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
            <th>9:00 - 11:00</th>
            <th>11:00 - 13:00</th>
            <th>13:00 - 15:00</th>
            <th>15:00 - 17:00</th>
            <th>17:00 - 19:00</th>
            <th>19:00 - 21:00</th>
          </tr>

          <tr v-if="radio1 == '周一'">
            <td v-for="(a, b) in day" :key="b">
              <p v-if="a && a.time" :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
            </td>
          </tr>

          <tr v-if="radio1 == '周二'">
            <td v-for="(a, b) in day" :key="b">
              <p v-if="a && a.time" :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
            </td>
          </tr>

          <tr v-if="radio1 == '周三'">
            <td v-for="(a, b) in day" :key="b">
              <p v-if="a && a.time" :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
            </td>
          </tr>

          <tr v-if="radio1 == '周四'">
            <td v-for="(a, b) in day" :key="b">
              <p v-if="a && a.time" :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
            </td>
          </tr>

          <tr v-if="radio1 == '周五'">
            <td v-for="(a, b) in day" :key="b">
              <p v-if="a && a.time" :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
            </td>
          </tr>

          <tr v-if="radio1 == '周六'">
            <td v-for="(a, b) in day" :key="b">
              <p v-if="a && a.time" :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
            </td>
          </tr>

          <tr v-if="radio1 == '周日'">
            <td v-for="(a, b) in day" :key="b">
              <p v-if="a && a.time" :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
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
      day:[
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {},
        {},
        {}
      ],
      day1: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        { },
        { },
        { },

        // 其他班次...
      ],
      day2: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {time: '15:00-15:30'},
        {},
        {},
      ],
      day3: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {},
        {},
        {},
      ],
      day4: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {},
        {},
        {},
      ],
      day5: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {},
        {},
        {},
      ],
      day6: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {},
        {},
        {},
      ],
      day7: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {},
        {},
        {},
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
      date1: '',
    }
  },
  created(){
    this.updateSchedule();
    this.get()
  },
  methods:{
    // Calculate the date for the selected day
    calculateDate(day) {
      const today = new Date();
      const currentDay = today.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
      const daysOfWeek = { '周一': 1, '周二': 2, '周三': 3, '周四': 4, '周五': 5, '周六': 6, '周日': 0 };

      // Calculate the difference between today and the selected day
      const diff = daysOfWeek[day] - currentDay;
      today.setDate(today.getDate() + diff);

      return today.toISOString().split('T')[0]; // Return date in format 'YYYY-MM-DD'
    },
    // Update the schedule based on the selected day
    updateSchedule() {
      this.date1 = this.calculateDate(this.radio1); // Get the date for the selected day
      console.log("date: " + this.date1)

      this.get(); // Fetch the schedule for the selected day
    },

    // 获取周排班
    get(){
      this.$http({
        method: 'GET',
        url: "http://localhost:9999/employee/Schedule?id=" + localStorage.id +'&storeId=1'+'&date='+ this.date1,
      }).then( result => {
        // this.arr = result.data.data
        let scheduleData = result.data.data;
        // 将后端数据格式化成 day 数组
        this.day = this.day.map((item, index) => {
          if (scheduleData[index] && scheduleData[index].length > 0) {
            // 如果有数据，获取第一个班次的时间
            return { time: scheduleData[index][0].time };
          }
          return {}; // 如果没有数据，则保留空对象
        });
        console.log(this.day)
        this.loading = false
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
