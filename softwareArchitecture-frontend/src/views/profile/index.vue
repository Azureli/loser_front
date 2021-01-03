<template>
  <div class="app-container">
    <div v-if="user">
      <el-col :span="14" :offset="1" v-permission="['user']">
        <pos-toget
          v-for="(i, ind) in itemList"
          :key="ind"
          :PosInfo="i"
          v-on:updateList="updateList"
        />
      </el-col>

      <el-col :span="6" :xs="24" :offset="1">
        <user-card :user="user" />
      </el-col>
    </div>

    <div>
      <el-col :span="14" :offset="1" v-permission="['chef']">
        <cv-toget
          v-for="(i, ind) in cvList"
          :key="ind"
          :CvInfo="i"
          v-on:updatecvList="updatecvList"
        />
      </el-col>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Activity from "./components/Activity";
import Timeline from "./components/Timeline";
import Account from "./components/Account";
import PosToget from "./components/posToget.vue";
import CvToget from "./components/cvToget.vue";
import permission from "@/directive/permission/index.js";
import { viewmyInfo, viewmypost, viewallpos } from "@/api/myApis.js";

export default {
  name: "Profile",
  directives: { permission },
  components: { UserCard, Activity, Timeline, Account, PosToget, CvToget },
  data() {
    return {
      user: {},
      activeTab: "activity",
      itemList: [],
      cvList: []
    };
  },
  computed: {
    ...mapGetters(["id", "name", "avatar", "roles"])
  },
  created() {
    this.getUser();
  },
  mounted() {
    console.log(this.id);
    console.log(this.name);
    if (this.roles[1][0] == "u") {
      this.getpostlist();
    } else {
      this.getallpos();
    }
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar
      };
    },
    getpostlist() {
      viewmypost(this.id)
        .then(res => {
          console.log(res);
          this.itemList = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    }, //user查看自己的投递的简历
    getallpos() {
      //公司查看所有的岗位
      viewallpos(this.id)
        .then(res => {
          console.log(res);
          this.cvList = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },

    updateList() {
      console.log(1);
      this.getList();
    },
    updatecvList() {
      console.log(1);
      this.getcvList();
    }
  }
};
</script>
<style lang="scss" scope>
.app-container {
  padding: 3%;
}
</style>

