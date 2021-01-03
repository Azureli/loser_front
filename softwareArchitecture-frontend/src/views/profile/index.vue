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
        <user-card :user="user" @addJob="changDialog" />
      </el-col>
    </div>

    <div >
      <el-col :span="14" :offset="1" v-permission="['chef']" >
        <cv-toget
          v-for="(i, ind) in cvList"
          :key="ind"
          :CvInfo="i"
          v-on:updatecvList="updatecvList"
        />
      </el-col>
    </div>
    <el-dialog title="发布职位" :visible.sync="showDialog">
      <el-form :model="addForm" label-position="left" label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="职位名称">
              <el-input v-model="addForm.position"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="工作地点">
              <el-select v-model="addForm.location">
                <el-option
                  v-for="(item, index) in jobOptions.items"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="工作内容">
          <el-input v-model="addForm.task"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="薪酬（千）">
              <!--<el-input v-model="addForm.salary"></el-input>-->
              <el-input-number v-model="addForm.salary" :precision="2" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="招聘人数">
              <!--<el-input v-model="addForm.people"></el-input>-->
              <el-input-number v-model="addForm.people" :step="1" step-strictly></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="职位要求">
          <el-input v-model="addForm.requirement"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="addForm.hr"></el-input>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-input v-model="addForm.endTime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="dark-red-btn" @click="addJobComfirm"
          >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
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
import { addRecruitment} from "@/api/myApis";

export default {
  name: "Profile",
  directives: { permission },
  components: { UserCard, Activity, Timeline, Account, PosToget ,CvToget},
  data() {
    return {
      showDialog: false,
      user: {},
      activeTab: "activity",
      itemList: [
        {
          posid: 1,
          name: "马农",
          time: "2020.1.1",
          salary: "12K",
          state: "0",
          textstate: "已拒绝"
        },
        {
          posid: 1,
          name: "123",
          time: "2020.1.1",
          salary: "12K",
          state: "1",
          textstate: "审核中"
        },
        {
          posid: 1,
          name: "321",
          time: "2020.1.1",
          salary: "12K",
          state: "2",
          textstate: "已通过"
        }
      ],
      cvList:[
        {
          name: "运营1",
          posid:"1",
          commend: "能上刀山下火海",
          salary: "12K",
          edu:"小学毕业",
        },
        {
          name: "运营2",
          posid:"1",
          commend: "能上刀山下火海",
          salary: "12K",
          edu:"小学毕业",
        },
        {
          name: "运营3",
          posid:"1",
          commend: "能上刀山下火海",
          salary: "12K",
          edu:"小学毕业",
        }
      ],
      addForm:{
        companyId:'',
        position:'',
        location:'',
        task:'',
        salary:0,
        requirement:'',
        people:0,
        hr:'',
        endTime:'',
      },
      jobOptions:{
        placeholder: "城市",
        items: [
          { label: "北京", value: "北京" },
          { label: "上海", value: "上海" },
          { label: "广州", value: "广州" },
          { label: "深圳", value: "深圳" },
          { label: "杭州", value: "杭州" },
          { label: "天津", value: "天津" },
          { label: "西安", value: "西安" },
          { label: "苏州", value: "苏州" },
          { label: "武汉", value: "武汉" },
          { label: "厦门", value: "厦门" },
          { label: "长沙", value: "长沙" },
          { label: "成都", value: "成都" },
          { label: "郑州", value: "郑州" },
          { label: "重庆", value: "重庆" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles","id"])
  },
  created() {
    this.getUser();
  },
  methods: {
    changDialog(){
      this.showDialog = true;
    },
    addJobComfirm(){
      addRecruitment({
        companyId:this.id,
        position:this.addForm.position,
        location:this.addForm.location,
        task:this.addForm.task,
        salary:this.addForm.salary,
        requirement:this.addForm.requirement,
        people:this.addForm.people,
        hr:this.addForm.hr,
        endTime:this.addForm.endTime,
      })
        .then((res) => {
          console.log(res);
          this.showDialog = false;
        })
        .catch((res) => {
          console.log(res);
          this.showDialog = false;
        });
    },
    getList() {},
    getcvList() {},
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
      updatecvList() {
      console.log(1);
      this.getcvList();
    },
    mounted() {
      this.getList();
    }
  }
};
</script>
<style lang="scss" scope>
.app-container {
  padding: 3%;
  .dialog{
    width: 70%;
  }
}
</style>

