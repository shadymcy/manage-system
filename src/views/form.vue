<template>
  <div class="container">
    <div class="form-box">
      <!-- model 表单数据对象
            rules 表单验证规则 -->
      <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
        <!-- prop	model 的键名 -->
        <el-form-item label="表单名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="选择器" prop="region">
          <el-select v-model="form.region" placeholder="请选择">
            <!-- label	选项的标签，若不设置则默认与value相同
                value-key	作为 value 唯一标识的键名  -->
            <el-option key="bbk" label="步步高" value="bbk"></el-option>
            <el-option key="xtc" label="小天才" value="xtc"></el-option>
            <el-option key="imoo" label="imoo" value="imoo"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2"> - </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              placeholder="选择时间"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="城市级联" prop="options">
          <el-cascader
            v-model="form.options"
            :options="options"
            placeholder="选择城市"
          />
        </el-form-item>
        <el-form-item label="选择开关" prop="delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="多选框" prop="type">
          <!-- name	原生 name 属性 -->
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="步步高" name="type" />
            <el-checkbox label="小天才" name="type" />
            <el-checkbox label="imoo" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="步步高"></el-radio>
            <el-radio label="小天才"></el-radio>
            <el-radio label="imoo"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本框" prop="desc">
          <el-input
            v-model="form.desc"
            rows="5"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)"
            >表单提交</el-button
          >
          <el-button @click="onReset(formRef)">重置表单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// import { ElFormItem, FormInstance, FormRules } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
const formRef = ref<FormInstance>();
const rules: FormRules = {
  name: [{ required: true, message: "请输入表单名称", trigger: "blur" }],
};

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: true,
  type: ["步步高"],
  resource: "小天才",
  desc: "",
  options: [],
});
const options = [
  {
    value: "zhejjiang",
    label: "浙江省",
    children: [
      {
        value: "jiaxing",
        label: "嘉兴市",
        children: [
          {
            value: "nanhu",
            label: "南湖区",
          },
          {
            value: "xiuzhou",
            label: "秀洲区",
          },
        ],
      },
      {
        value: "hangzhou",
        label: "杭州市",
        children: [
          {
            value: "xihu",
            label: "西湖区",
          },
          {
            value: "shangcheng",
            label: "上城区",
          },
        ],
      },
    ],
  },
  {
    value: "shanghai",
    label: "上海市",
    children: [
      {
        value: "baoshan",
        label: "宝山区",
        children: [
          {
            value: "dachang",
            label: "大场镇",
          },
        ],
      },
    ],
  },
];
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      ElMessage.success("提交成功！");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
