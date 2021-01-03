<template>
  <el-container>
    <el-main class="content">
      <!-- 左侧抽屉 -->
      <el-drawer
        title="简历列表"
        :visible.sync="drawerVisible"
        :before-close="beforeCloseDrawer"
        direction="rtl"
        size="50%"
      >
        <el-table :data="tableData">
          <el-table-column
            property="name"
            label="姓名"
            width="100"
          ></el-table-column>
          <el-table-column
            property="time"
            label="申请时间"
            width="100"
          ></el-table-column>
          <el-table-column
            property="experience"
            label="教育经历"
          ></el-table-column>
          <el-table-column label="操作" width="175" fixed="right">
            <template slot-scope="scope">
               <el-tooltip class="item" effect="dark" content="查看简历" placement="top">
              <i
                @click="handleClick(scope.row)"
                size="mini"
                class="el-icon-view"
              ></i>
               </el-tooltip>
               <el-tooltip class="item" effect="dark" content="拒绝申请" placement="top">
              <i
                size="mini"
                class="el-icon-circle-close"
              ></i>
               </el-tooltip>
               <el-tooltip class="item" effect="dark" content="通过申请" placement="top">
              <i
                size="mini"
                class="el-icon-circle-check"
              ></i>
            </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-drawer>

      <!-- 内容页 -->
      <el-row class="upper" type="flex" justify="center" align="middle">
        <el-col :span="23" style="display: flex">
          <div class="box">&nbsp</div>
          <span>基础信息</span>
        </el-col>
        <el-col :span="1">
          <i
            v-if="!drawerVisible"
            class="el-icon-d-arrow-left"
            style="cursor: pointer"
            @click="drawerVisible = true"
          ></i>
          <i
            v-else
            class="el-icon-d-arrow-right"
            style="cursor: pointer"
            @click="drawerVisible = false"
          ></i>
        </el-col>
      </el-row>
      <el-row class="info">
        <el-col :span="4">
          <div class="avatar-wrapper">
            <img
              :src="avatar + '?imageView2/1/w/80/h/80'"
              class="user-avatar"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <el-row> 姓名：{{ name }} </el-row>
          <el-row> 出生日期：{{ birthday }} </el-row>
          <el-row> 联系方式：{{ phone }} </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>个人介绍：</el-row>
          <el-row>{{ intro }}</el-row>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="upper">
        <div class="box">&nbsp</div>
        <span>个人简历</span>
      </el-row>
      <div class="resume">
        <el-row class="title"> 教育经历 </el-row>
        <el-row class="row-content">{{educationText}}
          <!-- <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="educationText"
          >
          </el-input> -->
        </el-row>
        <el-row class="title"> 工作经历 </el-row>
        <el-row class="row-content">{{workText}}
          <!-- <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="workText"
          >
          </el-input> -->
        </el-row>
        <el-row class="title"> 工作技能 </el-row>
        <el-row class="row-content">{{skillText}}
          <!-- <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="skillText"
          >
          </el-input> -->
        </el-row>
        <el-row class="title"> 其他 </el-row>
        <el-row class="row-content">{{otherText}}
          <!-- <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="otherText"
          >
          </el-input> -->
        </el-row>
      </div>
      <el-button @click="submitResume" class="big-btn" type="success" plain> 通过申请 </el-button>
      <el-button @click="submitResume" class="big-btn" type="danger" plain> 拒绝申请 </el-button>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import {getPeopleList} from "@/api/myApis"
export default {
  name: "viewResume",

  computed: {
    ...mapGetters(["avatar"]),
  },
  data() {
    return {
      imgUrl: "",
      name: "李二狗",
      birthday: "2020-2-2",
      phone: "15555555555",
      intro:
        "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦" +
        "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
      educationText: "",
      workText: "",
      skillText: "",
      otherText: "",
      drawerVisible: true,
      tableData: [
        {
          name: "123",
          time: "2020-1-1",
          experience: "xxxxx",
        },
      ],
      canCloseFlag: false,
    };
  },
  mounted(){
    console.log(this.$route.query.cvInfo)
    this.getPeopleList(this.$route.query.cvInfo.recruitmentId)
  },
  methods: {
    getPeopleList(id){
      getPeopleList(id).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
    },
    submitResume() {
      let fd = new FormData();
      fd.append("name", name);
      fd.append("birthday", birthday);
      fd.append("intro", intro);
      fd.append("educationText", educationText);
      fd.append("workText", workText);
      fd.append("skillText", skillText);
      fd.append("otherText", otherText);
    },
    handleClick(row) {
      console.log(row);
      this.canCloseFlag = true;
      this.drawerVisible = false;
    },
    beforeCloseDrawer(done) {
      if (this.canCloseFlag) done();
      else {
        this.$message({
          message: "请先选择一条简历查看！",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100vw;
  height: 100%;
  background-color: #ebebeb;
  text-align: center;
  margin: 0 auto;
}

.content {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  min-height: calc(100vh - 80px);
  width: calc(100vw - 100px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  margin: 20px 15%;
  padding: 50px;
}

.upper {
  line-height: 40px;
  text-align: left;
  vertical-align: middle;
  display: flex;
}

span {
  font-weight: bold;
  font-size: 25px;
}
.box {
  display: inline-block;
  background-color: #ffbc5a;
  width: 10px;
  height: 40px;
  margin-right: 10px;
}

.avatar-wrapper {
  height: 100%;
  cursor: pointer;

  img {
    height: 90%;
  }
}

.info {
  text-align: left;
  margin-top: 20px;
  margin-left: 20px;
  .el-row {
    margin-bottom: 10px;
  }
}

.title {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
}

.row-content{
  min-height: 50px;
  width: 100%;
}

.resume {
  margin-left: 20px;
  margin-bottom: 10px;
}

.big-btn {
  // background-color: #ffbc5a;
  // color: #ffffff;
  width: 150px;
  height: 45px;
  font-size: 1.1em;
}

.el-drawer__body {
  padding: 10px 10px;
}

.el-table {
  i{
    font-size: 30px;
    cursor: pointer;
    color: rgb(255, 188, 0);
    
margin-right:15px;
    
    &:hover{
      color:  rgb(235, 172, 1);
    }
  }
}
</style>
