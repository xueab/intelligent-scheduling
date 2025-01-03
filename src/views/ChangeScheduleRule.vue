<!--修改排版规则-->
<template>
  <div class="info">
    <div class="main-wrapper">
<!--      <el-descriptions class="margin-top" title="排版规则" :column="2"  border v-loading="user.username == undefined">-->
      <el-descriptions class="margin-top" title="排班规则" :column="2"  border v-loading="rule.dayTime == undefined">

        <template slot="extra">
          <el-button type="primary" size="small" @click="change">修改</el-button>
        </template>

        <el-descriptions-item>
          <template slot="label">
<!--            <i class="el-icon-user"></i>-->
            员工一天最长工作时间
          </template>
          {{ rule.dayTime }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
<!--            <i class="el-icon-male"></i>-->
            员工一周最长工作时间
          </template>
          {{ rule.time }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
<!--            <i class="el-icon-male"></i>-->
            午餐开始时间
          </template>
          {{ rule.lunchStartTime }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
<!--            <i class="el-icon-male"></i>-->
            午餐结束时间
          </template>
          {{ rule.lunchEndTime }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <!--            <i class="el-icon-male"></i>-->
            晚餐开始时间
          </template>
          {{ rule.dinnerStartTime }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <!--            <i class="el-icon-male"></i>-->
            晚餐结束时间
          </template>
          {{ rule.dinnerEndTime }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
<!--            <i class="el-icon-ship"></i>-->
            班次最小时间
          </template>
          {{ rule.minTime }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
<!--            <i class="el-icon-mobile-phone"></i>-->
            班次最长时间
          </template>
          {{  rule.maxTime }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
<!--            <i class="el-icon-s-data"></i>-->
            门店工作时间段
          </template>
          {{ rule.workTime }}
        </el-descriptions-item>


      </el-descriptions>
    </div>

    <!-- 遮罩层 -->
    <div class="light" v-if="show">
      <p>修改排班规则</p>
      <div class="wrapper">
        <div style="display: flex; justify-content: center;">
          <div>
            <div>

              <el-form :model="rule" label-width="200px">
                <el-form-item label="员工一天最长工作时间">
                  <el-select v-model="rule.dayTime" placeholder="请选择">
                    <el-option label="4小时" :value="4"></el-option>
                    <el-option label="5小时" :value="5"></el-option>
                    <el-option label="6小时" :value="6"></el-option>
                    <el-option label="7小时" :value="7"></el-option>
                    <el-option label="8小时" :value="8"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="员工一周最长工作时间">
                  <el-select v-model="rule.time" placeholder="请选择">
                    <el-option label="30小时" value="30"></el-option>
                    <el-option label="35小时" value="35"></el-option>
                    <el-option label="40小时" value="40"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="午餐开始时间">
                  <el-select v-model="rule.lunchStartTime" placeholder="请选择">
                    <el-option label="11:00" value="11:00"></el-option>
                    <el-option label="11:30" value="11:30"></el-option>
                    <el-option label="12:00" value="12:00"></el-option>
                  </el-select>
                </el-form-item>


              <el-form-item label="午餐结束时间">
                <el-select v-model="rule.lunchEndTime"  placeholder="请选择">
                  <el-option label="13:00" value="13:00"></el-option>
                  <el-option label="13:30" value="13:30"></el-option>
                  <el-option label="14:00" value="14:00"></el-option>
                </el-select>
              </el-form-item>

                <el-form-item label="晚餐开始时间">
                  <el-select v-model="rule.dinnerStartTime" placeholder="请选择">
                    <el-option label="17:00" value="17:00"></el-option>
                    <el-option label="17:30" value="17:30"></el-option>
                    <el-option label="18:00" value="18:00"></el-option>
                  </el-select>
                </el-form-item>


                <el-form-item label="晚餐结束时间">
                  <el-select v-model="rule.dinnerEndTime"  placeholder="请选择">
                    <el-option label="19:00" value="19:00"></el-option>
                    <el-option label="19:30" value="19:30"></el-option>
                    <el-option label="20:00" value="20:00"></el-option>
                  </el-select>
                </el-form-item>

              <el-form-item label="班次最小时间">
                <el-select v-model="rule.minTime" ref="date" placeholder="请选择">
                  <el-option label="2小时" value="2"></el-option>
                  <el-option label="3小时" value="3"></el-option>
                  <el-option label="4小时" value="4"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="班次最大时间">
                <el-select v-model="rule.maxTime" ref="date" placeholder="请选择">
                  <el-option label="4小时" value="4"></el-option>
                  <el-option label="5小时" value="5"></el-option>
                  <el-option label="6小时" value="6"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="周一到周五门店工作时间段">
                <el-select v-model="rule.workTime1" ref="date" placeholder="请选择">
                  <el-option label="9:00-21:00" value="9:00-21:00"></el-option>
                  <el-option label="9:00-22:00" value="9:00-22:00"></el-option>
                  <el-option label="10:00-22:00" value="10:00-22:00"></el-option>
                </el-select>
              </el-form-item>

                <el-form-item label="周六-周日门店工作时间段">
                  <el-select v-model="rule.workTime2" ref="date" placeholder="请选择">
                    <el-option label="9:00-21:00" value="9:00-21:00"></el-option>
                    <el-option label="9:00-22:00" value="9:00-22:00"></el-option>
                    <el-option label="10:00-22:00" value="10:00-22:00"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>

            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="define" style="margin-top: 20px">确认修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>

      </div>
    </div>

    <div class="fade" v-if="show"></div>

  </div>
</template>

<script>
export default {
  name:'UserInfo',
  data() {
    return {
      show:false,
      rule: {
        dayTime:'4',
        time:'30',
        lunchStartTime: '12:00',
        lunchEndTime:'14:00',
        dinnerStartTime: '17:00',
        dinnerEndTime:'19:00',
        minTime:'2',
        maxTime:'4',
        workTime:'9:00-21:00',
        workTime1: '',
        workTime2:'',
      }
    }
  },
  filters:{
    filter_idCard(id){
      if(id){
        return id.slice(0,3) + "***" + id.slice(-3)
      }else{
        return '暂无数据'
      }

    }
  },
  mounted(){
    this.$http({
      method: 'GET',
      url: 'http://localhost:9999/ScheduleRule?storeId=1'
    }).then(resp => {
      console.log(resp.data.data); // 查看返回的数据
      this.rule = resp.data.data
      document.body.style.overflow='hidden';


    })
  },
  methods:{
    change(){
      this.show = true
      document.body.style.overflow='hidden';
    },
    define(){
      this.$http({
        method: 'PUT',
        url: 'http://localhost:9999/ScheduleRule/modify?storeId=1',
        // data: {
        //   'user':this.user
        // }
        data: this.rule

      }).then(result => {
        if (result.data.code === 200) {
          this.$message.success('修改排班方案成功');
        }
      })
      this.show = false
      document.body.style.overflow='';
    },
    cancel(){
      this.show = false
      document.body.style.overflow='';
    },
  }
}
</script>

<style scoped>
.info{
  overflow: auto;
  width: 1125px;
  height: 540px;
  background-color: white;
  margin-left: 65px;
  margin-top: 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
.main-wrapper{
  margin: 50px auto;
  width: 980px;
}
.light{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 680px;
  height: 500px;
  padding: 20px;
  background-color: white;
  text-align: center;
  z-index:1002;
  overflow: auto;
}
.light > p{
  font-size: 16px;
  font-weight: 700;
  width: 100px;
  margin-bottom: 10px;
}
.fade{
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index:1001;
  -moz-opacity: 0.6;
  opacity:.60;
  filter: alpha(opacity=66);
}
.wrapper input{
  width: 180px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #d9dee3;
  margin-top: 8px;
  background-color: #F5F7FA;
  transition: all .2s;
  text-indent: 10px;

}
.wrapper input:focus{
  outline: none;
  border: 1px solid #4687FF;
  text-indent: 13px;
}
.wrapper label{
  width: 120px;
  text-align: right;
  display: inline-block;
}


</style>
