<template>
  <div class="header">
    <!-- 左侧折叠按钮 -->
    <div class="collapse-btn" @click="collapseChange">
      <el-icon v-if="sidebar.collapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-icon">
        <!-- 消息中心 -->
        <div class="btn-bell" @click="router.push('/tabs')">
          <!-- effect	Tooltip 主题,ontent	显示的内容,placement	Tooltip 组件出现的位置 -->
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <el-icon><Bell /></el-icon>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <el-avatar class="user-avator" :size="30" :src="imgurl" />
        <!-- 用户下拉菜单 -->
        <!-- command点击菜单项触发的事件回调 -->
        <el-dropdown class="user-name" trigger="click" @command="hanleCommand">
          <span class="el-dropdown-link">
            {{ username
            }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- _blank -- 在新窗口中打开链接  -->
              <a
                href="https://github.com/lin-xin/vue-manage-system"
                target="_blank"
              >
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <!-- command	派发到command回调函数的指令参数 -->
              <el-dropdown-item command="user"> 个人中心 </el-dropdown-item>
              <!-- divided	是否显示分隔符 -->
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useSidebarStore } from "../store/sidebar";
import imgurl from "../assets/img/img.jpg";
const sidebar = useSidebarStore();
const collapseChange = () => {
  sidebar.handleCollapse();
};

onMounted(() => {
  // 页面可见区域宽
  // document.body.clientWidth = 1463 开始是折叠 改成比1463小的数 一开始展开
  if (document.body.clientWidth < 1500) {
    collapseChange();
  }
});

const router = useRouter();
const hanleCommand = (command: string) => {
  if (command == "user") {
    router.push("/user");
  } else if (command == "loginout") {
    localStorage.removeItem("ms_username");
    router.push("/login");
  }
};
const username: string | null = localStorage.getItem("ms_username");
const message: number = 2;
</script>

<style scoped>
.header {
  position: relative;
  /* padding和border的值都算在content */
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  /* background-color 在assets中设置完成 */
}
.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: left;
  padding: 0 21px;
  /* 定义了鼠标指针放在一个元素边界范围内时所用的光标形状 */
  cursor: pointer;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-icon {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-bell {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  align-items: center;
}
.btn-bell-badge {
  position: absolute;
  right: 4px;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.user-avator {
  margin-left: 20px;
}
.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
