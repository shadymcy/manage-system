<template>
  <div class="container">
    <div class="plugins-tips">
      md-editor-v3：vue3版本的 markdown 编辑器，配置丰富，请详看文档。
      访问地址：
      <a href="https://imzbf.github.io/md-editor-v3/index" target="_blank"
        >md-editor-v3</a
      >
    </div>
    <!-- on-upload-img: 默认可以选择多张图片，支持截图粘贴板上传图片，支持复制网页图片粘贴上传。
        注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！请保存本地后再手动上传。 -->
    <md-editor v-model="text" class="mgb20" @on-upload-img="onUploadImg" />
    <el-button type="primary">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import axios from "axios";
const text = ref("Hello Editor!");
const onUploadImg = async (files: any, callback: any) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("file", file);

        axios
          .post("/api/img/upload", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );
  callback(res.map((item) => item.data.url));
};
</script>

<style></style>
