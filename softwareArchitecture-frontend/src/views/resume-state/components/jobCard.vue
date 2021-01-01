<template>
  <el-card>
    <div class="clearfix">
      <el-row>
        <el-col :span="22">
          <el-row type="flex" align="middle">
            <div class="project-title">
              <span>[{{ project.online }}]</span>
              {{ project.name }}
            </div>
          </el-row>
          <el-row class="project-time"> {{ project.time }}
          </el-row>
        </el-col>
        <el-col :span="2" class="project-show">
          <i class="el-icon-arrow-up" v-if="isShow" @click="handleShow"></i>
          <i class="el-icon-arrow-down" v-else @click="handleShow"></i>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "jobCard"
    }
</script>

<style scoped>

</style>
