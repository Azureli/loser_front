<template>
  <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-row type="flex" align="middle" class="topbar-wrapper">
      <logo />
      <div style="width:calc(100% - 300px);"></div>
      <!-- <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="horizontal"
        class="top-menu"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu> -->
      <profiles />
    </el-row>
  <!-- </el-scrollbar> -->
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import Profiles from "./Profiles";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo, Profiles },
  computed: {
    ...mapGetters(["permission_routes", "topbar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.topbar.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
  .topbar-wrapper{
    line-height: 70px;
    height: 70px;
    width:100%;
    overflow: hidden;
    background-color: $menuBg;

  }

  .top-menu{
    display: inline-block;
    height: 65px;
    border:1px solid $menuBg;
    width: calc(100% - 300px);
    margin-left: 15px;
  }
</style>
