<template>
  <el-container>
    <el-main class="content">
      <el-row class="upper" >
        <div class="box"> &nbsp </div>
        <span>基础信息</span>
      </el-row>
      <el-row class="info">
        <el-col :span="4">
          <div class="avatar-wrapper">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          </div>
        </el-col>
        <el-col :span="8">
          <el-row>
            姓名：{{name}}
          </el-row>
          <el-row>
            出生日期：{{birthday}}
          </el-row>
          <el-row>
            联系方式：{{phone}}
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>个人介绍：</el-row>
          <el-row>{{intro}}</el-row>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="upper">
        <div class="box"> &nbsp </div>
        <span>个人简历</span>
      </el-row>
      <div class="resume" >
        <el-row class="title">
          教育经历
        </el-row>
        <el-row>
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="educationText">
            </el-input>
        </el-row>
        <el-row class="title">
          工作经历
        </el-row>
        <el-row>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="workText">
          </el-input>
        </el-row>
        <el-row class="title">
          工作技能
        </el-row>
        <el-row>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="skillText">
          </el-input>
        </el-row>
        <el-row class="title">
          其他
        </el-row>
        <el-row>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="otherText">
          </el-input>
        </el-row>
      </div>
      <el-button  @click="submitResume">
        提交
      </el-button>
    </el-main>
  </el-container>
</template>

<script>
  import { mapGetters } from "vuex";
    export default {
      name: "viewResume",

      computed: {
        ...mapGetters(["avatar"]),
      },
      data(){
        return{
          imgUrl:'',
          name:'李二狗',
          birthday:'2020-2-2',
          phone:'15555555555',
          intro:'啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦' +
          '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
          educationText:'',
          workText:'',
          skillText:'',
          otherText:'',
        }
      },
      methods:{
        submitResume(){
          let fd = new FormData();
          fd.append('name',name);
          fd.append('birthday',birthday);
          fd.append('intro',intro);
          fd.append('educationText',educationText);
          fd.append('workText',workText);
          fd.append('skillText',skillText);
          fd.append('otherText',otherText);
        }
      }
    }
</script>

<style lang="scss" scoped>
  .el-container{
    width: 100vw;
    height: 100%;
    background-color: #ebebeb;
    text-align: center;
    margin: 0 auto;
  }

  .content{
    background-color: #ffffff;
    color: #333;
    text-align: center;
    min-height: calc(100vh - 80px);
    width: calc(100vw - 100px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    margin:20px 15%;
    padding: 50px;
  }

  .upper{
    line-height: 40px;
    text-align: left;
    vertical-align:middle;
    display: flex;
  }

  span{
    font-weight: bold;
    font-size: 25px;
  }
  .box{
    display: inline-block;
    background-color: #ffbc5a;
    width: 10px;
    height: 40px;
    margin-right: 10px;
  }


  .avatar-wrapper{
    height:100%;
    cursor: pointer;

    img{
      height: 90%;
    }
  }

  .info{
    text-align: left;
    margin-top: 20px;
    margin-left: 20px;
    .el-row{
      margin-bottom: 10px;
    }
  }

  .title{
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
  }
  .resume{
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .el-button{
    background-color: #ffbc5a;
    color: #ffffff;
    width: 150px;
    height: 45px;
    font-size: 1.1em;
  }

</style>
