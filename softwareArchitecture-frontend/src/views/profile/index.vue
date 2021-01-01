<template>
  <div class="app-container">
    <div v-if="user">
      <el-col :span="14" :offset="1">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Activity from "./components/Activity";
import Timeline from "./components/Timeline";
import Account from "./components/Account";
import PosToget from "./components/posToget.vue";

export default {
  name: "Profile",
  components: { UserCard, Activity, Timeline, Account, PosToget },
  data() {
    return {
      user: {},
      activeTab: "activity",
      itemList: [
        {
          posid:1,
          name: "马农",
          time: "2020.1.1",
          salary: "12K",
          state: "0",
          textstate:"已拒绝"
        },
        {
          posid:1,
          name: "123",
          time: "2020.1.1",
          salary: "12K",
          state: "1",
          textstate:"审核中"
        },
        {
          posid:1,
          name: "321",
          time: "2020.1.1",
          salary: "12K",
          state: "2",
          textstate:"已通过"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  created() {
    this.getUser();
  },
  methods: {
    getList() {},
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar
      };
    },
    updateList() {
      console.log(1);
      this.getList();
    },
    mounted() {
      this.getList();
    }
  }
};
</script>
<style lang="scss" scope>
.app-container{
  padding:3%;
}
</style>

