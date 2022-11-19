<template>
  <div class="container">
    <div class="plugins-tips">
      wangEditor：轻量级 web 富文本编辑器，配置方便，使用简单。 访问地址：
      <a href="https://www.wangeditor.com/" target="_blank">wangEditor</a>
    </div>
    <!-- <div style="border: 1px solid #ccc"> -->
    <div class="mgb20" style="border: 1px solid #ccc" ref="editor">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 300px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <el-button type="primary" @click="syncHTML">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = "";
//   }, 1500);
// });

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const mode: string = "default";
const syncHTML = () => {
  const editor = editorRef.value;
  console.log(editor.getHtml());
};
</script>

<style></style>
