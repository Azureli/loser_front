<template>
  <el-card class="item-card-wrapper">
    <el-image :src="cardInfo.imgSrc"></el-image>
    <div class="info-wrapper">
      <el-scrollbar>
        <el-row type="flex" align="center">
          <el-col :span="18" class="card-info-name">{{ cardInfo.name }}</el-col>
          <el-col :span="6" class="card-info-cost"
            >￥{{ cardInfo.cost }}</el-col
          >
        </el-row>
        <el-row class="card-info-other">
          {{ cardInfo.canteen }}-{{ cardInfo.seller }}
        </el-row>
        <el-row class="card-info-other">主要原料：</el-row>
        <el-row class="card-info-other"
          ><p style="text-indent: 30px; margin: 0;">
            {{ cardInfo.ingredient }}
          </p></el-row
        >
        <el-button class="dark-red-btn" size="mini" style="float:right; margin-right:10px;margin-top:5px;">浏览</el-button>
        <div style="height:25px;"></div>
      </el-scrollbar>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ItemCard",
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
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scope>
.item-card-wrapper {
  padding: 0px;
  float: left;
  width: calc(25% - 20px);
  height: 350px;

  
.el-scrollbar__wrap{
  overflow-x: hidden;
}

  .el-card__body {
    padding: 0;
  }

  .el-image {
    height:200px;
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

