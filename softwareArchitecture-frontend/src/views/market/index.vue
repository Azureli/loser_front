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
        <el-button
          @click="addDishDialog = true"
          v-permission="['admin', 'chef']"
          class="dark-red-btn"
          >添加菜品</el-button
        >
        <el-select
          v-model="canteen"
          placeholder="选择食堂"
          style="width: 100%"
          v-permission="['user']"
        >
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
      v-on:updateDish="updateDish"
    />
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-pagination
        :current-page="pagination.curpage"
        :page-size="pagination.size"
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>

    <!-- 修改菜品弹窗 -->
    <el-dialog title="修改菜品" :visible.sync="updateDishDialog">
      <el-form ref="updateForm" :model="updateForm" label-width="120px">
        <el-form-item label="菜品名称">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="updateForm.cost"></el-input>
        </el-form-item>
        <el-form-item label="主要原料">
          <el-input v-model="updateForm.ingredient"></el-input>
        </el-form-item>
        <el-form-item label="其他介绍">
          <el-input
            v-model="updateForm.introduction"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片描述">
          <el-upload
            action=""
            :limit="1"
            :on-change="changeFileForUpdate"
            :file-list="updateForm.imageList"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="dark-red-btn" @click="updateDishComfirm"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加菜品弹窗 -->
    <el-dialog title="添加菜品" :visible.sync="addDishDialog">
      <el-form ref="updateForm" :model="updateForm" label-width="120px">
        <el-form-item label="菜品名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="addForm.cost"></el-input>
        </el-form-item>
        <el-form-item label="主要原料">
          <el-input v-model="addForm.ingredient"></el-input>
        </el-form-item>
        <el-form-item label="其他介绍">
          <el-input
            v-model="addForm.introduction"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片描述">
          <el-upload
            action=""
            :limit="1"
            :on-change="changeFileForAdd"
            :file-list="addForm.imageList"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="dark-red-btn" @click="addDishComfirm"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ItemLine from "./component/itemLine.vue";
import { fetchDishes, addDish, updateDish } from "@/api/myApis.js";
import permission from "@/directive/permission/index.js";
import { mapGetters } from "vuex";

export default {
  name: "Market",
  directives: { permission },
  components: { ItemLine },
  computed: {
    ...mapGetters(["id"]),
  },
  data() {
    return {
      addForm: {
        name: "",
        cost: "",
        ingredient: "",
        introduction: "",
        imageList: [],
      },
      addDishDialog: false,
      updateForm: {
        id: "",
        name: "",
        cost: "",
        ingredient: "",
        introduction: "",
        imageList: [],
      },
      updateDishDialog: false,
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
    changeFileForUpdate(file, filelist) {
      this.updateForm.imageList = filelist;
    },
    changeFileForAdd(file, filelist) {
      this.addForm.imageList = filelist;
    },
    addDishComfirm() {
      console.log(this.addForm);
      let fd = new FormData();
      fd.append("dishName", this.addForm.name);
      fd.append("ingredient", this.addForm.ingredient);
      fd.append("introduction", this.addForm.introduction);
      fd.append("cost", this.addForm.cost);
      fd.append("userId", this.id);
      fd.append("pic", this.addForm.imageList[0].raw);

      addDish(fd)
        .then((res) => {
          console.log(res);
          this.getList();
          this.addDishDialog = false;
        })
        .catch((res) => {
          console.log(res);
          this.addDishDialog = false;
        });
    },
    updateDishComfirm() {
      console.log(this.updateForm);
      let fd = new FormData();
      fd.append('dishId', this.updateForm.id)
      fd.append("dishName", this.updateForm.name);
      fd.append("ingredient", this.updateForm.ingredient);
      fd.append("introduction", this.updateForm.introduction);
      fd.append("cost", this.updateForm.cost);
      fd.append("userId", this.id);
      if (this.updateForm.imageList.length > 0)
        fd.append("pic", this.updateForm.imageList[0].raw);
      updateDish(fd)
        .then((res) => {
          console.log(res);
          this.getList();
          this.updateDishDialog = false;

        })
        .catch((res) => {
          console.log(res);
          this.updateDishDialog = false;
        });
    },
    updateDish(data) {
      console.log(data);
      this.updateForm = {
        id: data.id,
        name: data.name,
        cost: data.cost,
        ingredient: data.ingredient,
        introduction: data.introduction,
        imageList: [],
      }
        this.updateDishDialog = true;
    },
    handleCurrentChange(val) {
      this.pagination.curpage = val;
      this.getList();
    },
    handleSearch() {},
    getList() {
      this.AllitemList = [];
      fetchDishes()
        .then((res) => {
          console.log(res);
          this.AllitemList = res.list.map((cur) => {
            return {
              imgSrc: "http://127.0.0.1:8000/" + cur.url,
              cost: cur.cost,
              seller: cur.seller,
              ingredient: cur.ingredient,
              name: cur.dishName,
              canteen: cur.canteen,
              id: cur.id,
              introduction: cur.introduction,
            };
          });
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
        })
        .catch((res) => {
          console.log(res);
        });
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

.el-pager li.active {
  color: $darkRed;
}

.el-pager li:hover {
  color: $darkRedHover;
}

.el-pagination button:hover {
  color: $darkRedHover;
}
</style>

<style scoped>
.el-row >>> .el-input__suffix {
  display: flex !important;
  align-items: center !important;
}
</style>

