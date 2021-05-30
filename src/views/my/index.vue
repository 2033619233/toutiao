<template>
  <div class="my">
    <!-- 上面半部分，蓝色背景的 -->
    <div class="user-info">
      <!-- 用户已登录 -->
      <div v-if="user">
        <div class="base-info">
          <van-cell center>
            <template #icon>
              <van-image
                width="66"
                height="66"
                round
                src="currentUser.photo"
                class="avatar"
              />
            </template>
            <template #title>
              <div class="user-name">{{currentUser.name}}</div>
            </template>
            <template #right-icon>
              <van-button type="default" round>编辑资料</van-button>
            </template>
          </van-cell>
        </div>
        <div class="data-info">
          <van-grid :border="false">
            <van-grid-item>
              <template #text>
                <div class="number">{{currentUser.art_count}}</div>
                <div class="text">头条</div>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template #text>
                <div class="number">{{currentUser.follow_count}}</div>
                <div class="text">关注</div>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template #text>
                <div class="number">{{currentUser.fans_count}}</div>
                <div class="text">粉丝</div>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template #text>
                <div class="number">{{currentUser. like_count}}</div>
                <div class="text">获赞</div>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <!-- 用户未登录 -->
      <div class="no-login" v-else>
        <div @click="login">
          <img src="@/assets/img/nologin.png" alt="未登录" />
        </div>
        <span @click="login">
          点击登录
        </span>
      </div>
    </div>

    <!-- 下面的 包括收藏，历史，退出登录等-->
    <van-grid column-num="2" class="nav-grid mb-bg">
      <van-grid-item class="nav-grid-item">
        <template #text>
          <van-icon name="star-o" class="icon icon-star-o" />
          <div class="text">收藏</div>
        </template>
      </van-grid-item>
      <van-grid-item class="nav-grid-item">
        <template #text>
          <van-icon name="clock-o" class="icon icon-clock-o" />
          <div class="text">历史</div>
        </template>
      </van-grid-item>
    </van-grid>
    <!--  -->
    <van-cell-group class="mb-bg">
      <van-cell title="消息通知" is-link to="/" />
      <van-cell title="小智同学" is-link to="/" />
    </van-cell-group>
    <van-cell
      value="退出登录"
      class="logout-cell"
      @click="onLogout"
      v-if="user"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Dialog } from "vant";
import { getCurrentUser } from "@/api/api";
export default {
  data() {
    return {
      isLogin: true,
      currentUser:{}
    };
  },
async created(){
 const res = await getCurrentUser()
 this.currentUser = res.data.data
},
  methods: {
    login() {
      this.$router.push("login");
    },
    onLogout() {
      Dialog.confirm({
        // title: '退出登陆',
        message: "是否退出登陆",
      })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style scoped lang="less">
.my {
  background-color: #ededed;
  .user-info {
    height: 182px;
    background: url("../../assets/img/banner.png") no-repeat;
    box-sizing: border-box;
    padding: 40px 20px 0 20px;
    .base-info {
      .van-cell {
        background-color: unset;
        height: 66px;
        padding: 0;
        .van-image {
          margin-right: 20px;
          border: 1px solid #fff;
          box-sizing: border-box;
        }
        .user-name {
          color: #fff;
          font-size: 15px;
        }
        .van-button {
          height: 22px;
          padding: 5px 3px;
          font-size: 12px;
        }
      }
    }
    .data-info {
      height: 65px;
      /deep/ .van-grid-item__content {
        background-color: unset;
        color: #fff;
        font-size: 15px;
        padding-top: 20px;
        .number {
          margin-bottom: 5px;
        }
      }
    }
    .no-login {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 66px;
        height: 66px;
      }
      span {
        color: #ffff;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  .nav-grid {
    .nav-grid-item {
      height: 80px;
      .icon-star-o {
        color: red;
      }
      .icon-clock-o {
        color: rgb(255, 160, 35);
      }
      .icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
  .logout-cell {
    /deep/.van-cell__value {
      text-align: center;
      color: #323233;
      font-size: 14px;
    }
  }
  .mb-bg {
    margin-bottom: 8px;
  }
}
</style>
