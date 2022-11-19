<template>
  <div class="tags" v-if="tags.show">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tags.list"
        :key="index"
        :class="{ active: isActive(item.path) }"
      >
        <router-link :to="item.path" class="tags-li-title">
          {{ item.title }}
        </router-link>
        <el-icon @click="closeTags(index)"><Close /></el-icon>
      </li>
    </ul>
    <div class="tags-close-box">
      <!-- command	点击菜单项触发的事件回调 -->
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useTagsStore } from "../store/tags";
// route是路由信息对象，每一个路由都会有一个route对象，是一个局部对象，它里面主要包含当前路由的一些基本信息，比如：name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等。
// router是VueRouter的实例，这个对象中是一个全局对象，他包含了所有的路由包含了许多关键的对象和属性
const route = useRoute();
const router = useRouter();
const tags = useTagsStore();

const isActive = (path: string) => {
  /**
   * The whole location including the `search` and `hash`. This string is
   * percentage encoded.整個位置，包括“搜索”和“哈希”。 這個字符串是百分比編碼的。
   */
  // fullPath: string;
  return path === route.fullPath;
};
const closeTags = (index: number) => {
  const delItem = tags.list[index];
  tags.delTagsItem(index);
  const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
  if (item) {
    //  a && b ,如果 a 为true，直接返回b，而不管b为true或者false 。如果 a 为false 那么直接返回a
    delItem.path === route.fullPath && router.push(item.path);
  } else {
    router.push("/");
  }
};
const closeOther = () => {
  const cur = tags.list.filter((item) => {
    return item.path === route.fullPath;
  });
  tags.closeTagsOther(cur);
};
const closeAll = () => {
  tags.clearTags();
  router.push("/");
};
const handleTags = (command: string) => {
  command === "other" ? closeOther() : closeAll();
};
// 设置标签
const setTags = (route: any) => {
  // some()判断数组中是否有满足条件的元素  第一个参数:item,必须,当前元素的值
  const isExist = tags.list.some((item) => {
    return item.path === route.fullPath;
  });
  if (!isExist) {
    // 标题栏最多8个元素
    if (tags.list.length >= 8) tags.delTagsItem(0);
    tags.setTagsItem({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath,
    });
  }
};
setTags(route);
// beforeRouteUpdate(to, from) {
// 在当前路由改变，但是该组件被复用时调用
onBeforeRouteUpdate((to) => {
  setTags(to);
});
</script>

<style>
.tags {
  position: relative;
  height: 30px;
  /* 内容会被修剪，并且其余内容是不可见的。 */
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
  /* 必需的。水平阴影的位置。允许负值 必需的。垂直阴影的位置。允许负值 	可选。模糊距离*/
}

.tags ul {
  /* padding和border的值都算在content */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.tags-li {
  display: flex;
  align-items: center;
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  /* 定义了鼠标指针放在一个元素边界范围内时所用的光标形状 */
  cursor: pointer;
  height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  /* Color属性指定文本的颜色。 */
  color: #666;
  /* 浏览器支持:https://www.runoob.com/cssref/css3-pr-transition-delay.html
  表格中的数字表示支持该属性的第一个浏览器版本号。
  紧跟在 -webkit-, -ms- 或 -moz- 前的数字为支持该前缀属性的第一个浏览器版本号。 
  举例：transition-delay: 2s;
        -webkit-transition-delay: 2s; /* Safari */

  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  /* 指定CSS属性的name，transition效果,all:所有属性都将获得过渡效果;
  transition效果需要指定多少秒或毫秒才能完成;
  指定transition效果的转速曲线,ease-in:规定以慢速开始的过渡效果 */
  transition: all 0.3s ease-in;
}
/* .tags-li.active在assets中 */
/* .tags-li.active {
    border: 1px solid #409EFF;
    background-color: #409EFF;
} */
.tags-li:not(.active):hover {
  /* 在白色tags上悬浮变色 */
  background: #f8f8f8;
}
.tags-li.active {
  color: #fff;
}
.tags-li-title {
  float: left;
  /* max-width属性设置元素的最大宽度。注意： max-width属性不包括填充，边框，或页边距！ */
  max-width: 80px;
  overflow: hidden;
  /* 规定段落中的文本不进行换行 nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
  white-space: nowrap;
  /* text-overflow 需要配合以下两个属性使用： overflow white-space
  ellipsis: 显示省略符号 ... 来代表被修剪的文本。 */
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}
.tags-li.active .tags-li-title {
  color: #fff;
}
.tags-close-box {
  position: absolute;
  /* 把box的右边缘设置在其包含元素右边缘向左 x 像素的位置 */
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  /* 向 div 元素添加阴影:水平阴影的位置,垂直阴影的位置,模糊距离,阴影的大小,阴影的颜色 */
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
