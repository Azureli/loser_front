<template>
  <el-row class="dish-container">
    <el-col :span="22">
      <h5>待取餐</h5>
      <div>
        <item-toget
          v-for="(i, ind) in itemList1"
          :key="ind"
          :dishInfo="i"
          :style="randomRgb(i)"
          class="line-style"
          v-on:updateList="updateList"
        />
      </div>

      <h5>历史记录</h5>
      <div>
        <item-history
          v-for="(i, ind) in itemList2"
          :key="ind"
          :dishInfo="i"
          :style="randomRgb(i)"
          class="line-style"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import DropdownMenu from "@/components/Share/DropdownMenu";
import ItemToget from "./components/itemToget.vue";
import ItemHistory from "./components/itemHistory.vue";
import {viewOrderNow,viewOrderHistory,confirmOrder,addComment} from '@/api/myApis.js';
import { mapGetters } from "vuex";

export default {
  name: "guide",
  components: { DropdownMenu, ItemToget, ItemHistory,confirmOrder },
  computed: {
    ...mapGetters(["id"]),
  },
  data() {
    return {
      itemList1: [],
      itemList2: []
    };
  },
  methods: {
    randomRgb(item) {
      let R = Math.floor(Math.random() * 130 + 100);
      let G = Math.floor(Math.random() * 130 + 100);
      let B = Math.floor(Math.random() * 130 + 100);
      return {
        background: "rgba(" + R + "," + G + "," + B + ",0.1)"
      };
    },
    getList1() {
    this.itemList1 = []
       let fd = new FormData();
       fd.append('id',this.id);
        viewOrderNow(fd).then(res => {
        console.log(res)
        for(let i=0;i<res.data.length;i++){
        this.itemList1.push(res.data[i])
        }
        }).catch(res => {
            console.log(res)
        })
    },
    getList2() {
     this.itemList2 = []
       let fd = new FormData();
       fd.append('id',this.id);
        viewOrderHistory(fd).then(res => {
        console.log(res)
        for(let i=0;i<res.data.length;i++){
        this.itemList2.push(res.data[i])
        }
        }).catch(res => {
            console.log(res)
        })
    },
    updateList(){
    console.log(1)
    this.getList1();
    this.getList2();
    }
  },
  mounted() {
    this.getList1();
    this.getList2();
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
  .comment {
  }
}
</style>
