<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
          class="login_form"
          size="normal"
          label-width="60px">
        <el-form-item>
          <span class="loginTitle">xchub图书馆</span>
        </el-form-item>
        <el-form-item>
          <router-link :to="{path: '/bookBorrow'}">
            <el-button type="success" class="mybtn" plain>借书</el-button>
          </router-link>
        </el-form-item>
        <el-form-item>
          <router-link :to="{path: '/bookReturn'}">
            <el-button type="primary" class="mybtn" plain>还书</el-button>
          </router-link>
        </el-form-item>
        <el-form-item>
          <router-link :to="{path: '/'}">
            <el-button type="danger" class="mybtn" plain>退出</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.login_container {
  height: 100vh;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: 100% 100%;
}

.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginTitle {
  font-size: 32px;
  font-weight: 600;
  color: #409eff;
}


.login_container ::v-deep .el-form-item__content {
  margin-left: 0px !important;
}

.mybtn {
  width: 100%;
}
</style>
