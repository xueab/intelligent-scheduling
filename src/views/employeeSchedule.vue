<!--员工日排班-->
<template>
  <div>
    <div class="top-info">
      <div class="banner">
        <img src="../assets/banner.png" alt=""/>
      </div>
      <div class="weather">
        <div class="text">
          <div style="flex-shrink: 0">
            <p>{{ date }}</p>
            <p style="font-size: 14px; margin-top: 4px">{{ tips }}</p>
          </div>
          <div style="display: flex">
            <p style="flex-shrink: 0;line-height: 85px;margin-left: 80px;margin-right: 20px;">
              {{ weatherData.tem_day }} °C
            </p>
            <img
                src="../assets/weather.png"
                alt=""
                style="width: 87px; height: 85px"
            />
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex">
      <div class="schedule">
        <div style="margin-bottom: 10px">
          <el-tag>日排班</el-tag>
        </div>

        <table border="1">
          <tr>
            <th>时间</th>
            <th>9:00 - 11:00</th>
            <th>11:00 - 13:00</th>
            <th>13:00 - 15:00</th>
            <th>15:00 - 17:00</th>
            <th>17:00 - 19:00</th>
            <th>19:00 - 21:00</th>

          </tr>

          <tr>
            <th>{{ date1 | thisDay }}</th>
            <td v-for="(a, b) in day" :key="b">
              <p :style="{ backgroundColor: colors[b] }">{{a.time}}</p>
            </td>
          </tr>




        </table>
      </div>

      <div class="calendar">
        <el-calendar v-model="value"></el-calendar>
      </div>
    </div>
  </div>
</template>

<script src="http://ip.ws.126.net/ipquery">
</script>

<script>
export default {
  name: "Schedule",
  data() {
    return {
      weatherData: {},
      tips: "",
      myStore: "",
      radio1: "周排班",
      storeArr: [],
      day: [
        {time: '9:00-10:00'},    // 9:00-11:00
        {time: '11:00-11:30'},                     // 11:00-13:00
        {},
        {},
        {},
        {},

        // 其他班次...
      ],
      processedDay: [],
      date1: '',
      time: new Date(),
      month: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],

      colors: [
        "#01D4F2",
        "#D8DF20",
        "#FFE550",
        "#F6931E",
        "#BFA",
        "#FF646C",
        "#CB3398",
        "#33E680",
        "#B334FF",
      ],
      value: new Date(),
    };
  },
  computed: {
    date() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "年" + month + "月" + day + "日";
    },
  },
  created() {
    // this.getWeather();
    this.get()
  },
  mounted() {
    this.get();
    // console.log("date: " + this.date1)
  },
  methods: {
    // 获取日排班信息
    get() {
      this.$http({
        method: "GET",
        url:
            "http://localhost:9999/employee/Schedule?id=" + localStorage.id +'&storeId=1'+'&date='+ this.date1,
      }).then((result) => {

        console.log('11111111111111')
        console.log(result.data.data);
        console.log('222222222222222')
        console.log(this.day);
        let scheduleData = result.data.data;
        // 将后端数据格式化成 day 数组
        this.day = this.day.map((item, index) => {
          if (scheduleData[index] && scheduleData[index].length > 0) {
            // 如果有数据，获取第一个班次的时间
            return { time: scheduleData[index][0].time };
          }
          return {}; // 如果没有数据，则保留空对象
        });
      });
    },
    getWeather() {
      // this.$http
      //   .get("https://yiketianqi.com/free/day", {
      //     params: {
      //       unescape: "1",
      //       appid: "75128679",
      //       appsecret: "J9TSLdau",
      //     },
      //   })
      //   .then((resp) => {
      //     if (resp.data) {
      //       this.weatherData = resp.data;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
  watch: {
    // weatherData() {
    //   if (this.weatherData.tem_day < 19) {
    //     this.tips = "天气寒冷，记得多穿衣服";
    //   } else if (
    //       this.weatherData.tem_day >= 19 ||
    //       this.weatherData.tem_day <= 24
    //   ) {
    //     this.tips = "天气舒适，适合室外运动";
    //   } else {
    //     this.tips = "天气炎热，谨防中暑";
    //   }
    // },
    value: {
      immediate: true,
      handler(){
        let year = this.value.getFullYear();
        let month = this.value.getMonth() + 1;
        let date=this.value.getDate()
        if (date >= 1 && date <= 9) {
          date = "0" + date;
        }
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        this.date1 = year + '-' + month + '-' + date
        this.get()
        this.getDay()
      }
    },
  },
  filters:{
    thisDay(a){
      let now = new Date(a);
      let day = now.getDay();
      let month2 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      let h = month2[day]
      return h
    }
  },

};
</script>

<style scoped>
.top-info {
  display: flex;
  align-items: center;
}
.banner {
  width: 820px;
  height: 120px;
  margin: 24px 24px 24px;
  border-radius: 15px;
  overflow: hidden;
}
.banner img {
  width: 820px;
  height: 120px;
}
.weather {
  width: 442px;
  height: 120px;
  border-radius: 8px;
  background-color: #409eff;
  color: white;
}
.text {
  width: 154px;
  height: 56px;
  margin: 32px 0px 0px 28px;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.text p {
  flex-shrink: 0;
}
.calendar {
  width: 442px;
  margin-left: 24px;
}
.calendar /deep/ .el-calendar-table .el-calendar-day {
  width: 40px;
  height: 40px;
}
.schedule {
  width: 805px;
  margin: 0px 24px 0px;
}
.schedule table {
  width: 805px;
  border-spacing: 0;
  border-collapse: "collapse";
}
table {
  width: 820px;
  height: 400px;
  font-size: 14px;
}

td p{
  margin: 10px;
}
</style>
