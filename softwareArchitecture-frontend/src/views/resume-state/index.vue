<template>
  <div class="view-wrapper">
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
    <div class="top-distance">
      <job-card v-for="(i,id) in jobList" :project="i" :key="id" />
    </div>
  </div>
</template>

<script>
  import jobCard from "./components/jobCard";
    export default {
      name: "resumeState",
      components: { jobCard },
      data(){
        return{
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
          jobList:[]
        }
      },
      methods:{
        searchJob(){

        }
      }
    }
</script>

<style lang="scss" >
  .el-input-group__prepend{
    background-color: #fff
  }

  .el-input-group__append{
    background-color: #ffbc5a;
    color: #fff;
  }
</style>
