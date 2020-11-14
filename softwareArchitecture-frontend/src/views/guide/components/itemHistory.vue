<template>
  <el-row class="div-toget">
    <div>
      <el-col :span="4" class="boldtext">{{dishInfo.cnt}} {{dishInfo.dish}}</el-col>
      <el-col :offset="1" :span="4" class="canteen">{{dishInfo.canteen}}</el-col>
      <el-col :offset="1" :span="4" class="time">{{dishInfo.time}}</el-col>
      <el-link  :underline="false" class="link" @click="submit">添加评价</el-link>
      <el-col :offset="4" :span="3" class="div-num">取餐号：{{dishInfo.dishnum}}</el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "ItemHistory",
  props: {
    dishInfo: {
      type: Object,
      default: () => {
        return {
          cnt: 0,
          dish: "牛肉大餐",
          dishnum: "12",
          canteen: "保国餐厅",
          time: "2020.11.11"
        };
      }
    }
  },
  data() {
    return {};
  },
   methods: {
      submit() {
        this.$prompt('请输入评价', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '评价成功谢谢惠顾 '
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
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
  .el-link.el-link--default:hover {
    color: rgb(81, 15, 15) !important;
  }
  .link {
    float: right;
    color: grey;
    margin: 10px;
  }
  .boldtext {
    margin: 10px;
    font-weight: bold;
  }
  .canteen {
    color: rgba(50, 50, 50, 0.7);
    font-size: 14px;
    margin: 10px 10px 10px 20px;
  }
  .div-num {
    margin: 10px;
  }
  .time {
    color: rgba(50, 50, 50, 0.7);
    font-size: 14px;
    margin: 10px 10px 10px 20px;
  }
}
</style>

