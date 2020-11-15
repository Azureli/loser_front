<template>
  <el-card class="item-card-wrapper">
    <el-image :src="cardInfo.imgSrc"></el-image>
    <div class="info-wrapper">
      <el-scrollbar>
        <el-row type="flex" align="center">
          <el-col :span="17" class="card-info-name">{{ cardInfo.name }}</el-col>
          <el-col :span="5" class="card-info-cost"
            >￥{{ cardInfo.cost }}</el-col
          >
        </el-row>
        <el-row class="card-info-other">
          {{ cardInfo.canteen }}-{{ cardInfo.seller }}
        </el-row>
        <el-row class="card-info-other">主要原料：</el-row>
        <el-row class="card-info-other"
          ><p style="text-indent: 30px; margin: 0">
            {{ cardInfo.ingredient }}
          </p></el-row
        >
        <el-row>
          <i class="el-icon-delete icon-btn" @click="deleteDish"></i>
          <el-button
            v-permission="['admin', 'user', 'chef']"
            class="dark-red-btn"
            size="mini"
            style="float: right; margin-right: 10px; margin-top: 5px"
            @click="viewDetail"
            >浏览</el-button
          >

          <el-button
            v-permission="['admin', 'chef']"
            class="dark-red-btn"
            size="mini"
            style="float: right; margin-right: 10px; margin-top: 5px"
            @click="updateDish"
            >修改</el-button
          >
        </el-row>
        <div style="height: 25px"></div>
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
  width: calc(25% - 20px);
  height: 350px;

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-card__body {
    padding: 0;
  }

  .el-image {
    height: 200px;
  }

  .info-wrapper {
    width: 100%;
    padding: 10px 8px 15px 15px;
    height: 150px;
    overflow: hidden;

    .card-info-name {
      font-weight: bold;
      font-size: large;
    }

    .card-info-cost {
      color: red;
    }

    .card-info-other {
      color: #606266;
      margin-top: 5px;
    }
  }
}
</style>

