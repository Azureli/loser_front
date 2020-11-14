<template>
  <div class="market-container">
    <el-row type="flex" align="center" :gutter="20">
      <el-col :span="16">
        <el-input :model="searchWord" placeholder="搜索你想吃的菜肴">
          <i class="el-icon-search" slot="suffix" @click="handleSearch"> </i>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-select :model="cateen" placeholder="选择食堂" style="width:100%">
          <el-option
            v-for="item in canteenOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
  </div>
</template>

<script>
import ItemLine from "./component/itemLine.vue";

export default {
  name: "Market",
  components: { ItemLine },
  data() {
    return {
      itemLineList: [],
      searchWord: "",
      cateen:"",
      canteenOptions:[{
          label:'七食堂',
          value: 7
      },{
          label:'新食堂',
          value: 1
      }]
    };
  },
  methods: {
    handleSearch() {},
    getList() {
      this.itemLineList = [
        [
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
            ingredient: "配料123",
            name: "菜品名",
            canteen: "七食堂",
          },
        ],
        [
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
        ],
      ];
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scope>
.market-container {
  padding: 20px 12%;

  .line-style {
    &:not(:first-child) {
      margin-top: 25px;
    }
  }
}
</style>

