<template>
  <el-row class="div-toget">
    <el-col :span="4" class="boldtext">{{dishInfo.orderId}} {{dishInfo.dish}}</el-col>
    <el-col :offset="1" :span="4" class="canteen">{{dishInfo.canteen}}</el-col>

    <el-col :offset="4" :span="3" class="div-num">取餐号：{{dishInfo.waitNum}}</el-col>
    <el-button class="dark-red-btn" @click="confirmOrder">已领取</el-button>
  </el-row>
</template>

<script>
import {confirmOrder} from '@/api/myApis.js';
import { mapGetters } from "vuex";

export default {
  name: "ItemToget",
  computed: {
  ...mapGetters(["id"]),
},
  props: {
    dishInfo: {
      type: Object,
      default: () => {
        return {
          orderId: 0,
          dish: "牛肉大餐",
          waitNum: "12",
          canteen: "保国餐厅"
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
  confirmOrder(){
   let fd = new FormData();
   fd.append('orderId',this.dishInfo.orderId);
    confirmOrder(fd).then(res => {
    console.log(res)
    this.$emit("updateList")
    }).catch(res => {
        console.log(res)
    })
  }
  }
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

