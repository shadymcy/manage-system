<template>
  <div class="container">
    <div class="content-title">支持拖拽</div>
    <div class="plugins-tips">
      Element Plus自带上传组件。 访问地址：
      <a
        href="https://element-plus.org/zh-CN/component/upload.html"
        target="_blank"
        >Element Plus Upload</a
      >
    </div>
    <!-- on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 -->
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      @on-change="handle"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或 <em>点击上传d</em></div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 jpg/png 文件， 且不能超过500kb
        </div>
      </template>
    </el-upload>
    <div class="content-title">支持裁剪</div>
    <div class="plugins-tips">
      vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。 访问地址：
      <a href="https://github.com/Agontuk/vue-cropperjs" target="_blank"
        >vue-cropperjs</a
      >。 示例请查看
      <router-link to="/user">个人中心</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
const handle = (rawFile: any) => {
  console.log(rawFile);
};
</script>

<style scoped>
.content-title {
  /* font-weight CSS 属性指定了字体的粗细程度。 */
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
