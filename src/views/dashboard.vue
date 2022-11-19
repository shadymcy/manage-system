<template>
  <div>
    <!-- gutter	栅格间隔 -->
    <!-- span	栅格占据的列数 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 通过 shadow 属性设置卡片阴影出现的时机。 该属性的值可以是：always、hover 或 never。 -->
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <el-avatar :size="120" :src="imgurl"></el-avatar>
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2022-10-27</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>上海</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height: 252px">
          <!-- 没有#header 横线上面的语言详情不显示 -->
          <template #header>
            <div class="clearfix">
              <span>语言详情</span>
            </div>
          </template>
          Vue
          <el-progress :percentage="71.3" color="#42b983" />
          JavaScript
          <el-progress :percentage="24.1" color="#f1e05a" />
          CSS
          <el-progress :percentage="13.7" color="#f56c6c" />
          HTML
          <el-progress :percentage="5.9" />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <el-icon class="grid-con-icon"><User /></el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <el-icon class="grid-con-icon"><ChatLineRound /></el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">99</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <el-icon class="grid-con-icon"><Goods /></el-icon>
                <div class="grid-cont-right">
                  <div class="grid-num">1208</div>
                  <div>商品数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height: 403px">
          <template #header>
            <div class="clearfix">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" text
                >添加</el-button
              >
            </div>
          </template>
          <!-- show-header	是否显示表头 -->
          <el-table :show-header="false" :data="todoList" style="width: 100%">
            <el-table-column width="40">
              <!-- #default=“scope“ (Element UI) 传值 -->
              <template #default="scope">
                <div>
                  <el-checkbox v-model="scope.row.status"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <!-- <div v-bind:class="{ active: isActive }"></div> ;
               //这里我们使用isActive 这个变量动态判断active是否显示到html -->
              <template #default="scope">
                <div
                  class="todo-item"
                  :class="{ 'todo-item-del': scope.row.status }"
                >
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="bar"
            class="schart"
            canvasId="bar"
            :options="options"
          ></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <!-- canvasId 画布元素id -->
          <schart
            ref="line"
            class="schart"
            canvasId="line"
            :options="options2"
          ></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Schart from "vue-schart";
import imgurl from "../assets/img/img.jpg";
const name = localStorage.getItem("ms_username");
const role: string = name === "admin" ? "超级管理员" : "普通用户";

const options = {
  type: "bar",
  title: {
    text: "最近一周各品类销售图",
  },
  xRorate: 25,
  labels: ["周一", "周二", "周三", "周四", "周五"],
  datasets: [
    {
      label: "家电",
      data: [234, 278, 270, 190, 230],
    },
    {
      label: "百货",
      data: [164, 178, 190, 135, 160],
    },
    {
      label: "食品",
      data: [144, 198, 150, 235, 120],
    },
  ],
};
const options2 = {
  type: "line",
  title: {
    text: "最近几个月各品类销售趋势图",
  },
  labels: ["6月", "7月", "8月", "9月", "10月"],
  datasets: [
    {
      label: "家电",
      data: [234, 278, 270, 190, 230],
    },
    {
      label: "百货",
      data: [164, 178, 150, 135, 160],
    },
    {
      label: "食品",
      data: [74, 118, 200, 235, 90],
    },
  ],
};
const todoList = reactive([
  {
    title: "今天要修复100个bug",
    status: false,
  },
  {
    title: "今天要修复100个bug",
    status: false,
  },
  {
    title: "今天要写100行代码加几个bug吧",
    status: false,
  },
  {
    title: "今天要修复100个bug",
    status: false,
  },
  {
    title: "今天要修复100个bug",
    status: true,
  },
  {
    title: "今天要写100行代码加几个bug吧",
    status: true,
  },
]);
</script>

<style scoped>
/* 后代选择器 (空格)
子选择器 (>)
相邻兄弟选择器 (+)
通用兄弟选择器 (~) */
.el-row {
  margin-bottom: 20px;
}
.mgb20 {
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
/* flex：1即为flex-grow：1，经常用作自适应布局，将父容器的display：flex，
侧边栏大小固定后，将内容区flex：1，内容区则会自动放大占满剩余空间。 */
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}
/* 既满足是div元素,又满足是父级元素的“第一个孩子” */
.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 70px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-con-icon {
  /* 图标大小 */
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-num {
  font-size: 30px;
  /* 加粗 */
  font-weight: bold;
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
}
.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.todo-item {
  font-size: 14px;
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.schart {
  width: 100%;
  height: 300px;
}
</style>
