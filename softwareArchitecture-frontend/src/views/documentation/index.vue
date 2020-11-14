<template>

<el-row  class="dish-container">
  <el-col :span="8"  class="grid-content">
    <div class="dish-image">
      <el-image :src="src"></el-image>
    </div>
  </el-col>
  <el-col :span="12" :offset="2" class="grid-content">
      <p class="title" >{{dish}}  
        <el-link  href="#/dashboard" class="link">返回首页</el-link></p>
      <p class="dishprice">￥{{dishPrice}}</p>

      <h5>主要原料</h5>
      <p>        {{material}}      </p>
      <h5>其他说明</h5>
      <p>        {{explanations}}  <el-button>现在预订</el-button>    </p>
      
    </el-col>
</el-row>

</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
       dish:"bug大餐",
       dishPrice:"14",
       material:"html,vue,宽油,耗子尾汁",
       explanations:"吃了这道菜,不写bug,每天闪电五连鞭",
       src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      articleList: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（上）', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（下）', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
      ]
    }
  }
}
</script>

<style lang="scss" scope>
.dish-container{
  text-align: left;
  margin:5% 10% 10% 15%;
  .title{
    font-size: 30px;
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  .dishprice{
    color:red;
  }
  .dish-image{
    
  }
  .h3{
    font-size: 20px;
  }
  .link{
    float:right;
    color:grey;
  }
  .dishintro{
    float:right;
  }
  .el-button{
    float:right;
  }
}

</style>
