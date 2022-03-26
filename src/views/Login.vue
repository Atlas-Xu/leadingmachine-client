<template>
  <div class="login_container">
    <el-main>
      <el-card shadow="always" class="box-card">
        <div
            style="
        margin: 0px 0px 15px 0px;
        color: #67c23a;
        font-weight: 600;
        font-size: 15px;

      "
        >
          人脸识别身份验证登录
        </div>
        <div>
          【温馨提示：请保持光线充足，并正对摄像头】
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<style scoped>
.login_container {
  height: 100vh;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: 100% 100%;
  background-color: #7a7a7a;
  background-blend-mode: multiply;
}
.box-card{
  height: 600px;
  width: 650px;
  position: fixed;
  left: 33%;
  top: 20%;
}

</style>
