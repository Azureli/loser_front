<template>
  <el-card class="item-card-wrapper">
    <el-image :src="cardInfo.imgSrc"></el-image>
    <div class="info-wrapper">
      <el-row type="flex" align="center">
        <el-col :span="18" class="card-info-name">{{ cardInfo.name }}</el-col>
        <el-col :span="6" class="card-info-cost">￥{{ cardInfo.cost }}</el-col>
      </el-row>
      <el-row class="card-info-other">
        {{ cardInfo.canteen }}-{{ cardInfo.seller }}
      </el-row>
      <el-row class="card-info-other">主要原料：</el-row>
      <el-row class="card-info-other">{{ cardInfo.ingredient }}</el-row>
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
          ingredient: "配料123",
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

  .el-image{
      width: 100%;
  }

  .info-wrapper {
    width: 100%;
    padding: 0 10px;

    .card-info-name {
      font-weight: bold;
      font-size: large;
    }

    .card-info-cost {
      color: red;
    }

    .card-info-other {
      color: #606266;
    }
  }
}
</style>

