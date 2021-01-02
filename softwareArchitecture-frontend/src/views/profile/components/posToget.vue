<template>
  <el-row  class="div-toget" :style="changecolor(PosInfo.state)">
    <div class="buttonstate" :style="buttoncolor(PosInfo.state)">{{PosInfo.textstate}}</div>
    <h3>{{PosInfo.name}}</h3>
    
    <h4>投递时间:{{PosInfo.time}}<span class="salary">薪资{{PosInfo.salary}}</span></h4>
      <el-link class="cancel" @click="cancel">取消申请</el-link>
    <el-link class="posdetail" @click="showdetails">岗位详情</el-link>
  
  </el-row>
</template>

<script>
import { confirmOrder } from "@/api/myApis.js";
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
    return {};
  },
  methods: {
    changecolor(state) {
      // 1 审核中
      //0 拒绝
      //2 通过
      if (state == "1") {
        return {
          background: "rgba(100,100,250,0.1)"
        };
      }
      if (state == "2")
        return {
          background: "rgba(100,250,100,0.1)"
        };
      if (state == "0")
        return {
          background: "rgba(250,100,100,0.1)"
        };
    },
    buttoncolor(state) {
      // 1 审核中
      //0 拒绝
      //2 通过
      if (state == "1") {
        return {
          background: "rgba(100,100,250,0.5)"
        };
      }
      if (state == "2")
        return {
          background: "rgba(100,250,100,0.5)"
        };
      if (state == "0")
        return {
          background: "rgba(250,100,100,0.5)"
        };
    },
    cancel(){

    },
    showdetails(){
       this.$router.push({ path: "/detail" });
    }
  }
};
</script>

<style lang="scss" scope>
.div-toget {
  border: 1px solid;
  border-color: rgba(222, 222, 222, 0.2);
  padding: 1%;
  .buttonstate{
    width:80px;
    height:36px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    float: right;
    border:0ch;
    margin: 1%;
    padding-top: 1%;
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

