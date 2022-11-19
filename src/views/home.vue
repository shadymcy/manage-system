<template>
  <v-header />
  <v-sidebar />
  <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
    <v-tags></v-tags>
    <div class="content">
      <!-- <router-view> 暴露了一个 v-slot API，
        主要使用 <transition> 和 <keep-alive> 组件来包裹你的路由组件。 -->

      <!-- <Transition>为单个元素或组件提供动画过渡效果。 -->
      <!-- <KeepAlive> 缓存包裹在其中的动态切换组件。     -->

      <!-- v-slot后接: 具名插槽 
        https://cn.vuejs.org/guide/components/slots.html#named-slots
           v-slot后接= 作用域插槽 
        https://cn.vuejs.org/guide/components/slots.html#scoped-slots -->
      <router-view v-slot="{ Component }">
        <!-- Component: VNodes, 传递给 <component>的is prop
        VNode的全称是VirtualNode,也就是虚拟节点;Vnode是一个类,
        可以生成不同类型的vnode实例,而不同类型的vnode表示不同类型的真实DOM元素。 -->
        <transition name="move" mode="out-in">
          <keep-alive :include="tags.nameList">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// <transition> interface TransitionProps {
//   /**
//    * 用于自动生成过渡 CSS class 名。
//    * 例如 `name: 'fade'` 将自动扩展为 `.fade-enter`、
//    * `.fade-enter-active` 等。
//    */
//   name?: string
//   /**
//    * 控制离开/进入过渡的时序。
//    * 默认情况下是同时的。
//    */
//   mode?: 'in-out' | 'out-in' | 'default'

// <keep-alive> interface KeepAliveProps {
//   /**
//    * 如果指定，则只有与 `include` 名称
//    * 匹配的组件才会被缓存。
//    */
//   include?: MatchPattern

import vHeader from "../components/header.vue";
import vSidebar from "../components/sidebar.vue";
import vTags from "../components/tags.vue";
import { useSidebarStore } from "../store/sidebar";
import { useTagsStore } from "../store/tags";
const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>

<style></style>
