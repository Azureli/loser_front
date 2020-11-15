<template>
  <div class="div-comment">
    <p>
      <i class="el-icon-user"></i>
      <span class="stunum">{{commentInfo.username}}</span>
    </p>

    <p class="comment">
      <i class="el-icon-s-comment"></i>
      <span class="text">{{commentInfo.content}}</span>
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
          username: "1120162047",
          content: "整挺好真不错",
          time:""
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

