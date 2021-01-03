<template>
  <el-card class="item-card-wrapper">
    <div class="info-wrapper"  @click="viewDetail">
      <el-scrollbar>
        <el-row type="flex" align="center">
          <el-col :span="16" class="card-info-name">
            {{ cardInfo.position }}
          </el-col>
          <el-col :span="8" class="card-info-cost" style="text-align: right">
            {{ cardInfo.salary }}K
          </el-col>
        </el-row>
        <el-row class="card-info-detail small-text">
          {{ cardInfo.location }}&nbsp&nbsp|&nbsp&nbsp{{ cardInfo.people }}人&nbsp&nbsp|&nbsp&nbsp{{ cardInfo.requirement }}
        </el-row>
        <el-divider></el-divider>
        <el-row class="card-info-other">
          <el-col :span="6">
            <el-image :src="cardInfo.imgSrc"></el-image>
          </el-col>
          <el-col :span="18" style="line-height:40px ">
            {{ cardInfo.companyName }}
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </el-card>
</template>

<script>
import permission from "@/directive/permission/index.js";
import { deleteDish } from "@/api/myApis";
import { mapGetters } from "vuex";

export default {
  name: "ItemCard",
  directives: { permission },
  computed: {
    ...mapGetters(["id"]),
  },
  props: {
    cardInfo: {
      type: Object,
      default: () => {
        return {
          id: 103,
          position: "淘金者",
          location: "撒哈拉沙漠",
          task: "寻找金矿",
          salary: 50,
          requirement: "需要发现财富的眼力",
          people: 2,
          mail: "1232@xx.xx",
          endTime: "2022-03-05T16:00:00.000+00:00",
          extra: "",
          companyId : 106,
          companyName:"金洋有限公司",
          phone: "123456",
          imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          intro: "金洋有限公司在三年内就从名不见经传的小作坊，一举成为宇宙内Top500，这都归功于老板的远见和强力措施。",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    viewDetail() {
      this.$router.push({
        path: "/detail",
        query: {info: this.cardInfo },
      });
    },
    updateDish() {
      this.$emit("updateDish", this.cardInfo);
    },
    deleteDish() {
      this.$emit("deleteDish", this.cardInfo);
      // let fd = new FormData();
      // fd.append("dishId", this.cardInfo.id);
      // fd.append("userId", this.id);
      // deleteDish(fd)
      //   .then((res) => {
      //     console.log(res);
      //     if (res.error_num === 0) {
      //       this.$message({
      //         message: "删除成功！",
      //         type: "success",
      //       });
      //     } else{

      //     }
      //   })
      //   .catch((res) => {
      //     console.log(res);
      //     this.$message.error('出错了！');

      //   });
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/variables.scss";
.icon-btn {
  color: $darkRedHover;
  margin-top: 10px;
  cursor: pointer;
}

.item-card-wrapper {
  padding: 0px;
  float: left;
  width: calc(33% - 20px);
  height: 165px;

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-card__body {
    padding: 0;
  }

  .el-image {
    height: 40px;
    width: 40px;
  }

  .info-wrapper {
    width: 100%;
    padding: 20px;
    height: 165px;
    overflow: hidden;

    .el-divider{
      margin: 14px 0;
    }

    .card-info-name {
      font-weight: bold;
      font-size: large;
    }

    .card-info-cost {
      color: red;
    }

    .card-info-detail{
      color: #606266;
      margin-top: 5px;

    }

    .card-info-other {
      color: #606266;
      height: 40px;
      line-height: 35px;
      vertical-align: middle;

    }

    .small-text{
      color: #909399;
      font-size: 0.8em;
    }
  }
}
</style>

