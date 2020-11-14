<template>
  <div class="market-container">
    <el-row type="flex" align="center" :gutter="20">
      <el-col :span="16">
        <el-input
          v-model="searchWord"
          placeholder="搜索你想吃的菜肴"
          id="search-btn"
        >
          <i class="el-icon-search" slot="suffix" @click="handleSearch"> </i>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-select v-model="canteen" placeholder="选择食堂" style="width: 100%">
          <el-option
            v-for="(item, index) in canteenOptions"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <item-line
      v-for="(i, ind) in itemLineList"
      :key="ind"
      :data="i"
      class="line-style"
    />
    <el-row type="flex" justify="center" style="margin-top:20px;">
      <el-pagination
        :current-page="pagination.curpage"
        :page-size="pagination.size"
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import ItemLine from "./component/itemLine.vue";
import {fetchDishes} from '@/api/myApis.js';

export default {
  name: "Market",
  components: { ItemLine },
  data() {
    return {
      itemLineList: [],
      AllitemList: [],
      searchWord: "",
      canteen: "",
      canteenOptions: ["七食堂", "新食堂"],
      pagination: {
        curpage: 1,
        size: 16,
        total: 0,
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.pagination.curpage = val;
      this.getList();
    },
    handleSearch() {},
    getList() {
      this.AllitemList = [
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient:
            "配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },

        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient:
            "配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },

        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient:
            "配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },

        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient:
            "配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },

        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient:
            "配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
        {
          imgSrc:
            "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          cost: 0,
          seller: "四川人家",
          ingredient: "配料123",
          name: "菜品名",
          canteen: "七食堂",
        },
      ];
        fetchDishes().then(res => {
            console.log(res)
        }).catch(res => {
            console.log(res)
        })

      this.pagination.total = this.AllitemList.length;
      let tmp = this.AllitemList.slice(
        (this.pagination.curpage - 1) * this.pagination.size,
        this.pagination.curpage * this.pagination.size
      );
      this.itemLineList = [];
      let item = [];
      for (let i = 0; i < tmp.length; i++) {
        item.push(tmp[i]);
        if ((i - 3) % 4 == 0) {
          this.itemLineList.push(item);
          item = [];
        }
      }
      if (item.length !== 0) this.itemLineList.push(item);
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/variables.scss";

.market-container {
  padding: 20px 12%;

  .line-style {
    &:not(:first-child) {
      margin-top: 25px;
    }
  }
}


.el-pager li.active{
    color:$darkRed;
}

.el-pager li:hover{
    color:$darkRedHover;
}

.el-pagination button:hover{
    color:$darkRedHover;
}
</style>

<style scoped>
.el-row >>> .el-input__suffix {
  display: flex !important;
  align-items: center !important;
}
</style>

