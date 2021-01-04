<template>
  <el-row  class="div-get" :style="changecolor(PosInfo.status)">
    <div class="buttonstate" :style="buttoncolor(PosInfo.status)">{{PosInfo.status}}</div>
    <h3>{{PosInfo.name}}·{{PosInfo.position}}</h3>
    
    <h4>投递时间:{{PosInfo.commitTime.split('T')[0]}}<span class="salary">薪资{{PosInfo.salary}}</span></h4>
      <el-link class="cancel" type="danger" @click="cancel">取消申请</el-link>
    <el-link class="posdetail" @click="showdetails">岗位详情</el-link>
  
  </el-row>
</template>

<script>
import {deletemycv } from "@/api/myApis.js";
import { mapGetters } from "vuex";
import permission from "@/directive/permission/index.js";

export default {
  name: "PosToget",
  directives: { permission },
  computed: {
    ...mapGetters(["id"])
  },
  props: {
    PosInfo: {
      type: Object,
      default: () => {
        return {
          name: "马农123",
          posid:"1",
          time: "2020.1.1",
          salary: "12K",
          state: "0",
          textstate:"已拒绝"
        };
      }
    }
  },
  data() {
    return {
      cvForm:{
        resumeId:"",
        jobId:"",
      }
    };
  },
  methods: {
    changecolor(state) {
      console.log(state);
      // 1 审核中
      //0 拒绝
      //2 通过
      if (state === "审核中") {
        return {
          background: "#F4F4F5"
        };
      }
      if (state === "已通过")
        return {
          background: "#F0F9EB"
        };
      if (state === "未通过")
        return {
          background: "rgba(254,240,240,0.9)"
        };
    },
    buttoncolor(state) {
      // 1 审核中
      //0 拒绝
      //2 通过
      if (state === "审核中") {
        return {
          background: "#909399"
        };
      }
      if (state === "已通过")
        return {
          background: "#67C23A"
        };
      if (state === "未通过")
        return {
          background: "#F56C6C"
        };
    },
    cancel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.cvForm.resumeId = this.PosInfo.resumeId;
          this.cvForm.jobId = this.PosInfo.recruitmentId;
          deletemycv(this.cvForm)
            .then(res => {
              console.log("FFFFFF");
              console.log(res);
              this.$emit("updateList");
            })
            .catch(res => {
              console.log(res);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    showdetails() {
      this.$router.push({
        path: "/detail",
        query: { info: this.PosInfo }
      });
    }
  }
};
</script>

<style lang="scss" scope>
.div-get {
  border: 1px solid;
  border-color: rgba(222, 222, 222, 0.2);
  padding: 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .buttonstate{
    width:80px;
    height:36px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    float: right;
    border:0ch;
    margin: 1%;
    line-height:36px; 
    color:white;


  }

  .salary{
    margin-left: 2%;
    color: rgba(255, 61, 61, 0.719);
  }
  .posdetail{
    font-size: 16px;

  }
  .cancel{
    float: right;
    color:darkred;
    font-size: 16px;
    margin-right:2%;
  }
  .cancel :hover,.cancel :focus{
    font-size: 16px;
    color: red;
  }

}
</style>

