<template>
  <el-card style="margin-bottom: 20px">
    <span>About</span>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{user.role}}
        </pan-thumb>
      </div>
      <div class="box-right" v-permission="['user']">
        <p>姓名：{{name}}</p>
        <p>生日：{{birth}}</p>
        <p>联系方式： {{tel}}</p>
      </div>
       <div class="box-right" v-permission="['chef']">
        <p>公司名称{{name}}</p>
        <p>岗位数量{{posNum}}</p>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" />
          <span v-permission="['user']">个人简介</span>
          <span v-permission="['chef']">公司简介</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">{{introduction}}</div>
        </div>
      </div>
      <el-button @click="changeSelf" v-permission="['user','admin','chef']">修改信息</el-button>
      <el-button @click="toParent" v-permission="['chef']">发布岗位</el-button>

      <!-- <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" />
          <span>个人技能</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div> -->
    </div>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import { fetchCanteenList, changeUserInfo } from "@/api/myApis";
import permission from "@/directive/permission/index.js";
import { mapGetters } from "vuex";

export default {
  components: { PanThumb },
  directives: { permission },
  computed: {
    ...mapGetters(["id"])
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          birth: "1999.9.9",
          tel: "8888888",
          posNum:"1000",
          email: "",
          avatar: "",
          role: ""
        };
      }
    }
  },
  data() {
    return {
      canteenOptions: [],
      introduction: "山东蓝翔山东蓝开挖掘机山东蓝翔山东蓝开挖掘机山东蓝翔山东蓝开挖掘机山东蓝翔山东蓝开挖掘机山东蓝翔山东蓝开挖掘机",
      name: "333",
      birth: "2020.1.1",
      tel: "156156156",
      posNum:"1000",
      selfForm: {
        name: this.user.name,
        birth: this.user.birth,
        tel: this.user.tel,
        canteen: ""
      }
    };
  },
  methods: {
    toParent(){
      this.$emit('addJob', true)
    },
    changeSelf() {
      console.log(this.selfForm);
      let fd = new FormData();
      fd.append("username", this.selfForm.name);
      fd.append("canteenId", this.selfForm.canteen);
      fd.append("userId", this.id);

      changeUserInfo(fd)
        .then(res => {
          console.log(res);
          let name = "";
          for (let i of this.canteenOptions) {
            if (i.value === this.selfForm.canteen) {
              name = i.label;
              break;
            }
          }
          this.$store.commit("user/SET_CANTEEN", name);
          this.$store.commit("user/SET_NAME", this.selfForm.name);
          this.$message({
            message: "修改成功",
            type: "success"
          });
          console.log(this.name);
        })
        .catch(res => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
  float: left;
}
.box-right {
  margin-left: 40%;
  display: table;
}

.text-muted {
  color: #777;
  text-align: left;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;
  text-align: center;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;



    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      text-align: left;
    }
  }
}
 .el-button {
      width: 200px;
      height: 56px;
      background-color: rgb(255, 188, 0);
      font-size: 20px;
      color: white;
      border: 0ch;
      font-weight: bold;
      margin-top: 20px;
      margin-left: 0;

    }
    .el-button :hover {
      color: rgb(255, 234, 188);
    }
</style>
