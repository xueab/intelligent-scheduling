<!--门店管理员 门店管理-->
<template>
      <div class="info">
        <div class="main-wrapper">
        <el-descriptions
            class="margin-top"
            title="门店信息"
            :column="2"
            size="size"
            border
        >

<!--          <template slot="extra">-->
<!--            <el-button-->
<!--                type="primary"-->
<!--                size="small"-->
<!--                @click=change-->
<!--            >修改</el-button-->
<!--            >-->
<!--          </template>-->



          <el-descriptions-item label="门店名称">
            <template slot="label">

              门店名称
            </template>
            {{ myStore.name }}
          </el-descriptions-item>

          <el-descriptions-item label="占地面积/m²"
          >
            <template slot="label">
              占地面积
            </template>
            {{ myStore.size }}</el-descriptions-item
          >

          <el-descriptions-item label="联系地址"
          >
            <template slot="label">
              联系地址
            </template>
            {{ myStore.address }}</el-descriptions-item
          >

          <el-descriptions-item label="门店人数"
          >
            <template slot="label">
              门店人数
            </template>
            {{ myStore.number }}</el-descriptions-item
          >

        </el-descriptions>
      </div>


<!--      <el-dialog-->
<!--          title="修改信息"-->
<!--          :visible.sync="dialogFormVisible"-->
<!--          class="change"-->
<!--      >-->
<!--        <div>-->
<!--          <label for="name">门店名称: </label>-->
<!--          <input type="text" name="" id="name" v-model="myStore.name" /><br /><br />-->
<!--          <label for="area">占地面积: </label>-->
<!--          <input type="text" name="" id="area" v-model="myStore.size" /><br /><br />-->
<!--          <label for="address">联系地址: </label>-->
<!--          <input type="text" name="" id="address" v-model="myStore.address" /><br /><br />-->
<!--        </div>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="change"-->
<!--          >确 定</el-button-->
<!--          >-->
<!--        </div>-->
<!--      </el-dialog>-->


    </div>


</template>

<script>
export default {
  name: "StoreInformation",
  data() {
    return {
      active: 0,
      name: '',
      seat: '',
      num: '',
      store: [],
      msg: '',
      myStore: {
        name: 'h1',
        size: 10,
        address: "杭州",
        number: 10
      },
      user:{
        name: 'h1',
        gender: '男',
        posts: "员工",
        store: "杭州店",
        day: '',
        date: '',
        time: ''
      },
      addStore: {
        name: '',
        size: '',
        address: ''
      },
      log:[],
      dialogFormVisible: false,
      dialogFormVisible2: false,
    };
  },
  mounted(){
    this.getMyStore()
    this.getLog()
  },
  methods: {
    getStore(id){
      this.$http({
        method: 'GET',
        url: 'http://192.168.1.102:8080/Store/stores/' + id
      }).then( result => {
        this.store = result.data.data
      }).catch( error => {
        if(error.response){
          console.log(error.response.status);
        }else if(error.request){
          console.log(error.request);
        }else{
          console.log(error.message);
        }
      })
    },
    getMyStore(){
      this.$http({
        method: 'GET',
        url: 'http://192.168.1.102:8080/Store/store/' + localStorage.email
      }).then( result => {
        // this.myStore = result.data.data
        this.getStore(result.data.data.id)
      })
    },
    change(){
      this.dialogFormVisible = false
      this.$http({
        method: 'PUT',
        url: 'http://192.168.1.102:8080/Store/stores',
        data: {
          'store': this.myStore
        }
      }).then( result => {
        alert(result.data.msg)
        if( result.data.code == 20221){
          setTimeout(() => {
            this.addLog('修改了门店信息')
            this.getMyStore()
            this.getLog()
          }, 300);
        }
      })
    },
    del(i , name){
      this.$http({
        method: 'DELETE',
        url: 'http://192.168.1.102:8080/Store/stores/' + i
      }).then( result => {
        if(result.data.code == 20211){
          this.msg = result.data.msg
          setTimeout(() => {
            this.open1()
            this.addLog('删除了' + name)
            this.getMyStore()
            location.reload()
          }, 300);
        }else{
          this.open2()
        }
      })
    },
    open1() {
      this.$notify({
        title: '成功',
        message: this.msg,
        type: 'success'
      });
    },
    open2() {
      this.$notify({
        title: '警告',
        message: '删除失败',
        type: 'warning'
      });
    },
    add(){
      this.dialogFormVisible2 = false
      this.$http({
        method: 'POST',
        url: 'http://192.168.1.102:8080/Store/stores',
        data: {
          'store': this.addStore
        }
      }).then((result) => {
        this.msg = result.data.msg
        if(result.data.code == 20201){
          setTimeout(() => {
            this.addLog('新增了一个门店')
            this.getMyStore()
            this.getLog()
            this.open1()
          }, 300);
        }else {
          this.open2()
        }
      })
    },
    getLog(){
      this.$http({
        method: 'GET',
        url: 'http://192.168.1.102:8080/Log/logs',
      }).then( result => {
        this.log = result.data.data
      })
    },
    addLog(info){
      this.$http({
        method: 'POST',
        url: 'http://192.168.1.102:8080/Log/logs',
        data: {
          'log':{
            'adminId': localStorage.id,
            'type': info
          }
        }
      })
    }
  },
};
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