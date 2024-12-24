<!--修改排班方案-->

<template>
  <div class="wrapper">
    <el-select v-model="value" placeholder="周一">
    <el-option
      v-for="item in storeArr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <div style="margin-top: 50px;" v-loading="loading">
      <div class="schedule">
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

          <tr>
<!--            <th>{{ date1 | thisDay }}</th>-->
            <td v-for="(a, b) in day" :key="b">
              <p v-for="(c, d) in a" :key="d" :style="{ backgroundColor: colors[d] }">{{ c.name }}</p>

              <el-button type="primary" @click="define">添加员工</el-button>
              <el-button @click="cancel">删除员工</el-button>

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
          // 排班方案
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
              [{name: 'h3'}]
            ],
            [
              [{name: 'h1'}],
              [{name: 'h2'}],
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

            // value2: 'month',
            loading: false,

            storeArr: [ {
              value: '选项1',
              label: '周一'
              }, {
              value: '选项2',
              label: '周二'
              },{
              value: '选项3',
              label: '周三'
            },{
              value: '选项4',
              label: '周四'
            },{
              value: '选项5',
              label: '周五'
            },{
              value: '选项6',
              label: '周六'
            },{
              value: '选项7',
              label: '周日'
            },
            ],

          value: '选项1',

            colors:['#01D4F2', '#D8DF20', '#FFE550', '#F6931E', '#BFA', '#FF646C' , '#CB3398', '#33E680', '#B334FF'],
            // month: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          // day: [
          //   [{ name: 'h1' }, {name: 'h2'}],
          //   [{name: 'h1'}]
          //
          //   // 其他班次...
          // ],
          day: []
        }
    },
    created(){
        // this.getStore()
      this.setScheduleData();
      this.get();
    },
    methods:{
      setScheduleData() {
        const selectedIndex = this.storeArr.findIndex(item => item.value === this.value);
        this.day = this.arr[selectedIndex] || [];

      },
      // 获取日排班
        get(e){
            this.$http({
                method: 'GET',
                url: 'http://192.168.1.102:8080/schedule/' + (e ? e :this.storeArr[0].id)
            }).then( result => {
                this.arr = result.data.data
                this.loading = false
            })  
        },
        // getStore(){
        // this.$http({
        //     method: 'GET',
        //     url: 'http://192.168.1.102:8080/Store/stores'
        // }).then( result => {
        //     // this.storeArr = result.data.data
        //     // this.get()
        // })
    // },
    },
    watch:{
        // value(){
        //     this.get(this.value)
        //     this.loading = true
        // }
        // 监听 `value` 的变化（即选择的选项）
        value(newValue) {
          this.setScheduleData(); // 当选项改变时，更新排班数据

        }
    }

}
</script>

<style scoped>
.wrapper{
    margin: 24px;
}
table{
    width: 80vw;
    white-space: pre-wrap;
}
p{
    text-align: center;
    height: 10%;
    margin: 10px;
}
</style>