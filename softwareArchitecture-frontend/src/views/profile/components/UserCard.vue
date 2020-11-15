<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ name }}</div>
        <div class="user-role text-center text-muted">
          {{ user.role | uppercaseFirst }}<span v-permission="['admin', 'chef']">-{{ canteen }}</span>
        </div>
      </div>
    </div>

    <div class="user-bio" v-permission="['admin', 'chef']">
      <div class="user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-edit" /><span>修改信息</span>
        </div>
        <div class="user-bio-section-body">
          <el-form v-model="selfForm" label-width="80px">
            <el-form-item label="商家名称">
              <el-input v-model="selfForm.name" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="隶属食堂">
              <el-select
                v-model="selfForm.canteen"
                placeholder="选择食堂"
                style="width: 100%"
                size="mini"
              >
                <el-option
                  v-for="(item, index) in canteenOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="dark-red-btn" size="mini" @click="changeSelf"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Skills</span></div>
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
      </div>
    </div> -->
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
    ...mapGetters(["id", "canteen", "name"]),
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
          avatar: "",
          role: "",
        };
      },
    },
  },
  data() {
    return {
      canteenOptions: [],
      selfForm: {
        name: this.user.name,
        canteen: "",
      },
    };
  },
  methods: {
    changeSelf() {
      console.log(this.selfForm);
      let fd = new FormData();
      fd.append("username", this.selfForm.name);
      fd.append("canteenId", this.selfForm.canteen);
      fd.append("userId", this.id);

      changeUserInfo(fd)
        .then((res) => {
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
            type: "success",
          });
          console.log(this.name);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    getCanteenList() {
      fetchCanteenList()
        .then((res) => {
          console.log(res);
          this.canteenOptions = res.list.map((cur) => {
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
  },
  mounted() {
    this.getCanteenList();
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
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
    }
  }
}
</style>
