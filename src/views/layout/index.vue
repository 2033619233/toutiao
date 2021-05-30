<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/" active-color="#3296fa">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">未登录</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      // 激活的导航栏
      active: 2,
    };
  },
};
</script>

<style></style>
