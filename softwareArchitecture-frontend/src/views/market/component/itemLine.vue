<template>
  <el-row>
    <item-card
      v-for="(i, ind) in data"
      :key="ind"
      :cardInfo="i"
      class="card-inline-style"
      v-on:updateDish="updateDish"
      v-on:deleteDish="deleteDish"
    />
  </el-row>
</template>

<script>
import ItemCard from "./itemCard";

export default {
  name: "ItemLine",
  components: { ItemCard },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    updateDish(data){
      this.$emit('updateDish', data)
    },
    deleteDish(data){
      this.$emit('deleteDish', data)
    }
  },
};
</script>

<style lang="scss" scope>
.card-inline-style {
  &:not(:first-child) {
    margin-left: 20px;
  }
}
</style>

