<template>
  <el-row class="cv-container">
    <div class="grey-head">
      <h2>
        {{position}}
        <span class="dishprice">薪资 {{salary}}</span>
        <el-button @click="submitcv" v-permission="['user']">投递简历</el-button>
      </h2>
      <h3>工作地点：{{workplace}}·招聘人数：{{Num}}·时间：{{worktime}}</h3>
    </div>
    <el-col :span="10" :offset="2">
      <div>
        <h2>
          <i class="el-icon-caret-right"></i>工作内容
        </h2>
        <p>{{context}}</p>
        <h2>
          <i class="el-icon-caret-right"></i>岗位要求
        </h2>
        <p>{{pos_discrip}}</p>
        <el-link href="#/market" :underline="false" class="link">返回首页</el-link>
      </div>
    </el-col>
    <el-col :span="8" :offset="2">
      <el-card>
        <el-image :src="src"></el-image>
        <p class="title">{{company}}</p>
        <h3>公司简介</h3>
        <el-divider></el-divider>
        <h5>岗位数量</h5>
        <p>{{staffnum}}</p>
        <h5>公司简介</h5>
        <p>{{intro}}</p>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import DropdownMenu from "@/components/Share/DropdownMenu";
import {} from "@/api/myApis.js";
import { mapGetters } from "vuex";
import permission from "@/directive/permission/index.js";

export default {
  name: "Documentation",
  components: {},
  directives: { permission },
  computed: {
    ...mapGetters(["id"])
  },
  data() {
    return {
      position: "顶级码农",
      salary: "15k-20k",
      workplace: "宿舍床上",
      Num: "一个亿",
      worktime: "996",
      context:
        "工作内容工作内容工作内容工作内容工作内容工作内容工作内容工作内容工作内容工作内容工作内容工作内容",
      pos_discrip:
        "睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉睡大觉",
      company: "Microsoft",
      staffnum: "1000",
      intro: "每天九九六 快乐打工人",
      src: "F:\\图片\\61.bmp"
    };
  },
  methods: {
    getInfo() {
      let fd = new FormData();
      fd.append("id", this.dishid);
      viewDishDetail(fd)
        .then(res => {
          console.log(res);
          this.dish = res.data.dishName;
          this.dishPrice = res.data.cost;
          this.material = res.data.ingredient;
          this.explanations = res.data.introduction;
          this.src = "http://127.0.0.1:8000/" + res.data.url;
        })
        .catch(res => {
          console.log(res);
        });
    },
    submitcv() {
      this.$router.push({ path: "/resume" });
    },
    mounted() {
      this.dishid = this.$route.query.dishId;
      this.getInfo();
      console.log(this.$route.query);
    }
  }
};
</script>

<style lang="scss" scope>
.cv-container {
  text-align: left;
  margin: 0% 0% 0% 0%;
  padding: 0;
  .el-icon-caret-right {
    color: rgb(255, 188, 0);
  }
  .el-card {
    margin: 5%;
    padding: 2%;
    text-align: center;
  }
  .el-link.el-link--default:hover {
    color: rgb(81, 15, 15) !important;
  }
  .grey-head {
    background-color: rgba(204, 204, 204);
    padding: 1.5% 1.5% 1.5% 3%;
    color: white;
    .el-button {
      width: 240px;
      height: 56px;
      background-color: rgb(255, 188, 0);
      font-size: 20px;
      color: white;
      border: 0ch;
      font-weight: bold;
      margin-right: 5%;
      margin-top: 0.5%;
    }
    .el-button :hover {
      color: rgb(255, 234, 188);
    }
  }
  .title {
    font-size: 30px;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    object-position: right;
  }
  .dishprice {
    color: red;
  }

  .el-image {
    width: 200px;
    height: 200px;
    object-fit: contain;
    object-position: top;
  }
  .h3 {
    font-size: 20px;
  }
  .link {
    float: right;
    color: grey;
  }
  .dishintro {
    float: right;
  }
  .el-button {
    float: right;
  }
  .comment {
  }
}
</style>
