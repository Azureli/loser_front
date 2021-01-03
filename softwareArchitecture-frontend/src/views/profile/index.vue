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
        <user-card :user="user" @addJob="changeAddDialog" />
      </el-col>
    </div>

    <div>
      <el-col :span="14" :offset="1" v-permission="['chef']">
        <cv-toget
          v-for="(i, ind) in cvList"
          :key="ind"
          :CvInfo="i"
          v-on:updatecvList="updatecvList"
          @editJob="changeEditDialog"
          @deleteJob="handleDeleteJob"
        />
      </el-col>
    </div>
    <el-dialog title="发布职位" :visible.sync="showAddDialog">
      <el-form :model="addForm" label-position="left" label-width="120px">
        <el-form-item label="职位名称">
          <el-input v-model="addForm.position"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="截止日期">
              <!--<el-input v-model="addForm.endTime"></el-input>-->
              <el-date-picker
                v-model="addForm.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
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
        <el-form-item>
          <el-button class="dark-red-btn" @click="addJobComfirm"
          >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑职位" :visible.sync="showUpdateDialog">
      <el-form :model="updateForm" label-position="left" label-width="120px">
        <el-form-item label="职位名称">
          <el-input v-model="updateForm.position"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="截止日期">
              <!--<el-input v-model="addForm.endTime"></el-input>-->
              <el-date-picker
                v-model="updateForm.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="工作地点">
              <el-select v-model="updateForm.location">
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
          <el-input v-model="updateForm.task"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="薪酬（千）">
              <!--<el-input v-model="addForm.salary"></el-input>-->
              <el-input-number v-model="updateForm.salary" :precision="2" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="招聘人数">
              <!--<el-input v-model="addForm.people"></el-input>-->
              <el-input-number v-model="updateForm.people" :step="1" step-strictly></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="职位要求">
          <el-input v-model="updateForm.requirement"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="updateForm.hr"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="dark-red-btn" @click="updateJobComfirm"
          >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑公司信息" :visible.sync="showCompanyDialog" width="30%">
      <el-form :model="companyForm" label-width="80px">
        <el-form-item label="公司标志">
          <el-input v-model="companyForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="联系号码">
          <el-input v-model="companyForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="公司介绍">
          <el-input v-model="companyForm.introduction"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showCompanyDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateCompanyComfirm">确 定</el-button>
        </span>
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
import { viewmyInfo, viewmypost, viewallpos,viewmycv } from "@/api/myApis.js";
import { addRecruitment,updateRecruitment,updateCompanyInfo,getcvList} from "@/api/myApis";

export default {
  name: "Profile",
  directives: { permission },
  components: { UserCard, Activity, Timeline, Account, PosToget, CvToget },
  data() {
    return {
      showCompanyDialog:false,
      showAddDialog: false,
      showUpdateDialog: false,
      choosenJodId:-1,
      user: {},
      activeTab: "activity",
      itemList: [],
      cvList: [],
      itemList: [      ],
      cvList:[
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
      updateForm:{
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
      companyForm:{
        icon:'',
        intro:'',
        contract:'',
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
    handleDeleteJob(data){

    },
    changeAddDialog(){
      this.showAddDialog = true;
    },
    changeEditDialog(data){
      this.updateForm= data;
      this.showUpdateDialog = true;
    },
    addJobComfirm(){
      console.log(this.id)
      if(this.addForm.position===''||this.addForm.location===''||this.addForm.task===''||this.addForm.requirement===''||
        this.addForm.hr===''||this.addForm.endTime===''){
        this.$message({
          showClose: true,
          message: '请完善岗位信息！',
          type: 'warning'
        });
        return;
      }
      addRecruitment({
        id:this.id,
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
          this.$message({
            showClose: true,
            message: '发布成功！',
            type: 'success'
          });
          this.getallpos();
          this.showAddDialog = false;
        })
        .catch((res) => {
          console.log(res);
          this.showAddDialog = false;
        });
    },
    updateJobComfirm(){
      if(this.updateForm.position===''||this.updateForm.location===''||this.updateForm.task===''||
        this.updateForm.requirement===''||this.updateForm.hr===''||this.updateForm.endTime===''){
        this.$message({
          showClose: true,
          message: '请完善岗位信息！',
          type: 'warning'
        });
        return;
      }
      updateRecruitment({
        id:this.updateForm.recruitmentId,
        position:this.updateForm.position,
        location:this.updateForm.location,
        task:this.updateForm.task,
        salary:this.updateForm.salary,
        requirement:this.updateForm.requirement,
        people:this.updateForm.people,
        hr:this.updateForm.hr,
        endTime:this.updateForm.endTime,
      })
        .then((res) => {
          console.log(res);
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success'
          });
          this.getallpos();
          this.showUpdateDialog = false;
        })
        .catch((res) => {
          console.log(res);
          this.showUpdateDialog = false;
        });
    },
    updateCompanyComfirm(){
      // if(this.companyForm.icon===''||this.companyForm.introduction===''||this.companyForm.contact===''){
      //   this.$message({
      //     showClose: true,
      //     message: '请完善公司信息！',
      //     type: 'warning'
      //   });
      //   return;
      // }
      updateCompanyInfo({
        id:this.id,
        contact:this.companyForm.contact,
        icon:this.companyForm.icon,
        introduction:this.companyForm.introduction,
      })
        .then((res) => {
          console.log(res);
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success'
          });
          //这里应该还要刷新当前页的公司信息
          this.showCompanyDialog = false;
        })
        .catch((res) => {
          console.log(res);
          this.showCompanyDialog = false;
        });
    },
    getList() {},
    // getcvList() {
    //   getcvList(id).then(res => {
    //     console.log(res)
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // },
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
        //   {
        //   name: "运营1",
        //   posid:"1",
        //   commend: "能上刀山下火海",
        //   salary: "12K",
        //   edu:"小学毕业",
        // },
          this.cvList = res.data.map(cur => {
            cur.posid = cur.recruitmentId
            cur.name = cur.position
            return cur
          });
        })
        .catch(res => {
          console.log(res);
        });
    },

    updateList() {
      console.log(1);
      this.getpostlist();
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
  .dialog{
    width: 70%;
  }
}
</style>

