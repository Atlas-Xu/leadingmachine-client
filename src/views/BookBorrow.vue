<template>
  <div class="login_container">
    <div align="center" class="down_container">
      <el-header>
        <h2 class="top_tip">
          请确认需要借阅的图书
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
            <el-button type="success" class="mybtn" @click="borrowButton" plain>确认</el-button>
          </el-col>
        </el-row>
      </el-footer>
    </div>
  </div>
</template>

<script>
import {borrowFromMachineApi} from "@/api/borrow";
import {rfidApi} from "@/api/rfid";

export default {
  name: "BookBorrow",
  data() {
    return {
      // 表格高度
      tableHeight: 0,
      // 表格数据
      tableData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 320
    })
  },
  methods: {

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
