<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <div class="error-desc">啊哦~ 你访问的页面不存在哦</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
      <el-button type="primary" size="large" class="error-btn" @click="goBack"
        >返回上一页</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  // go函数允许你在历史中前进或后退，指定步数如果>0，代表前进；<0代表后退。
  router.back();
  // 等同于
  // router.go(-1);
};
</script>

<style scoped>
.error-page {
  display: flex;
  /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
      居中排列  */
  justify-content: center;
  /* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。 */
  align-items: center;
  /* flex-direction 属性规定灵活项目的方向。 */
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  /* box-sizing 属性定义如何计算一个元素的总宽度和总高度，主要设置是否需要加上内边距(padding)和边框等。
      border-box: 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。
      也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减 去(border + padding) 的值。
      大多数情况下，这使得我们更容易地设定一个元素的宽高。 */
  box-sizing: border-box;
}
.error-code {
  /* 设置以百分比计的行高 */
  line-height: 1;
  font-size: 250px;
  /* font-weight 属性设置文本的粗细 bolder定义更粗的字符。 */
  font-weight: bolder;
  color: #2d8cf0;
}
.error-code span {
  color: #bfa;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
.error-btn {
  margin-left: 100px;
}
</style>
