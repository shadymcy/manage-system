<template>
  <div class="container">
    <div class="plugins-tips">
      通过 v-permiss 自定义指令实现权限管理，使用非 admin 账号登录，可查看效果。
    </div>
    <div class="mgb20">
      <span class="label">角色：</span>
      <!-- change	选中值发生变化时触发 -->
      <el-select v-model="role" @change="handleChange">
        <el-option label="超级管理员" value="admin"></el-option>
        <el-option label="普通用户" value="user"></el-option>
      </el-select>
    </div>
    <div class="mgb20 tree-wrapper">
      <!-- data 展示数据
        node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
        default-expand-all 是否默认展开所有节点 默认false
        show-checkbox 节点是否可被选择
        default-checked-keys 默认勾选的节点的 key 的数组 -->
      <el-tree
        ref="tree"
        :data="data"
        node-key="id"
        default-expand-all
        show-checkbox
        :default-checked-keys="checkedKeys"
      />
    </div>
    <el-button type="primary" @click="onSubmit">保存权限</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElTree } from "element-plus";
import { ref } from "vue";
import { usePermissStore } from "../store/permiss";

const role = ref<string>("admin");
// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const permiss = usePermissStore();

// setCheckedKeys	设置目前选中的节点，使用此方法必须设置 node-key 属性
// (keys, leafOnly) 接收两个参数: 1. 一个需要被选中的多节点 key 的数组 2. 一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。
const handleChange = (val: string[]) => {
  // !    非空断言操作符: 排除 null 和 undefined
  tree.value!.setCheckedKeys(permiss.defaultList[role.value]);
};
interface Tree {
  id: string;
  label: string;
  // ?表示一个可选参数
  children?: Tree[];
}
const data: Tree[] = [
  {
    id: "1",
    label: "系统首页",
  },
  {
    id: "2",
    label: "基础表格",
    children: [
      {
        id: "15",
        label: "编辑",
      },
      {
        id: "16",
        label: "删除",
      },
    ],
  },
  {
    id: "3",
    label: "tab选项卡",
  },
  {
    id: "4",
    label: "表单相关",
    children: [
      {
        id: "5",
        label: "基本表单",
      },
      {
        id: "6",
        label: "文件上传",
      },
      {
        id: "7",
        label: "三级菜单",
        children: [
          {
            id: "8",
            label: "富文本编辑器",
          },
          {
            id: "9",
            label: "markdown编辑器",
          },
        ],
      },
    ],
  },
  {
    id: "10",
    label: "自定义图标",
  },
  {
    id: "11",
    label: "schart图表",
  },

  {
    id: "13",
    label: "权限管理",
  },
  {
    id: "14",
    label: "支持作者",
  },
];
// 获取当前权限
const checkedKeys = ref<string[]>([]);
const getPremission = () => {
  // 请求接口返回权限
  checkedKeys.value = permiss.defaultList[role.value];
};
getPremission();

const onSubmit = () => {
  // 获取选中的权限
  // getCheckedKeys	若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组
  // (leafOnly) 接收一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。
  console.log(tree.value!.getCheckedKeys(false));
};
</script>

<style scoped>
.label {
  font-size: 14px;
}
.tree-wrapper {
  /* max-width属性设置元素的最大宽度。 */
  max-width: 500px;
}
</style>
