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

export default {
  name: "guide",
  components: { DropdownMenu, ItemToget, ItemHistory },
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
      this.itemList1 = [
        {
          cnt: 0,
          dish: "牛肉大餐",
          canteen: "七食堂",
          dishnum: "1"
        },
        {
          cnt: 1,
          dish: "麻瓜汁",
          canteen: "霍格沃兹",
          dishnum: "2"
        },
        {
          cnt: 2,
          dish: "耗子尾汁",
          canteen: "保国餐厅",
          dishnum: "55"
        },
        {
          cnt: 3,
          dish: "松果糖豆五莲煸",
          canteen: "保国餐厅",
          dishnum: "66"
        }
      ];
    },
    getList2() {
      this.itemList2 = [
        {
          cnt: 0,
          dish: "牛肉大餐",
          canteen: "七食堂",
          dishnum: "1",
          time: "2020.11.11"
        },
        {
          cnt: 1,
          dish: "麻瓜汁",
          canteen: "霍格沃兹",
          dishnum: "2",
          time: "2020.11.1"
        },
        {
          cnt: 2,
          dish: "耗子尾汁",
          canteen: "保国餐厅",
          dishnum: "55",
          time: "2020.11.11"
        },
        {
          cnt: 3,
          dish: "松果糖豆五莲煸",
          canteen: "保国餐厅",
          dishnum: "66",
          time: "2020.11.11"
        }
      ];
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
