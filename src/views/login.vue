<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <!-- prop表单数据对象的键名。 -->
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <!-- #:v-slot缩写 v-slot需要放置在template中 -->
              <!-- Input 插槽：prepend输入框前置内容 -->
              <el-button :icon="User"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="param.password"
            placeholder="password"
            @keyup.enter="submitForm(login)"
          >
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
// script-setup 的推出是为了让熟悉 3.0 的用户可以更高效率的开发组件，只需要给 script 标签添加一个 setup 属性，那么整个 script 就直接会变成 setup 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 return 了）。
// setup: 避免interface报错
// https://blog.csdn.net/s_y_w123/article/details/112344819?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112344819-blog-81237779.t0_edu_mix&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-112344819-blog-81237779.t0_edu_mix&utm_relevant_index=1
// TypeScript的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。

import { reactive, ref } from "vue";
import { useTagsStore } from "../store/tags";
import { usePermissStore } from "../store/permiss";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
// 图标按钮
import { Lock, User } from "@element-plus/icons-vue";

// 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
interface LoginInfo {
  username: string;
  password: string;
}
const permiss = usePermissStore();
const router = useRouter();
// function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
// target 的类型是泛型 $T$, 而 $T$ 类型是 extends object, 简单来说target类型是object类型或继承自object类的子类类型
const param = reactive<LoginInfo>({
  username: "admin",
  password: "123456",
});
// element-ui
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "请输入用户名",
      // blur失去焦点
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const login = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success("恭喜，登陆成功");
      localStorage.setItem("ms_username", param.username);
      const keys =
        permiss.defaultList[param.username == "admin" ? "admin" : "user"];
      permiss.handleSet(keys);
      localStorage.setItem("ms_keys", JSON.stringify(keys));
      router.push("/");
    } else {
      ElMessage.error("登陆失败");
      return false;
    }
  });
};
// element-ui

const tag = useTagsStore();
// 清除所有tag
// tag.clearTags();
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-title {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
