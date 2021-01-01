<template>
  <div class="logo-wrapper">
    <el-row type="flex" align="middle">
    <img src="./../../../icons/BITlogo2.png" fit="contain"/>
    <h2>LOSER直聘</h2>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data() {
    return {
      title: 'Vue Element Admin',
      logo: '../../../assets/BITlogo2.png'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.logo-wrapper{
  width: 200px;
  height: 56px;
  line-height: 56px;
  display: inline-block;
  background-color: $menuBg;
  padding-left: 10px;

  .el-row{
    height:56px;
    color: white;
    font-weight: bold;

    img{
      height:calc(100% - 10px);
      width:auto;
    }
    span{
      margin-left: 5px;
    }
  }
}
</style>
