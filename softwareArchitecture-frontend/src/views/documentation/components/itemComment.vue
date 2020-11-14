<template>
  <div class="div-comment">
    <p>{{commentInfo.stuNum}}</p>
    <p>{{commentInfo.comment}}</p>
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
          stuNum:"1120162047",
          comment:"整挺好真不错"
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scope>
.div-comment{
  background-color: rgba(222,222,222,0.2);
  padding:1%;
  border: 1px solid;
  border-color: rgba(222,222,222,0.2);
  
}
</style>

