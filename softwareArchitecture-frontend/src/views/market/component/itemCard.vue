<template>
  <el-card class="item-card-wrapper">
    <div class="info-wrapper"  @click="viewDetail">
      <el-scrollbar>
        <el-row type="flex" align="center">
          <el-col :span="16" class="card-info-name">
            {{ cardInfo.name }}
          </el-col>
          <el-col :span="8" class="card-info-cost" style="text-align: right">
            {{ cardInfo.cost }}
          </el-col>
        </el-row>
        <el-row class="card-info-detail small-text">
          {{ cardInfo.canteen }}&nbsp&nbsp|&nbsp&nbsp{{ cardInfo.seller }}&nbsp&nbsp|&nbsp&nbsp{{ cardInfo.seller }}
        </el-row>
        <el-divider></el-divider>
        <el-row class="card-info-other">
          <el-col :span="4">
            <el-image :src="cardInfo.imgSrc"></el-image>
          </el-col>
          <el-col :span="6">
            公司名
          </el-col>
          <el-col :span="14" class="small-text">
            公司名
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
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123配料123配料123配料123配料123配料123配料123",
          name: "菜品名",
          canteen: "七食堂",
          id: 1,
          introduction: "test",
          sellerId:0,
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
        query: { dishId: this.cardInfo.id },
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
    }
  }
}
</style>

