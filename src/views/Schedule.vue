<!--首页-->
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
<!--          <el-radio-group v-model="radio1">-->
<!--            <el-radio-button label="周排班"></el-radio-button>-->
<!--            <el-radio-button label="日排班"></el-radio-button>-->
          <el-tag>日排班</el-tag>
<!--          </el-radio-group>-->
        </div>
<!--        <table border="1" v-if="radio1 == '周排班'">-->
<!--          <tr>-->
<!--            <th>时间</th>-->
<!--            <th>9:00 - 11:00</th>-->
<!--            <th>11:00 - 13:00</th>-->
<!--            <th>13:00 - 15:00</th>-->
<!--            <th>15:00 - 17:00</th>-->
<!--            <th>17:00 - 19:00</th>-->
<!--            <th>19:00 - 21:00</th>-->
<!--          </tr>-->
<!--          <tr v-for="(value, index) in arr" :key="index">-->
<!--            <th>{{ month[index] }}</th>-->
<!--            <td v-for="(valu, j) in value" :key="j">-->
<!--              <p-->
<!--                  v-for="(val, k) in valu"-->
<!--                  :key="k"-->
<!--                  :style="{ backgroundColor: colors[k] }"-->
<!--              >-->
<!--                {{ val.name }}-->
<!--              </p>-->
<!--            </td>-->
<!--          </tr>-->
<!--        </table>-->

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
                  <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d % colors.length] }">{{ c.name }}</p>
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
      // day: [
      //     [{name: 'h1'} ,{name: 'h2'}],
      //     [{name: 'h1'}],
      //     [{name: 'h1'}]
      // ],
      day: [
        [{ name: 'h1' }, {name: 'h2'}],
        [{name: 'h1'}],
          [],
          [],
          [],
          [],
          []
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
      // 存储排班信息
      arr: [
          // 周一
          [
              [{name: 'h1'}, {name: 'h2'}],
              [{name: 'h3'}],
              [{name: 'h4'}]
          ],
          // 周二
          [
              [{name: 'h1'}]
          ],
          [
            [{name: 'h1'}]
          ],
          [
            [{name: 'h1'}]
          ],
          [
            [{name: 'h1'}]
          ],
          [
            [{name: 'h1'}]
          ],
          [
            [{name: 'h1'}]
          ]

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
  },
  methods: {
    // 获取日排班信息
    get() {
      this.$http({
        method: "GET",
        url:
            "http://localhost:9999/schedule?storeId=1" + '&date=' + this.date1
      }).then((result) => {
        let scheduleData = result.data.data;
        console.log(result.data.data);
        console.log(scheduleData);
        this.day = scheduleData.map((item) => {
          // 对每个时间段的班次进行处理
          if (item && item.length > 0) {
            // 如果该时间段有班次数据，则返回这些班次
            return item.map((subItem) => {
              return { name: subItem.name || '未安排' }; // 如果subItem.name为空，则设置为'未安排'
            });
          } else {
            // 如果该时间段没有班次数据，返回空数组
            return [];
          }
        });
        console.log(this.day); // 查看格式是否正确
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
    // getDay(){
    //   this.$http({
    //     method: 'GET',
    //     url: 'http://localhost:9999/schedule/day/' + localStorage.store + '&' +  this.date1
    //   }).then( result => {
    //     // this.day = result.data.data
    //   })
    // },
    // getStore() {
    //   this.$http({
    //     method: "GET",
    //     url: "http://localhost:9999/Store/stores",
    //   }).then((result) => {
    //     this.storeArr = result.data.data;
    //     this.get();
    //   });
    // },
    // open2() {
    //   this.$notify({
    //     title: "提示",
    //     message: "请填写您所管理的门店信息，以便使用其他功能！",
    //     duration: 0,
    //   });
    // },
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
        //this.getDay()
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
