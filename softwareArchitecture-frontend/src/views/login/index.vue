<template>
  <el-row type="flex" justify="center" align="middle" style="height: 100%">
    <el-col :span="12" class="login-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login" class="title">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="{}"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
            <el-tooltip
              v-model="capsTooltip"
              content="Caps lock is On"
              placement="right"
              manual
            >
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span>
              </el-form-item>
            </el-tooltip>

            <el-button
              :loading="loading"
              class="dark-red-btn"
              style="width: 100%; margin-bottom: 30px"
              @click.native.prevent="handleLogin"
              >Login</el-button
            >
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            ref="regForm"
            :model="regForm"
            :rules="{}"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <el-form-item>
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="regName"
                v-model="regForm.regName"
                placeholder="Username"
                name="regName"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-tooltip
              v-model="capsTooltip"
              content="Caps lock is On"
              placement="right"
              manual
            >
              <el-form-item prop="regPassword">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="regPassword"
                  v-model="regForm.regPassword"
                  :type="passwordType"
                  placeholder="Password"
                  name="regPassword"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span>
              </el-form-item>
            </el-tooltip>

            <el-form-item>
              <span class="svg-container">
                <i class="el-icon-menu" />
              </span>
              <el-radio-group
                v-model="regForm.role"
                @change="changeRole"
                style="margin-left: 10px; heihgt: 49px"
              >
                <el-radio :label="1">食堂商户</el-radio>
                <el-radio :label="2">学生</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="showCanteenList">
              <span class="svg-container">
                <i class="el-icon-s-home" />
              </span>
              <el-select
                v-model="regForm.canteen"
                placeholder="Canteen"
                size="mini"
                style="width: calc(100% - 30px)"
              >
                <el-option
                  v-for="item in canteenList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-button
              class="dark-red-btn"
              :loading="loading"
              style="width: 100%; margin-bottom: 30px"
              @click.native.prevent="handleRegister"
              >Register</el-button
            >
          </el-form></el-tab-pane
        >
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";
import { fetchCanteenList, register } from "@/api/myApis";

export default {
  name: "Login",
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      canteenList: [],
      loginForm: {
        username: "3220200930",
        password: "nihaoya",
      },
      regForm: {
        regName: "",
        regPassword: "",
        role: "",
        canteen: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      activeName: "login",
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      showCanteenList: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
    this.getCanteenList();
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleRegister() {
      console.log(this.regForm)
      let fd = new FormData()
      fd.append('username', this.regForm.regName);
      fd.append('password', this.regForm.regPassword);
      fd.append('role', this.regForm.role)
      if(this.regForm.role === 1) {
        fd.append('belongId', this.regForm.canteen)
      }

      register(fd).then(res => {
        console.log(res)
        if(res.error_num === 0) {
          this.$message({
          message: '注册成功',
          type: 'success'
        });
        }
      }).catch(res => {
        console.log(res)
      })
    },

    getCanteenList() {
      fetchCanteenList()
        .then((res) => {
          console.log(res);
          this.canteenList = res.list.map((cur) => {
            return {
              value: cur.id,
              label: cur.name,
            };
          });
        })
        .catch((res) => {
          console.log(res);
        });
    },
    changeRole(val) {
      if (val === 1) this.showCanteenList = true;
      else this.showCanteenList = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: "/", query: this.otherQuery });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
};
</script>

<style lang="scss" scope>
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@import "~@/styles/variables.scss";
.login-container .el-input input{
  color: #510F0F !important;
}
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: $darkRedHover;
  background:$darkRedHover;
}

.el-radio__input.is-checked + .el-radio__label {
  color: $darkRedHover;
}

.el-tabs__active-bar {
  background-color: #510F0F;
  height: 3px;
  width: 50% !important;
}
.el-tabs__item {
  font-size: 20px;
}
.el-tabs__item:hover {
  color: #815050;
}
.el-tabs__item.is-active {
  color: #510F0F;
}
.el-button--primary {
  color: #FFFFFF;
  background-color: #510F0F;
  border-color: #510F0F;
}
.el-tabs__nav {
  width: 100%;
  .el-tabs__item {
    width: 50%;
    text-align: center;
  }
}

.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 15px;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-select {
    .el-input {
      width: 100%;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #510F0F;
$light_gray: #eee;

.login-container {
  background-color: $bg;
  overflow: hidden;
  .el-tabs__item.is-active {
    color: #510F0F;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #510F0F;
      margin: 60px auto auto auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
