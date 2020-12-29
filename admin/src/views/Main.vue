<template>
  <el-container>
    <el-header style="border-bottom: solid 1px #e6e6e6">
      <h3>WaliWali - 后台管理系统</h3>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          mode="vertical"
          style="height: 100vh"
          :default-active="$route.path"
          router
        >
          <el-submenu
            v-for="(item, index) in menu.items"
            :index="`menu-item-${index}`"
            :key="`menu-item-${index}`"
          >
            <template slot="title">{{ item.title }}</template>
            <el-menu-item
              v-for="(subItem, subIndex) in item.items"
              :index="subItem.path"
              :key="`menu-item-${index}-${subIndex}`"
            >
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "文章管理", path: "/articles/list" },
          { title: "标签管理", path: "/marks/list" },
          { title: "分类管理", path: "/categories/list" },
        ],
      },
      {
        title: "账号管理",
        items: [{ title: "管理员账号管理", path: "/adminusers/list" }],
      },
    ],
  };
}
</script>

<style>
</style>
