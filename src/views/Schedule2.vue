<!--查看排班信息-->
<template>
    <div style="display: flex">
      <div class="schedule">
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
</template>

<script src="http://ip.ws.126.net/ipquery">
</script>

<script>
export default {
  name: "Schedule",
  data() {
    return {
      radio1: '周一',
      weatherData: {},
      tips: "",
      myStore: "",
      storeArr: [],
      // day: [
      //     [{name: 'h1'} ,{name: 'h2'}],
      //     [{name: 'h1'}],
      //     [{name: 'h1'}]
      // ],
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

  },
  mounted() {
    this.getDay();
  },
  methods: {
    // 获取日排班信息
    get() {
      this.$http({
        method: "GET",
        url:
            "http://localhost:9999/schedule/" + localStorage.store + '&' + this.date1
      }).then((result) => {
        // this.arr = result.data.data;
      });
    },
    // 获取一周排班信息
    getDay(){
      this.$http({
        method: 'GET',
        url: 'http://localhost:9999/schedule/day/' + localStorage.store + '&' +  this.date1
      }).then( result => {
        // this.day = result.data.data
      })
    },
  },
};
</script>

<style scoped>
.banner img {
  width: 820px;
  height: 120px;
}

.text p {
  flex-shrink: 0;
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