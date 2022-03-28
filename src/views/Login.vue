<template>
  <div class="login_container">
    <div align="center" class="down_container">
      <el-header>
        <h2 class="top_tip">
          人脸识别身份验证登录
        </h2>
        <h3 class="top_tip">
          【温馨提示：请保持光线充足，并正对摄像头】
        </h3>
      </el-header>
      <el-main>
        <hr/>
        <el-form label-width="60px" class="login_box">
          <el-form-item>

          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button type="primary" class="mybtn" plain>重新选择</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="success" class="mybtn" plain>确认登录</el-button>
          </el-col>
        </el-row>
        <hr/>
        <router-link :to="{path: '/'}">
          <el-button type="danger" class="mybtn" plain>取消</el-button>
        </router-link>
      </el-footer>
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
.login_container {
  height: 100vh;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: 100% 100%;
  background-color: #383838;
  background-blend-mode: multiply;
}

.box-card {
  height: 600px;
  width: 650px;
  position: fixed;
  left: 30%;
  top: 20%;
}

.down_container {
  transform: translateY(20%);
}

.top_tip {
  color: #e3e8f9;
}

.mybtn {
  width: 70%;
}
.login_box {
  height: 400px;
  width: 550px;
  background-color: #fff;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
}

</style>
