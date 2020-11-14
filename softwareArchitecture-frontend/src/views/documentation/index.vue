<template>
  <el-row class="dish-container">
    <el-col :span="8">
      <div class="dish-image">
        <el-image :src="src"></el-image>
      </div>
    </el-col>
    <el-col :span="12" :offset="2">
      <p class="title">
        {{dish}}
        <el-link href="#/dashboard" class="link">返回首页</el-link>
      </p>
      <p class="dishprice">￥{{dishPrice}}</p>

      <h5>主要原料</h5>
      <p>{{material}}</p>
      <h5>其他说明</h5>
      <p>
        {{explanations}}
        <el-button class="dark-red-btn">现在预订</el-button>
      </p>
    </el-col>
    <el-col :span="22" class="comment">
      <h5>用户评论</h5>
      <item-comment v-for="(i, ind) in itemList" :key="ind" :commentInfo="i" :style="randomRgb(i)" class="line-style" />
    </el-col>
  </el-row>
</template>

<script>
import DropdownMenu from "@/components/Share/DropdownMenu";
import ItemComment from "./components/itemComment.vue";
import { mount } from "@vue/test-utils";
export default {
  name: "Documentation",
  components: { DropdownMenu, ItemComment },
  data() {
    return {
      dish: "bug大餐",
      dishPrice: "14",
      material: "html,vue,宽油,耗子尾汁",
      explanations: "吃了这道菜,不写bug,每天闪电五连鞭",
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      itemList: []
    };
  },
  methods: {
    randomRgb(item) {
      let R = Math.floor(Math.random() * 130+100);
      let G = Math.floor(Math.random() * 130+100);
      let B = Math.floor(Math.random() * 130+100);
      return {
        background: 'rgba(' + R + ',' + G + ',' + B + ',0.1)'
        };
    },
    getList() {
      this.itemList = [
        {
          stuNum: "1120162047",
          comment: "整挺好真不错"
        },
        {
          stuNum: "1120168888",
          comment: "贵了"
        },
        {
          stuNum: "1120168888",
          comment: "下次还来"
        },
        {
          stuNum: "1125252566",
          comment: "兄弟萌冲"
        }
      ];
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="scss" scope>
.dish-container {
  text-align: left;
  margin: 5% 10% 10% 15%;
  .title {
    font-size: 30px;
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  .dishprice {
    color: red;
  }
  .dish-image {
  }
  .h3 {
    font-size: 20px;
  }
  .link {
    float: right;
    color: grey;
  }
  .dishintro {
    float: right;
  }
  .el-button {
    float: right;
  }
  .comment{
    
  }
}
</style>
