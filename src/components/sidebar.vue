<template>
  <div class="sidebar">
    <!-- default-active 页面加载时默认激活菜单的 index -->
    <!-- router 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项 -->
    <!-- unique-opened	是否只保持一个子菜单的展开 -->
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      router
      unique-opened
    >
      <template v-for="item in items">
        <!-- 如果有下级菜单 -->
        <template v-if="item.subs">
          <!-- key最常见的用例是与 v-for 结合： -->
          <el-sub-menu
            :index="item.index"
            :key="item.index"
            v-permiss="item.permiss"
          >
            <template #title>
              <el-icon>
                <!-- 在<component>里面使用 :is，可以实现动态组件的效果。 -->
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>

            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
                v-permiss="subItem.permiss"
              >
                <template #title>
                  {{ subItem.title }}
                </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                v-permiss="subItem.permiss"
              >
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
            v-permiss="item.permiss"
          >
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <!-- <span>{{ item.title }}</span> 没有hover显示标签的效果-->
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSidebarStore } from "../store/sidebar";

const route = useRoute();
const onRoutes = computed(() => {
  return route.path;
});
const sidebar = useSidebarStore();
const items = [
  {
    icon: "Odometer",
    index: "/dashboard",
    title: "系统首页",
    permiss: "1",
  },
  {
    icon: "Calendar",
    index: "/table",
    title: "基础表格",
    permiss: "2",
  },
  {
    icon: "DocumentCopy",
    index: "/tabs",
    title: "tab选项卡",
    permiss: "3",
  },
  {
    icon: "Edit",
    index: "3",
    title: "表单相关",
    permiss: "4",
    subs: [
      {
        index: "/form",
        title: "基本表单",
        permiss: "5",
      },
      {
        index: "/upload",
        title: "文件上传",
        permiss: "6",
      },
      {
        index: "4",
        title: "三级菜单",
        permiss: "7",
        subs: [
          {
            index: "/editor",
            title: "富文本编辑器",
            permiss: "8",
          },
          {
            index: "/markdown",
            title: "markdown编辑器",
            permiss: "9",
          },
        ],
      },
    ],
  },
  {
    icon: "Setting",
    index: "/icon",
    title: "自定义图标",
    permiss: "10",
  },
  {
    icon: "PieChart",
    index: "/charts",
    title: "schart图表",
    permiss: "11",
  },
  {
    icon: "Warning",
    index: "/permission",
    title: "权限管理",
    permiss: "13",
  },
  {
    icon: "CoffeeCup",
    index: "/donate",
    title: "支持作者",
    permiss: "14",
  },
];
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
/* ::-webkit-scrollbar 滚动条整体部分 */
.sidebar::-webkit-scrollbar {
  width: 0;
}
/* 当菜单收缩时element会给菜单添加el-menu--collapse类 */
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
