<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select
          v-model="query.address"
          class="handler-select mr10"
          placeholder="地址"
        >
          <el-option key="1" label="浙江省" value="浙江省"> </el-option>
          <el-option key="2" label="上海市" value="上海市"> </el-option>
        </el-select>
        <el-input
          v-model="query.name"
          placeholder="用户名"
          class="handle-input mr10"
        />
        <el-button type="primary" :icon="Search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="primary" :icon="Plus">新增</el-button>
      </div>
      <!-- border 是否带有纵向边框
            header-cell-class-name	表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。 -->

      <el-table
        :data="tableData"
        border
        class="table"
        ref="mumltipleTable"
        header-cell-class-name="table-header"
      >
        <!-- label column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
             prop	字段名称 对应列内容的字段名， 也可以使用 property属性
             align	对齐方式 -->
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column label="账户余额">
          <!-- scope.row是table.json 一个{}中的数据 
               money只有数字 为了加上单位采用template -->
          <template #default="scope"> ${{ scope.row.money }} </template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <!--z-index	设置图片预览的 z-index
                preview-src-list	开启图片预览功能 
                preview-teleported	image-viewer 是否插入至 body 元素上。 嵌套的父元素属性会发生修改时应该将此属性设置为 true -->
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :z-index="10"
              :preview-src-list="[scope.row.thumb]"
              preview-teleported
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.state === '成功'
                  ? 'success'
                  : scope.row.state === '失败'
                  ? 'danger'
                  : ''
              "
              >{{ scope.row.state }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <!-- text 是否为文字按钮
                scope.$index index,从0开始 -->
            <el-button
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
              text
              v-permiss="15"
              >编辑</el-button
            >
            <el-button
              :icon="Delete"
              @click="handleDelete(scope.$index)"
              text
              type="danger"
              v-permiss="16"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- Pagination 分页 -->
      <!-- current-page	当前页数，支持 v-model 双向绑定
           page-size	每页显示条目个数，支持 v-model 双向绑定 -->
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="pageTotal"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog v-model="editVisible" title="编辑" width="30%">
      <el-form :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { reactive, ref } from "vue";
import { Delete, Edit, Search, Plus } from "@element-plus/icons-vue";
import { fetchData } from "../api";
import { ElMessage, ElMessageBox } from "element-plus";

interface TableItem {
  id: number;
  name: string;
  money: string;
  state: string;
  date: string;
  address: string;
}

const query = reactive({
  address: "",
  name: "",
  pageIndex: 1,
  pageSize: 10,
});

const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);

// 获取表格数据
const getData = () => {
  fetchData().then((res) => {
    tableData.value = res.data.list;
    pageTotal.value = res.data.pageTotal || 50;
  });
};
getData();

// 查询操作 ×
const handleSearch = () => {
  query.pageIndex = 1;
  getData();
};
// 分页导航 ×
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getData();
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
  name: "",
  address: "",
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;
  form.name = row.name;
  form.address = row.address;
  editVisible.value = true;
};

const handleDelete = (index: number) => {
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage.success("删除成功");
      tableData.value.splice(index, 1);
    })
    .catch(() => {
      ElMessage.error("删除失败");
    });
};

const saveEdit = () => {
  editVisible.value = false;
  ElMessage.success(`修改第${idx + 1}行成功`);
  tableData.value[idx].name = form.name;
  tableData.value[idx].address = form.address;
};
</script>

<style scpoed>
.handle-box {
  margin-bottom: 20px;
}
.handler-select {
  width: 120px;
}
.handle-input {
  width: 300px;
}
.mr10 {
  margin-right: 10px;
}
.table {
  width: 100%;
  font-size: 14px;
}

.el-button--danger.is-text {
  color: #ff0000;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
