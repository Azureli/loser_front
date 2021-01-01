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

    <div :id="'profile' + project.index" style="display: none">
      <el-divider style="margin:0 10px;"></el-divider>
      <div class="project-profile">
        <el-row>
          <el-col class="profile-info" :span="20">
            <el-row>
              <el-col :span="12">
                <span class="cardTitle">型号 ： </span>{{ project.type }}
              </el-col>
              <el-col :span="12">
                <span class="cardTitle">处理器类型 ：</span>
                {{ project.platform }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="cardTitle">组长 ： </span>{{ project.leader }}
              </el-col>
              <el-col :span="12">
                <span class="cardTitle">编译环境 ：</span>
                {{ project.compiler }}
              </el-col>
            </el-row>
            <el-row>
              <span class="cardTitle">代码历史版本 ：</span>
              <span v-if="project.editionList.length === 0">暂无</span>
              <span v-for="i in project.editionList">{{ i }} &nbsp </span>
            </el-row>
          </el-col>
          <el-col class="profile-more" :span="4">
            <el-row class="textBtn">
              <router-link
                :to="{
                  path: '/project/projectInfo',
                  query: { project: project },
                }"
              >
                <el-button type="text" style="padding:0">
                  基础信息
                </el-button></router-link
              >
            </el-row>
            <el-row class="textBtn">
              <router-link
                :to="{
                  path: '/project/codeMgmt',
                  query: {
                    name: project.name,
                    state: project.online,
                    id: project.id,
                  },
                }"
              >
                <el-button type="text" style="padding:0">代码管理
                </el-button></router-link
              >
            </el-row>
            <el-row class="textBtn">
              <router-link
                :to="{
                  path: '/project/analysisResult',
                  query: { name: project.name, id: project.id },
                }"
              >
                <el-button type="text" style="padding:0">分析结果
                </el-button></router-link
              >
            </el-row>
          </el-col>
        </el-row>
      </div>
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
