<template>
  <div>
    <el-menu
      :default-active="defauleActive"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in menuList.menus"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="itemC.url"
            v-for="itemC in item.children"
            :key="itemC.id"
            >{{ itemC.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      defauleActive: "/home",
    };
  },
  computed: {
    ...mapGetters({
      // menuList:'menu/getMenuList',
      menuList: "aside/getMenu",
    }),
  },
  mounted() {
    // this.getMenuList(),
    this.defauleActive = this.$route.path;
  },
};
</script>

<style  lang="stylus" scoped>
.el-menu {
  width: 200px;
  min-height: 650px;
}
</style>
