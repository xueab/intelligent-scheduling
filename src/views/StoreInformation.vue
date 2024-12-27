<!--企业管理员 门店管理-->
<template>
  <div id="page">
    <div class="nav">
      <button style="width: 110px" @click="addStore1">添加门店</button>
<!--      <div>-->
<!--        <span style="margin: 0px 10px 0px;font-size: 13px;color: #409EFF;">共{{ all }}条数据</span>-->
<!--        <input type="text" placeholder="请输入门店名称" v-model="input" style="margin-right: 18px;"/>-->
<!--      </div>-->
      <span style="margin: 0px 10px 0px;font-size: 13px;color: #409EFF;">共{{ all }}条数据</span>
      <input type="text" placeholder="请输入门店名称" v-model="input" style="margin-right: 18px;"/>

    </div>

    <el-dialog
        title="修改信息"
        :visible.sync="dialogFormVisible"
        class="change"
    >
      <div>
        <label for="name">门店名称: </label>
        <input type="text" name="" id="name" v-model="myStore.name" /><br /><br />
        <label for="area">占地面积: </label>
        <input type="text" name="" id="area" v-model="myStore.size" /><br /><br />
        <label for="address">联系地址: </label>
        <input type="text" name="" id="address" v-model="myStore.address" /><br /><br />
<!--        <label for="address">门店人数: </label>-->
<!--        <input type="text" name="" id="address" v-model="myStore.number" /><br /><br />-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendChange"
        >确 定</el-button
        >
      </div>
    </el-dialog>


    <div class="light" v-if="show">
      <!-- 点击手动添加进入此页面 -->
        <p>添加门店信息</p>
        <div class="wrapper">
          <div style="display: flex">
            <div>
              <label for="name">门店名称</label><br />
              <input type="text" id="name" v-model="addStore.name" /><br />
              <label for="phone">门店面积</label><br />
              <input type="text" id="phone" v-model="addStore.size" maxlength="11" />
            </div>
            <div>
              <label for="name">门店地址</label><br />
              <input type="text" id="position" v-model="addStore.address" /><br />
<!--              <label for="idCxard">门店人数</label><br />-->
<!--              <input type="text" id="idCard" v-model="addStore.number" maxlength="18" />-->
            </div>
          </div>

          <div style="margin-top: 30px">
            <el-button type="primary" style="margin-right: 30px" @click="confirm" ref="confirm"
            >确认</el-button>
            <el-button @click="cancel">取消</el-button>
            <p v-show="fit">请检查您输入的信息是否正确！</p>
          </div>
        </div>
      </div>


    <div class="store-info">
      <table >
        <tr>
          <th>门店名称:</th>
          <th>占地面积:</th>
          <th>联系地址:</th>
          <th>门店人数</th>
          <th>操作</th>
        </tr>

        <p v-if="!store.length" style="text-align: center;margin-top: 10px;color: #999;">暂无数据</p>
        <tr v-for="(val, index) in store" :key="val.id">

          <td>{{ val.name }}</td>
          <td>{{ val.size }}</td>
          <td>{{ val.address }}</td>
          <td>{{ val.employeeCount }}</td>
          <td>
            <button @click="change(index)">修改</button>
            <button :id="val.id" @click="del(val.id)">删除</button>
          </td>
        </tr>
      </table>
      <el-empty description="暂无数据" v-if="store.length == 0"></el-empty>

      <div class="pagination">
        <el-pagination
            background
            @current-change="currentChange"
            layout="prev, pager, next"
            :page-count="total"
            :current-page="val"
        ></el-pagination>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name:'Store',
  data() {
    return {
      active: 0,
      name: '',
      seat: '',
      num: '',
      msg: '',
      myStore: {},
      addStore: {
        name: '',
        size: '',
        address: '',
      },
      log:[],

      dialogFormVisible2: false,


      show: false,
      show_add: false,
      drawer:false,
      val: 1,
      total: 0,
      loading: false,
      tips: '',
      fit: false,
      note:'',
      all: 10,
      selected: '',
      addLoading: false,
      input: '',
      dialogFormVisible: false,
      list:[],
      store:[
        {id: 1, name: '1', size: 10, address: "杭州", number: 10},
        {id: 2, name: '2', size: 10, address: "杭州", number: 10},
      ],
      storeArr: [
        {
          id: "hbyt01",
          name: "泉信",
        },
        {
          id: "hbyt02",
          name: "电力",
        }
      ],
      // manages: [],
      // user:{},
      changeStore:{} // 存储修改的门店
    };
  },
  mounted() {
    // this.getManage()
    this.getStore()
  },
  watch:{
    input(){
      // this.getManage()
      this.getStore()
    },
    selected(){
      this.val = 1
      // this.getManage()
      this.getStore()
    }
  },
  methods: {
    // 获取门店信息
    getStore(){
      this.$http({
        method: 'GET',
        url: 'http://localhost:9999/Store/stores'
      }).then( result => {
        this.store = result.data.data
        this.all=result.data.count
        //this.store.number=result.data.data.employeeCount
      })
    },
    currentChange(val){
      this.val = val
      // this.getManage()
      this.getStore()
    },
    // 修改按钮
    change(e) {

      this.dialogFormVisible = true
      this.changeStore = this.store[e]
      // 设置 myStore 的默认值为当前选中门店的值
      this.myStore.name = this.changeStore.name;
      this.myStore.size = this.changeStore.size;
      this.myStore.address = this.changeStore.address;
    },
    // 修改排班接口
    sendChange(){

      this.dialogFormVisible = false
      this.changeStore.name=this.myStore.name
      this.changeStore.size=this.myStore.size
      this.changeStore.address=this.myStore.address
      this.$http({
        method:'PUT',
        url: 'http://localhost:9999/Store/modiftyStore',
        // data:{
        //   'user': this.changeManage
        // }
        data: this.changeStore
      }).then(resp => {
        console.log(resp.data.msg)
        if( resp.data.msg == '修改成功'){
          this.open3()
        }else{
          this.note = resp.data.msg
          this.open2()
        }
        this.getStore()

      })
      // this.getManage()
     // this.getStore()
    },
    // 删除门店信息
    del(id) {
      this.$http({
        method: 'DELETE',
        url: "http://localhost:9999/Store/deleteStore/" + id,
      }).then(resp => {
        this.getStore()
        console.log(resp.data.msg)
        if( resp.data.msg == '删除成功'){
          this.open1()
        }else{
          this.note = resp.data.msg
          this.open2()
        }
      })
    },
    // 添加门店按钮
    addStore1() {
      this.show_add = !this.show_add;
      this.show = true;
      document.body.style.overflow = "hidden";
    },
    // 手动添加门店信息
    addInfo() {
      this.show = true;
      this.show_add = !this.show_add;
      document.body.style.overflow = "hidden";
    },
    // 电子邮件失去焦点后判断是否被注册
    checkEmail(){
      this.$http({
        method: 'GET',
        url: 'http://192.168.136.205:8080/users/' + this.manage.email
      }).then(result => {
        if(result.data.code == 20231){
          this.tips = result.data.msg
        }else{
          this.tips = result.data.msg
        }
      })
    },
    handleChange(file , fileList){
      this.list = fileList
    },
    confirmUpload(){
      let param = new FormData()
      this.list.forEach(
          (val, index) => {
            param.append("file", val.raw);
          }
      );
      this.addLoading = true
      this.$http({
        "url": "http://192.168.136.205:8080/users/uploadExcel",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": param
      }).then( result => {
        this.addLoading = false
        this.show = false
        this.getManage()
        alert(result.data.msg)
      })

    },
    // 点击添加员工后的取消按钮
    cancel() {
      this.myStore = {
        name: '',
        posts: '',
        phone: '',
        idCard: '',
        email: '',
        store: ''
      }
      this.show = false;
      document.body.style.overflow = "";
    },
    open1() {
      this.$notify({
        title: '成功',
        message: '删除成功！',
        type: 'success',
        duration: '1000'
      });
    },
    open2() {
      this.$notify({
        title: '警告',
        message: this.note,
        type: 'warning',
        duration: '1000'
      });
    },
    // 添加门店信息
    confirm() {
      if(this.addStore.name.length == 0 || this.addStore.size.length == 0 || this.addStore.address.length == 0){
        this.note = '输入字段不可为空！'
        this.open2()
      }else{
        this.$http({
          method: 'POST',
          url: 'http://localhost:9999/Store/addStore',
          // data: {
          //   // 'user': this.manage
          //
          // }
          data: this.addStore,
        }).then(result => {
          console.log(result.data.msg)
          if(result.data.msg){
            alert(result.data.msg)
            this.show = false;
            this.manage = {
              name: '',
              posts: '',
              phone: '',
              idCard: '',
              email: '',
              store: ''
            }
            // this.getManage()
            this.getStore();
          }else{
            this.tips = result.data.msg
          }
        })
      }
    },
    // 点击查看员工详细信息
    showMessage(e) {
      if (!this.loading) {
        this.loading = true
        this.$http({
          method: "GET",
          url: "http://192.168.136.205:8080/users/" + e,
        }).then(resp =>{
          if(resp.data){
            this.loading = false
            this.user = resp.data.data
          }
        })
      }
    },
  }
};
</script>

<style scoped>
.nav {
  margin: 24px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.nav input {
  width: 214px;
  height: 32px;
  text-indent: 10px;
  border: 1px solid rgba(220, 223, 230, 1);
  margin-left: 24px;
  border-radius: 4px;
}
.nav button {
  width: 60px;
  height: 32px;
  background-color: rgba(64, 158, 255, 1);
  color: white;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
}
.manage-info {
  width: 1256px;
  height: 500px;
  background-color: white;
  margin-left: 24px;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
tr {
  width: 1256px;
}
td,
th {
  width: 314px;
  height: 55px;
  text-align: center;
  border: none;
  border-bottom: 1px solid rgba(220, 223, 230, 1);
  font-size: 14px;
  font-weight: 400;
}
th {
  font-weight: 500;
}
td {
  color: rgba(96, 98, 102, 1);
}
.store-info button {
  width: 60px;
  height: 32px;
  background-color: rgba(64, 158, 255, 1);
  color: white;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
}
.store-info button:nth-child(1) {
  margin-right: 24px;
}
.store-info button:nth-child(2) {
  background-color: white;
  color: rgba(64, 158, 255, 1);
  border: 1px solid rgba(64, 158, 255, 1);
}
.pagination {
  margin-top: 20px;
  float: right;
  position: absolute;
  bottom: 0;
  right: 0;

}
.light {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 640px;
  height: 500px;
  padding: 20px;
  background-color: white;
  text-align: center;
  z-index: 1002;
  overflow: auto;
}
.light p {
  font-size: 16px;
  font-weight: 700;
  width: 100px;
  margin-bottom: 10px;
}
.fade {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.6;
  opacity: 0.6;
  filter: alpha(opacity=66);
}
.add-type {
  width: 120px;
  height: 70px;
  position: absolute;
  top: -20px;
  border-radius: 4px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  left: 112px;
  background-color: white;
}
.add-type p {
  cursor: pointer;
  margin: 10px;
  color: #9e9399;
}
.add-type p:hover {
  color: black;
}
.wrapper {
  margin-top: 40px;
}
.wrapper input {
  margin: 5px 20px 24px;
  width: 268px;
  height: 40px;
  border: 1px solid #dae0f2;
  border-radius: 8px;
  outline: none;
  text-indent: 10px;
}
.wrapper label {
  margin: 0px 20px 0px;
  width: 268px;
  display: inline-block;
  height: 10px;
  text-align: left;
  color: rgba(58, 63, 99, 1);
}
#select {
  width: 100px;
  height: 40px;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  color: rgba(58, 63, 99, 1);
}
.doc{
  font-size: 18px;
  color: rgba(0,0,0,.87);
  font-weight: 500;
}
.top{
  width: 440px;
  margin: 0 auto;
  padding-bottom: 20px;
  font-size: 30px;
  border-bottom: 1px solid black;
}
.outer{
  width: 100%;
  height: 600px;
  margin: 20px auto;
  color: rgba(58, 63, 99, 1);
}
.outer span{
  height: 30px;
  margin: 20px;
  display: inline-block;
  font-size: 15px;
}
.left, .right{
  width: 220px ;
  margin-top: 40px;
  display: inline-block;
  vertical-align: top;
}

.change label{
  display: inline-block;
  width: 70px;
}
.change p{
  display: inline-block;
  width: 70px;
}
.change select{
  width: 70px;
  height: 30px;
  outline: none;
}
.change input{
  width: 300px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid #999;
  text-indent: 10px;
}
</style>