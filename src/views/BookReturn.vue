<template>
  <div class="login_container">
    <div align="center" class="down_container">
      <el-header>
        <h2 class="top_tip">
          请确认需要归还的图书
        </h2>
      </el-header>
      <el-main class="book_list">
        <el-table :height="tableHeight" :data="tableData" border stripe>
          <el-table-column label="图书名称" prop="bookName"/>
          <el-table-column label="作者" prop="bookAuthor"/>
          <el-table-column label="出版社" prop="bookProduct"/>
        </el-table>
      </el-main>
      <el-footer>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <router-link :to="{path: '/choose'}">
              <el-button type="primary" class="mybtn" plain>取消</el-button>
            </router-link>
          </el-col>
          <el-col :span="8">
            <el-button type="success" class="mybtn" @click="returnButton" plain>确认</el-button>
          </el-col>
        </el-row>
      </el-footer>
    </div>
  </div>
</template>

<script>


export default {
  name: "BookReturn",
  data() {
    return {
      // 表格高度
      tableHeight: 0,
      // 表格数据
      tableData: [],
      bookIds: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 320
    })
  },
  methods:{
    // 读取RFID书本数据
    getList(){
      this.$axios.get('/uhfapi/rfid').then(res => {
        this.tableData = res.data.data
      })
    },
    // 提取bookId存入
    transferToBookIds(){
      this.bookIds = []
      this.tableData.forEach(item => {
        this.bookIds.push(item.bookId)
      })
      console.log(this.bookIds)
    },
    // 确认归还
    returnButton(){
      this.transferToBookIds()
      const param = {
        readerId: this.$userdata.userId,
        bookIds: this.bookIds
      }
      console.log(param)
      this.$axios.post('/api/borrow/returnFromMachine', param).then(res => {
        if(res.data.code === 200){
          this.$message({
            type: 'success',
            message: '归还成功'
          })
          this.$router.push('/')
        }else{
          this.$message({
            type: 'error',
            message: '归还失败'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login_container {
  height: 100vh;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: 100% 100%;
  background-color: #383838;
  background-blend-mode: multiply;
}

.mybtn {
  width: 70%;
}

.book_list {
  width: 80%;
}

.top_tip {
  color: #e3e8f9;
}

.down_container {
  transform: translateY(15%);
}

</style>
