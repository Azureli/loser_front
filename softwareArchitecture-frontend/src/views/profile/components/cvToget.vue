<template>
  <el-row class="div-toget">
    <h3>{{CvInfo.name}}</h3>

    <h4>
      <span class="salary">薪资{{CvInfo.salary}}</span>
      <el-divider direction="vertical"></el-divider>
      <span>{{CvInfo.commend}}</span>
      <el-divider direction="vertical"></el-divider>
      <span>{{CvInfo.edu}}</span>
      <div class="icon-ui">
        <i class="el-icon-view"></i>
        <i class="el-icon-edit"></i>
        <i class="el-icon-delete"></i>
      </div>
    </h4>
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
    ...mapGetters(["id"])
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
          edu: "小学毕业"
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    showdetails() {
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
  margin: 1%;
  background-color: azure;
  height: 120px;
}

.salary {
  color: rgba(255, 61, 61, 0.719);
}
.icon-ui {
  width:200px;
  height: 50px;
  color: rgb(255, 188, 0);
  font-size: 35px;
  float: right;
  margin-bottom: 5%;
}
.el-icon-view,.el-icon-edit,.el-icon-delete{
  margin: 3%;
}
</style>

