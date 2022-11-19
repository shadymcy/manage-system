<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- shadow	设置阴影显示时机 -->
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>基础信息</span>
            </div>
          </template>
          <div class="info">
            <div class="info-image" @click="showDialog">
              <el-avatar :size="100" :src="avatarImg" />
              <span class="info-edit">
                <i class="el-icon-lx-camerafill"></i>
              </span>
            </div>
            <div class="info-name">{{ name }}</div>
            <div class="info-desc">不可能！我的代码怎么会有bug！</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>账户编辑</span>
            </div>
          </template>
          <!-- label-width	标签的长度，例如 '50px'。 
            作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 -->
          <el-form label-width="90px">
            <el-form-item label="用户名：">{{ name }}</el-form-item>
            <el-form-item label="旧密码：">
              <el-input type="password" v-model="form.old"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
              <el-input type="password" v-model="form.new"></el-input>
            </el-form-item>
            <el-form-item label="个人简介：">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="裁剪图片" width="600px">
      <!-- <template #header>

      </template> -->
      <!-- ready 渲染前（图片已经被加载、cropper实例已经准备完毕）的准备工作事件
          zoom 裁剪框缩放事件
          cropstart、cropmove、cropend、crop 开始画裁剪框（或画布）、
          画裁剪框（或画布）的中途、裁剪框（或画布）画完、进行裁剪事件 
          event.detail.originalEvent、event.detail.action -->
      <vue-cropper
        ref="cropper"
        :src="imgSrc"
        :ready="cropImage"
        :zoom="cropImage"
        :cropmove="cropImage"
        style="width: 100%; height: 400px"
      ></vue-cropper>

      <template #footer>
        <span class="dialog-footer">
          <el-button class="crop-demo-btn"
            >选择图片
            <!-- name属性规定 input 元素的名称。name属性用于对提交到服务器后的表单数据进行标识，
              或者在客户端通过 JavaScript 引用表单数据。
              accept属性是用来限制上传的文件格式 accept="image/*"上传图片格式
              change	仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 -->
            <input
              type="file"
              class="crop-input"
              name="image"
              accept="image/*"
              @change="setImage"
            />
          </el-button>
          <el-button type="primary" @click="saveAvatar">
            上传图片并保存
          </el-button>
        </span>
      </template></el-dialog
    >
  </div>
</template>

<script setup lang="ts">
import VueCropper from "vue-cropperjs";
import { reactive, ref } from "vue";
import "cropperjs/dist/cropper.css";
import avatar from "../assets/img/img.jpg";

const dialogVisible = ref(false);
const avatarImg = ref(avatar);
const imgSrc = ref("");
const name = localStorage.getItem("ms_username");
const form = reactive({
  old: "",
  new: "",
  desc: "不可能！我的代码怎么可能会有bug！",
});
const showDialog = () => {
  dialogVisible.value = true;
  imgSrc.value = avatarImg.value;
};
const onSubmit = () => {};

const cropImg = ref("");
const cropper: any = ref();
const setImage = (e: any) => {
  const file = e.target.files[0];
  // console.log(file);
  // File {name: '8531093.jpg', lastModified: 1622802607346, lastModifiedDate: Fri Jun 04 2021 18:30:07 GMT+0800 (中国标准时间), webkitRelativePath: '', size: 184120, …}
  // lastModified
  // :
  // 1622802607346
  // lastModifiedDate
  // :
  // Fri Jun 04 2021 18:30:07 GMT+0800 (中国标准时间) {}
  // name
  // :
  // "8531093.jpg"
  // size
  // :
  // 184120
  // type
  // :
  // "image/jpeg"
  // webkitRelativePath
  // :
  // ""
  if (!file.type.includes("image/")) {
    return;
  }
  // FileReader 接口提供了读取文件的方法和包含读取结果的事件模型。(https://www.cnblogs.com/7c89/p/16029933.html)
  const reader = new FileReader();
  reader.onload = (event: any) => {
    // console.log("event.target.result", event.target.result);
    // event.target.result data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/2wBDAAoHCAkIBgoJCAkMCwoMDxoRDw4ODx8WGBMaJSEnJiQhJCMpLjsyKSw4LCMkM0Y0OD0/QkNCKDFITUhATTtBQj//2wBDAQsMDA8NDx4RER4/KiQqPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz//wgARCAQ4B4ADAREAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAECAwQFBgf/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/2gA
    dialogVisible.value = true;
    imgSrc.value = event.target.result;
    cropper.value && cropper.value.replace(event.target.result);
  };
  // readAsDataURL: 方法可以将读取到的文件编码成DataURL ，
  // 可以将资料(例如图片、excel文件)内嵌在网页之中，不用放到外部文件
  reader.readAsDataURL(file);
};
const cropImage = () => {
  cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
};
const saveAvatar = () => {
  avatarImg.value = cropImg.value;
  dialogVisible.value = false;
};
</script>
<style scoped>
.info {
  text-align: center;
  padding: 35px 0;
}
.info-image {
  position: relative;
  margin: auto;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}
.info-edit {
  display: flex;
  justify-content: center;
  /* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。 */
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.info-edit i {
  color: #eee;
  font-size: 25px;
}
.info-image:hover .info-edit {
  opacity: 1;
}
.info-name {
  margin: 15px 0 10px;
  font-size: 24px;
  /* font-weight 属性设置文本的粗细 */
  font-weight: 500;
  color: #262626;
}
.crop-demo-btn {
  position: relative;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
