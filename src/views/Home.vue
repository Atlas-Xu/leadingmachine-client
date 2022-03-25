<template>
  <div class="full-height logincontainer">
    <el-form
        class="loginForm"
        size="normal"
        label-width="60px">


    <el-form-item>
      <span class="loginTitle">xchub图书馆</span>
    </el-form-item>
    <el-form-item>
      <router-link :to="{path: '/login'}">
        <el-button type="primary" class="mybtn" round>登录</el-button>
      </router-link>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>

</script>

<style scoped>
.logincontainer {
  height: 100%;
  width: 100%;
  background: #fff;
  background-image: url("../assets/img/login_bg.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 100%;
}

.loginForm {
  height: 300px;
  width: 450px;
  background: #fff;
  padding: 35px 20px;
  border-radius: 10px;
}

.loginTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  color: #409eff;
}

.logincontainer ::v-deep .el-form-item__content {
  margin-left: 0px !important;
}

.mybtn {
  width: 100%;
}
</style>
