<template>
  <div class="info">
    <div class="main-wrapper">
      <el-descriptions class="margin-top" title="个人信息" :column="2"  border v-loading="user.username == undefined">

        <template slot="extra">
          <el-button type="primary" size="small" @click="change">修改</el-button>
        </template>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ user.username }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            性别
          </template>
          {{ user.gender }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            职位
          </template>
          {{ user.posts }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            所属门店
          </template>
          {{ user.store }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-ship"></i>
            年龄
          </template>
          {{ user.age }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{  user.phone }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-data"></i>
            工作日偏好
          </template>
          {{ user.day }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-data"></i>
            工作时间偏好
          </template>
          {{ user.date }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-data"></i>
            班次时长偏好
          </template>
          {{ user.time }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-unlock"></i>
            身份证
          </template>
          {{ user.idCard | filter_idCard }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          {{  user.address }}
        </el-descriptions-item>

      </el-descriptions>
    </div>

    <!-- 遮罩层 -->
    <div class="light" v-if="show">
      <p>修改个人信息</p>
      <div class="wrapper">
        <div style="display: flex; justify-content: center;">
          <div>
            <div>

              <el-form :model="user" label-width="120px">
                <el-form-item label="联系地址：" prop="address">
                  <el-input v-model="user.address" />
                </el-form-item>

                <el-form-item label="电话：" prop="phone">
                  <el-input v-model="user.phone" />
                </el-form-item>

                <el-form-item label="工作日偏好">
                  <el-select v-model="user.day" multiple placeholder="请选择">
                    <el-option label="周一" :value="1"></el-option>
                    <el-option label="周二" :value="2"></el-option>
                    <el-option label="周三" :value="3"></el-option>
                    <el-option label="周四" :value="4"></el-option>
                    <el-option label="周五" :value="5"></el-option>
                    <el-option label="周六" :value="6"></el-option>
                    <el-option label="周日" :value="7"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="工作时间偏好">
                  <el-select v-model="user.date" multiple placeholder="请选择">
                    <el-option label="8:00- 12:00" value="8:00-12:00"></el-option>
                    <el-option label="12:00 - 16:00" value="12:00-16:00"></el-option>
                    <el-option label="16:00 - 20:00" value="16:00-20:00"></el-option>
                    <el-option label="20:00 - 24:00" value="20:00-24:00"></el-option>
                  </el-select>

                </el-form-item>

                <el-form-item label="班次时长偏好">
                  <el-select v-model="user.time" multiple placeholder="请选择">
                  <el-option label="两小时" :value="2"></el-option>
                  <el-option label="三小时" :value="3"></el-option>
                  <el-option label="四小时" :value="4"></el-option>
                  <el-option label="五小时" :value="5"></el-option>
                  <el-option label="六小时" :value="6"></el-option>
                  <el-option label="七小时" :value="7"></el-option>
                  <el-option label="八小时" :value="8"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>

<!--              <label>工作日偏好：</label>-->
<!--              <el-select v-model="user.day"  placeholder="请选择">-->
<!--                <el-option label="周一" :value="1"></el-option>-->
<!--                <el-option label="周二" :value="2"></el-option>-->
<!--                <el-option label="周三" :value="3"></el-option>-->
<!--                <el-option label="周四" :value="4"></el-option>-->
<!--                <el-option label="周五" :value="5"></el-option>-->
<!--                <el-option label="周六" :value="6"></el-option>-->
<!--                <el-option label="周日" :value="7"></el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--            <div style="margin-top: 35px;">-->
<!--              <label>工作时间偏好：</label>-->
<!--              <el-select v-model="user.date" ref="date" placeholder="请选择">-->
<!--                <el-option label="8点- 12点" value="8点-12点"></el-option>-->
<!--                <el-option label="12点 - 16点" value="12点-16点"></el-option>-->
<!--                <el-option label="16点 - 20点" value="16点-20点"></el-option>-->
<!--                <el-option label="20点 - 24点" value="20点-24点"></el-option>-->
<!--              </el-select>-->
<!--            </div>-->
<!--            <div style="margin-top: 28px;">-->
<!--              <label>班次时长偏好：</label>-->
<!--              <el-select v-model="user.time" ref="time" placeholder="请选择">-->
<!--                <el-option label="两小时" :value="2"></el-option>-->
<!--                <el-option label="三小时" :value="3"></el-option>-->
<!--                <el-option label="四小时" :value="4"></el-option>-->
<!--              </el-select>-->
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
      user:{
        day: '',
        date: '',
        time: ''
      },
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
      url: 'http://localhost:9999/users/' + localStorage.email
    }).then(resp => {
      console.log(resp.data.data); // 查看返回的数据
      this.user = resp.data.data
      // this.user.day = this.user.day.split('|').map(Number)
      // this.user.date = this.user.date.split('|').map(Number)
      // this.user.time = this.user.time.split('|').map(Number)
      document.body.style.overflow='hidden';


    })
  },
  methods:{
    change(){
      this.show = true
      document.body.style.overflow='hidden';
    },
    define(){
      // this.user.username = this.$refs.username.value
      // this.user.gender = this.$refs.gender.value
      // this.user.age = this.$refs.age.value
      // this.user.address = this.$refs.address.value
      // this.user.phone = this.$refs.phone.value
      // this.user.day = this.$ref.day.value
      // this.user.date = this.$ref.date.value
      // this.user.time = this.$ref.time.value
      console.log("user day: " + this.user.day)
      console.log("user date: " + this.user.date)
      console.log("user time: " + this.user.time)
      this.user.day = this.user.day.join('|')
      this.user.date = this.user.date.join('|')
      this.user.time = this.user.time.join('|')
      this.$http({
        method: 'PUT',
        url: 'http://localhost:9999/users/info/' + localStorage.email,
        // data: {
        //   'user':this.user
        // }
        data: this.user

      }).then(result => {
        if (result.data.code === 200) {
          this.$message.success('修改成功');
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