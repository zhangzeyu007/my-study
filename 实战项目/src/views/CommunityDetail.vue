<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-28 09:56:13
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 22:01:36
-->

<template>
  <div class="community-detail">
    <!-- 轮播组件 -->
    <div class="carousel">
      <my-swiper :imgWidth="screenWidth"></my-swiper>
      <p>
        <span>华夏银行建国支行</span><span class="right">建国北路21号</span>
      </p>
    </div>
    <div class="main">
      <div class="title">
        <span class="left">特色服务</span>
        <span class="right">优惠不停,惊喜不断</span>
      </div>
      <div class="detail">
        <div class="detail-left">
          <div class="top">
            <p>七夕有礼</p>
            <p>花积分兑换浪漫</p>
          </div>
          <div class="bottom">
            <img src="../../static/image/detail_1.png" alt="" />
          </div>
        </div>
        <div class="detail-right">
          <div class="top">
            <div class="item-left">
              <p>境外自由行</p>
              <p>精选路线9999元起</p>
            </div>
            <div class="item-right">
              <img src="../../static/image/detail_2.png" alt="" />
            </div>
          </div>
          <div class="bottom">
            <div class="item-left">
              <p>积分兑换</p>
              <p>生日当日兑换</p>
              <div class="left-img">
                <img src="../../static/image/detail_3.png" alt="" />
              </div>
            </div>
            <div class="item-right">
              <p>推荐办卡</p>
              <p>好礼送不停</p>
              <div class="right-img">
                <img src="../../static/image/detail_4.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">
        <span class="left">特约商户</span>
        <span class="right">让你的生活更精彩</span>
      </div>
      <!-- 商家 -->
      <div class="detail-business">
        <div class="business-left">
          <p>快递业务积分兑换</p>
          <div class="business-left-img">
            <img src="../../static/image/detail_5.png" alt="" />
          </div>
        </div>
        <div class="business-right">
          <p>华彩人生抢兑礼</p>
          <div class="business-right-img">
            <img src="../../static/image/detail_6.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MySwiper from "../components/mySwiper.vue";
export default {
  data() {
    return {
      screenWidth: 320,
    };
  },
  components: {
    MySwiper,
  },
  mounted() {
    // console.log(window.innerWidth);
    let that = this;
    window.addEventListener("resize", () => {
      that.screenWidth = Number(window.innerWidth);
    });
    that.screenWidth = Number(window.innerWidth);
  },
};
</script>

<style lang="less" scope>
.carousel {
  position: relative;
  width: 100%;
  height: 4.219409rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  > p {
    position: absolute;
    left: 10px;
    bottom: 10px;
    span {
      color: #fff;
      font-size: 0.304735rem;
    }
    .right {
      margin-left: 10px;
    }
  }
}
.main {
  .title {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #f7f7f7;
    box-sizing: border-box;
    .left {
      font-size: 0.351617rem;
      font-weight: 600;
      color: #d71218;
    }
    .right {
      font-size: 0.157853rem;
      margin-left: 10px;
    }
  }
  .detail {
    display: flex;
    height: 3.656247rem;
    border-bottom: 1px solid #f7f7f7;
    .detail-left {
      width: 2.812498rem;
      flex-shrink: 0;
      padding: 15px 0 0 5px;
      border-right: 1px solid #f7f7f7;
      box-sizing: border-box;
      .top p:nth-child(1) {
        color: #f968b5;
        font-size: 0.328125rem;
        font-weight: 600;
      }
      .top p:nth-child(2) {
        font-size: 0.257812rem;
        margin-top: 5px;
        color: #989898;
      }
      .bottom {
        margin-top: 30px;
        width: 2.343748rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .detail-right {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      .top {
        display: flex;
        padding: 15px 0 0 0;
        border-bottom: 1px solid #f7f7f7;
        box-sizing: border-box;
        .item-left p:nth-child(1) {
          font-size: 0.328125rem;
          font-weight: 800;
          color: #77c953;
        }
        .item-left p:nth-child(2) {
          padding-top: 5px;
          font-size: 0.257812rem;
          font-weight: 400;
          color: #989898;
          box-sizing: border-box;
        }
        .item-right {
          width: 1.874999rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .bottom {
        display: flex;
        .item-left {
          border-right: 1px solid #f7f7f7;
          p:nth-child(1) {
            padding-top: 10px;
            font-size: 0.328125rem;
            font-weight: 800;
            color: #555555;
          }
          p:nth-child(2) {
            padding-top: 5px;
            font-size: 0.257812rem;
            color: #989898;
            box-sizing: border-box;
          }
          .left-img {
            margin-top: 2px;
            width: 2.343748rem;
            height: 1rem;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .item-right {
          p:nth-child(1) {
            padding-top: 10px;
            font-size: 0.328125rem;
            font-weight: 800;
            color: #5a88de;
          }
          p:nth-child(2) {
            padding-top: 5px;
            font-size: 0.257812rem;
            color: #989898;
            box-sizing: border-box;
          }
        }
        .right-img {
          margin-top: 2px;
          width: 2.343748rem;
          height: 1rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .detail-business {
    display: flex;
    border: 1px solid #f7f7f7;
    .business-left {
      border-right: 1px solid #f7f7f7;
      flex: 1;
      p {
        padding: 10px;
        font-size: 0.28125rem;
        font-weight: 600;
        color: #2eded4;
        box-sizing: border-box;
      }
      .business-left-img {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .business-right {
      flex: 1;
      p {
        padding: 10px;
        color: #77c953;
        font-weight: 600;
        font-size: 0.28125rem;
        box-sizing: border-box;
      }
      .business-right-img {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
