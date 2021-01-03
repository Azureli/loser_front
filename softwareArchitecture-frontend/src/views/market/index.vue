<template>
  <div class="market-container">
    <el-row type="flex" align="middle" style="margin-top: 20px;margin-bottom: 20px;">
      <el-col :span="16" :offset="4">
        <el-input v-model="selectionForm.jobValue"
                  class="input-with-select"
                  placeholder="搜索职位">
          <el-select v-model="selectionForm.jobType" slot="prepend"
                     :placeholder="jobOptions.placeholder"
                     style="width:10vw;">
            <el-option
              v-for="(item, index) in jobOptions.items"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchJob">搜索</el-button>
        </el-input>
      </el-col>

    </el-row>
    <item-line
      v-for="(i, ind) in itemLineList"
      :key="ind"
      :data="i"
      class="line-style"
      v-on:updateDish="updateDish"
      v-on:deleteDish="deleteDish"
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
            <el-button size="small" class="dark-red-btn">点击上传</el-button>
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
import {
  fetchJobs,
  addDish,
  updateDish,
  fetchCanteenList,
  deleteDish,
  searchDish,
} from "@/api/myApis.js";
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
      showAll:true,
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
      pagination: {
        curpage: 1,
        size: 9,
        total: 0,
      },
      selectionForm:{
        jobValue: "",
        jobType:"",
      },
      jobOptions:{
        placeholder: "职位类型",
        items: [
          { label: "近一个月", value: 1 },
          { label: "近三个月", value: 3 },
          { label: "近六个月", value: 6 },
          { label: "近一年", value: 12 },
          { label: "全部", value: -1 },
        ],
      },
    };
  },
  methods: {
    changeFileForUpdate(file, filelist) {
      this.updateForm.imageList = filelist;
    },
    viewMyDish(){
      this.showAll=!this.showAll;
      if(this.showAll)
      {
        this.pagination = {
          curpage: 1,
          size: 16,
          total: 0,
        };
        this.getList();
      }
      else {
        let oldList = [].concat(this.AllitemList);
        this.AllitemList = [];
        for (let i = 0; i < oldList.length; i++) {
          if (oldList[i].sellerId === this.id) {
            this.AllitemList.push(oldList[i])
          }
        }
        this.pagination = {
          curpage: 1,
          size: 16,
          total: 0,
        };
        this.getRealList();
      }
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
      fd.append("dishId", this.updateForm.id);
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
      };
      this.updateDishDialog = true;
    },
    deleteDish(data) {
      let fd = new FormData();
      fd.append("dishId", data.id);
      fd.append("userId", this.id);
      deleteDish(fd)
        .then((res) => {
          console.log(res);
          if (res.error_num === 0) {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
            this.getList();
          } else {
            this.$message.error("出错了！");
          }
        })
        .catch((res) => {
          console.log(res);
          this.$message.error("出错了！");
        });
    },
    handleCurrentChange(val) {
      this.pagination.curpage = val;
      this.getList();
    },
    getRealList() {
      console.log(this.AllitemList)
      this.pagination.total = this.AllitemList.length;
      let tmp = this.AllitemList.slice(
        (this.pagination.curpage - 1) * this.pagination.size,
        this.pagination.curpage * this.pagination.size
      );
      this.itemLineList = [];
      let item = [];
      for (let i = 0; i < tmp.length; i++) {
        item.push(tmp[i]);
        if ((i - 2) % 3 == 0) {
          this.itemLineList.push(item);
          item = [];
        }
      }
      if (item.length !== 0) this.itemLineList.push(item);
    },
    searchJob(){
      if (this.searchWord === "") {
        this.getList();
        return;
      }
      let fd = new FormData();
      fd.append("keyword", this.searchWord);
      searchDish(fd)
        .then((res) => {
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
              sellerId:cur.sellerId,
            };
          });
          this.getRealList();
        })
        .catch((res) => {
          console.log(res);
        });
    },
    getList() {
      this.AllitemList = [];
      fetchJobs()
        .then((res) => {
          console.log(res);
          this.AllitemList = res.data.map((cur) => {
            return {
              id: cur.recruitmentId,
              position: cur.position,
              location: cur.location,
              task: cur.task,
              salary: cur.salary,
              requirement: cur.requirement,
              people: cur.people,
              mail: cur.hr,
              endTime: cur.endTime,
              extra: cur.extra,
              companyId : cur.companyId,
              companyName:cur.name,
              phone: cur.contact,
              imgSrc: cur.icon,
              intro: cur.introduction,
            };
          });
          this.getRealList();
        })
        .catch((res) => {
          console.log(res);
        });
    },

    filterCanteen(val) {
      let name = "";
      for (let i of this.canteenOptions) {
        if (i.value === val) {
          name = i.label;
          break;
        }
      }
      let fd = new FormData();
      fd.append("keyword", name);
      searchDish(fd)
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
              sellerId:cur.sellerId,
            };
          });
          this.pagination = {
            curpage: 1,
            size: 16,
            total: 0,
          };
          this.getRealList();
        })
        .catch((res) => {
          console.log(res);
        });
    },

    getCanteenList() {
      fetchCanteenList()
        .then((res) => {
          console.log(res);
          this.canteenOptions = res.list.map((cur) => {
            return {
              value: cur.id,
              label: cur.name,
            };
          });
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
  mounted() {
    this.getList();
    //this.getCanteenList();
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/variables.scss";

.market-container {
  padding: 0px 10%;

  .line-style {
    &:not(:first-child) {
      margin-top: 25px;
    }
  }


  .el-input-group__prepend{
    background-color: #fff
  }

  .el-input-group__append{
    background-color: #ffbc00;
    color: #fff;
    font-weight: bold;
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

.icon-btn {
  color: $darkRedHover;
  margin-top: -5px;
  cursor: pointer;
}
</style>

<style scoped>
.el-row >>> .el-input__suffix {
  display: flex !important;
  align-items: center !important;
}
</style>

