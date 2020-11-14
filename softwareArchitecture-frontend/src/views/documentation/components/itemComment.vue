<template>
  <div class="div-comment">
    <p>
      <i class="el-icon-user"></i>
      <span class="stunum">{{commentInfo.stuNum}}</span>
    </p>

    <p class="comment">
      <i class="el-icon-s-comment"></i>
      <span class="text">{{commentInfo.comment}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "ItemComment",
  props: {
    commentInfo: {
      type: Object,
      default: () => {
        return {
          stuNum: "1120162047",
          comment: "整挺好真不错"
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scope>
.div-comment {
  background-color: rgba(222, 222, 222, 0.2);
  padding: 1%;
  border: 1px solid;
  border-color: rgba(222, 222, 222, 0.2);
  .stunum {
    font-weight: bold;
    margin-left: 10px;
  }
  .comment {
    margin-left: 20px;
  }
  .text {
    margin-left: 10px;
  }
}
</style>

