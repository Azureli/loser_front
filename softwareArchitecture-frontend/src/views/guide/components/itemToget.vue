<template>
  <el-row class="div-toget">
    <el-col :span="4" class="boldtext">{{dishInfo.cnt}} {{dishInfo.dish}}</el-col>
    <el-col :offset="1" :span="4" class="canteen">{{dishInfo.canteen}}</el-col>
    <el-col :offset="1" :span="4" class="time"></el-col>
    <el-col :offset="4" :span="3" class="div-num">取餐号：{{dishInfo.dishnum}}</el-col>
    <el-button class="dark-red-btn">已领取</el-button>
  </el-row>
</template>

<script>
export default {
  name: "ItemToget",
  props: {
    dishInfo: {
      type: Object,
      default: () => {
        return {
          cnt: 0,
          dish: "牛肉大餐",
          dishnum: "12",
          canteen: "保国餐厅"
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scope>
.div-toget {
  background-color: rgba(222, 222, 222, 0.2);
  border: 1px solid;
  border-color: rgba(222, 222, 222, 0.2);
  padding: 1%;
  .boldtext {
    font-weight: bold;
    margin: 10px;
  }
  .canteen {
    color: rgba(50, 50, 50, 0.7);
    font-size: 14px;
    margin: 10px 10px 10px 20px;
  }
  .div-num {
    margin: 10px 10px 10px 20px;
  }
  .time {
    color: rgba(50, 50, 50, 0.7);
    font-size: 14px;
    margin: 10px 10px 10px 20px;
  }
}
</style>

