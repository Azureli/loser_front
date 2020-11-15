<template>
  <el-row class="dish-container">
    <el-col :span="8">
    <div >
        <el-image :src="src"></el-image>
    </div>
    </el-col>
    <el-col :span="12" :offset="2">
      <p class="title">
        {{dish}}
        <el-link href="#/market" :underline="false" class="link">返回首页</el-link>
      </p>
      <p class="dishprice">￥{{dishPrice}}</p>

      <h5>主要原料</h5>
      <p>{{material}}</p>
      <h5>其他说明</h5>
      <p>
        {{explanations}}
        <el-button class="dark-red-btn" @click="orderdish" v-permission="['admin', 'user']">现在预订</el-button>
      </p>
    </el-col>
    <el-col :span="22" class="comment">
      <h5>用户评论</h5>
      <item-comment
        v-for="(i, ind) in itemList"
        :key="ind"
        :commentInfo="i"
        :style="randomRgb(i)"
        class="line-style"
      />
    </el-col>
  </el-row>
</template>

<script>
import DropdownMenu from "@/components/Share/DropdownMenu";
import ItemComment from "./components/itemComment.vue";
import {viewDishDetail,viewComment,orderDish} from '@/api/myApis.js';
import { mapGetters } from "vuex";
import permission from "@/directive/permission/index.js";

export default {
  name: "Documentation",
  components: { DropdownMenu, ItemComment },
  directives: { permission },
  computed: {
    ...mapGetters(["id"]),
  },
  data() {
    return {
      dishid:1,

      dish: "bug大餐",
      dishPrice: "14",
      material: "html,vue,宽油,耗子尾汁",
      explanations: "吃了这道菜,不写bug,每天闪电五连鞭",
      src:
        "F:\\图片\\61.bmp",
      itemList: []
    };
  },
  methods: {
    randomRgb(item) {
      let R = Math.floor(Math.random() * 130 + 100);
      let G = Math.floor(Math.random() * 130 + 20);
      let B = Math.floor(Math.random() * 130 + 20);
      return {
        background: "rgba(" + R + "," + G + "," + B + ",0.04)"
      };
    },
    getList() {
    let fd = new FormData();
    fd.append('dishId',this.dishid);
        viewComment(fd).then(res => {
        console.log(res)
        for (let i=0;i<res.comments.length;i++)
        {
          this.itemList.push(res.comments[i]);
        }
        }).catch(res => {
            console.log(res)
        })
    },
    getInfo() {
    let fd = new FormData();
    fd.append('id', this.dishid);
      viewDishDetail(fd).then(res => {
        console.log(res)
        this.dish=res.data.dishName;
        this.cost=res.data.dishPrice;
        this.material=res.data.ingredient;
        this.explanations=res.data.introduction;
        this.src="http://127.0.0.1:8000/"+res.data.url;
        }).catch(res => {
            console.log(res)
        })
    },
    orderdish(){
    let fd = new FormData();
    fd.append('dishId',this.dishid);
    fd.append('userId',this.id);
    orderDish(fd).then(res => {
    console.log(res)
    }).catch(res => {
        console.log(res)
    })
    this.$router.push({path:'/guide'})
    }
  },
  mounted() {
    this.dishid = this.$route.query.dishId;
    this.getInfo();
    this.getList();
    console.log(this.$route.query)
  }
};
</script>

<style lang="scss" scope>
.dish-container {
  text-align: left;
  margin: 5% 10% 10% 15%;
  .el-link.el-link--default:hover {
    color: rgb(81, 15, 15) !important;
  }
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
  .el-image {
  width:380px;
  height:300px;
  object-fit: contain;
object-position: top;
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
  .comment {
  }
}
</style>
