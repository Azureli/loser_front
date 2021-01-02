<template>
  <el-row class="div-toget">
    <el-col :span="16">
      <h3>{{ CvInfo.name }}</h3>
      <h4>
        <span class="salary">薪资{{ CvInfo.salary }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ CvInfo.commend }}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{ CvInfo.edu }}</span>
      </h4>
    </el-col>
    <el-col :span="8" style="height:100%">
      <el-row class="icon-ui" type="flex" align="middle" justify="center">
        <el-col :span="6">
          <i class="el-icon-view" @click="viewResume"></i>
        </el-col>
        <el-col :span="6">
          <i class="el-icon-edit"></i>
        </el-col>
        <el-col :span="6">
          <i class="el-icon-delete"></i>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { confirmOrder } from "@/api/myApis.js";
import { mapGetters } from "vuex";
import permission from "@/directive/permission/index.js";

export default {
  name: "CvToget",
  directives: { permission },
  computed: {
    ...mapGetters(["id"]),
  },
  props: {
    CvInfo: {
      type: Object,
      default: () => {
        return {
          name: "运营",
          posid: "1",
          commend: "能上刀山下火海",
          salary: "12K",
          edu: "小学毕业",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    showdetails() {
      this.$router.push({ path: "/detail" });
    },
    viewResume(){
      console.log(1)
      this.$router.push({path:"/viewResume/index"})
    }
  },
};
</script>

<style lang="scss" scope>
.div-toget {
  // border: 1px solid;
  // border-color: rgba(222, 222, 222, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 2px;
  padding: 1%;
  margin: 1%;
  // background-color: azure;
  height: 120px;
}

.salary {
  color: rgba(255, 61, 61, 0.719);
}
.icon-ui {
  // width: 200px;
  // height: 50px;
  height:100%;
  color: rgb(255, 188, 0);

  i{
    font-size: 30px;
    cursor: pointer;

    &:hover{
      color:  rgb(235, 172, 1);
    }
  }
  // font-size: 35px;
  // float: right;
  // margin-bottom: 5%;
}
.el-icon-view,
.el-icon-edit,
.el-icon-delete {
  margin: 3%;
}
</style>

