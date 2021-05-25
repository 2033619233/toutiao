<template>
  <div class="login">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="注册/登录"
      
    >
      <template #left>
        <van-icon name="cross" class="cross" />
      </template>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form
      @submit="onLogin"
      @failed="onFail"
      validate-first
      :show-error-message="false"
      ref="loginForm"
    >
      <van-field
        v-model="formData.mobile"
        placeholder="请输入手机号 "
        icon-prefix="iconfont"
        left-icon="icon-xinxi"
        :rules="formRules.mobile"
        name="mobile"
      />
      <van-field
        v-model="formData.code"
        type="password"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down :time="60 * 1000" format="ss s"  v-if='isCountDownShow' @finish="isCountDownShow=false"/>
          <van-button size="mini" round class="code" @click="onSendSms" v-else :loading="isSendSmsLoading">发送验证码</van-button>
        </template>
        </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit" class="form-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms} from "@/api/api";

export default {
  data() {
    return {
      formData: {
        mobile: "13611111111",
        code: "246810",
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[1|3|5|7|9]\d{9}$/, message: "该手机号格式不正确" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "该验证码格式不正确" },
        ],
      },
      isCountDownShow:false,
      isSendSmsLoading:false
    };
  },
  methods: {
    // 登录
    async onLogin() {
      // 加载动画
      const toast1 = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      // 发送请求
      const res = login({ ...this.formData })
        .then((res) => {
          console.log(res);
          this.$store.commit('setUser',res.data.data)
          this.$toast.success('登录成功')
          this.$router.back()
        }).catch((err) => {
          this.$toast.fail('登录失败，手机或验证码错误')
        });
    },
    // 自定义表单验证错误消息
    onFail(err) {
      this.$toast({
        message: err.errors[0].message,
        position: "top",
      });
    },
    // 发送短信
    async onSendSms() {
      try {
        const res = await this.$refs.loginForm.validate("mobile");
         this.isSendSmsLoading = true
        const data = await sendSms(this.formData.mobile);
        this.isSendSmsLoading = true
        console.log(data);
        if (data.status !== 200) this.$toast("获取失败");
        this.isCountDownShow = true
        this.$toast({
          message: "发送成功",
          position: "top",
        });
      } catch (err) {
        let message = "";
        if (err && err.name === "mobile") {
          message = err.message;
        } else if (err && err.response && err.response.status === 429) {
          message = "发送太频繁";
        } else {
          message = "发送失败";
        }
        this.$toast({
          message: message,
          position: "top",
        });
      }
      this.isSendSmsLoading = false
    },
  },
};
</script>

<style scoped lang="less">
@baseColor: #3296fa;

.login {
  background-color: #f5f7f9;
  height: 100%;
}
.code {
  background-color: #ededed;
  color: #666;
  padding: 6px;
}
.form-btn {
  background-color: @baseColor;
  border: none;
  color: #fff;
}
.cross {
  color: #fff;
  font-size: 15px;
}
</style>
