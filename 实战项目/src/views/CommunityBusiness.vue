<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-28 17:33:27
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 14:54:28
-->

<template>
  <div class="community-business">
    <div class="contanier">
      <div class="business-header">
        <div class="select-filter">
          <div
            :class="['select-bank', acitveIndex == 0 ? 'active' : '']"
            @click="sortBankClick"
          >
            {{ bankName }}
          </div>
          <div
            :class="['select-sort', acitveIndex == 1 ? 'active' : '']"
            @click="sortTypeClick"
          >
            {{ typeName }}
          </div>
        </div>
        <!-- 银行下拉列表 -->
        <div class="sort" v-show="sortBankState">
          <div class="sort-list" v-for="item of sortBankList" :key="item.id">
            <div class="list-item" @click="selectBank(item.id, item.name)">
              <input
                v-model="radioBankSelect"
                type="radio"
                :value="item.id"
                checked
              />
              {{ item.name }}
            </div>
          </div>
          <div class="list-item" @click="cancelSort(0)">取消筛选</div>
        </div>
        <!-- 分类下拉列表 -->
        <div class="sort" v-show="sortTypeState">
          <div
            class="sort-list"
            v-for="(item, index) of sortTypeList"
            :key="index"
          >
            <div class="list-item" @click="selectType(item.id, item.name)">
              <input
                v-model="radioTypeSelect"
                type="radio"
                :value="item.id"
                checked
              />
              {{ item.name }}
            </div>
          </div>
          <div class="list-item" @click="cancelSort(1)">取消筛选</div>
        </div>
        <!-- 下拉组件 -->
      </div>
      <!-- 内容 -->
      <div class="main">
        <div class="main-container">
          <!-- 下拉刷新组件 -->
          <common-scroll
            class="common-scroll"
            :data="dataList"
            :probe-type="2"
            :pullup="true"
            :pulldown="true"
            @pulldown="pulldown"
            @scrollToEnd="scrollToEnd"
          >
            <div class="main-list">
              <template>
                <div class="showLoad" v-show="showLoad">
                  <img class="icon-load" src="../assets/Load.gif" alt="" />
                </div>
              </template>
              <div
                class="main-item"
                v-for="(item, index) in sortData"
                :key="index"
              >
                <div class="item-left">
                  <img :src="item.imgUrl" />
                </div>
                <div class="item-right">
                  <p>{{ item.title }}</p>
                  <p>{{ item.detail }}</p>
                  <p>{{ item.name }}</p>
                  <p>{{ item.address }}</p>
                </div>
              </div>
            </div>
          </common-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonScroll from "../components/commonScroll";
export default {
  components: {
    CommonScroll,
  },
  data() {
    return {
      acitveIndex: 0,
      sortBankState: false,
      sortTypeState: false,
      showLoad: false,
      radioBankSelect: 0,
      radioTypeSelect: 0,
      bankName: "选择支行",
      typeName: "分类",
      bankKey: "",
      typeKey: "",
      dataList: [
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "普通洗车",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "1-a",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "支行工作",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "1-b",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "基金理财",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "2-a",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "基金公司",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "1-c",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "股票代码",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "2-b",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "支付业务",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "3-a",
        },
      ],
      addData: [
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "支付业务",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "1-a",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "股票",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "1-b",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "股票服务",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "2-b",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "股票资讯",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "2-a",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "股票新闻资讯",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "2-3",
        },
        {
          imgUrl: require("../../static/image/business_1.png"),
          title: "股票新闻资讯导师",
          detail:
            "到店选择普通洗车服务，即可享受精洗服务，仅限 7座及以下车型。",
          name: "小拇指洗车",
          address: "地址：文一西路969号阿里巴巴西溪园区",
          sort: "2-2",
        },
      ],
      sortBankList: [
        {
          id: "1",
          name: "光大银行",
        },
        {
          id: "2",
          name: "广发银行",
        },
        {
          id: "3",
          name: "浦发银行",
        },
      ],
      sortTypeList: [
        {
          id: "a",
          name: "基金",
        },
        {
          id: "b",
          name: "理财",
        },
        {
          id: "c",
          name: "股票",
        },
      ],
    };
  },
  computed: {
    sortData() {
      let search = `${this.bankKey}-${this.typeKey}`;
      if (this.bankKey && this.typeKey) {
        console.log(this.dataList);
        return this.dataList.filter((data) => {
          return String(data.sort).toLowerCase().indexOf(search) > -1;
        });
      } else {
        return this.dataList;
      }
    },
  },
  methods: {
    sortBankClick() {
      this.acitveIndex = 0;
      this.sortTypeState = false;
      if (this.sortBankState) {
        this.sortBankState = false;
      } else {
        this.sortBankState = true;
      }
    },
    sortTypeClick() {
      this.acitveIndex = 1;
      this.sortBankState = false;
      if (this.sortTypeState) {
        this.sortTypeState = false;
      } else {
        this.sortTypeState = true;
      }
    },
    //下拉刷新
    pulldown() {
      this.showLoad = true;
      setTimeout(() => {
        this.showLoad = false;
      }, 1000);
      console.log("下拉刷新");
      this.dataList = [];
      this.dataList = this.dataList.concat(this.addData);
    },
    // 上拉加载
    scrollToEnd() {
      console.log("上拉");
      // this.dataList = this.dataList.concat(this.addData);
    },
    // 选择银行
    selectBank(id, name) {
      this.radioBankSelect = id;
      this.bankKey = id;
      this.bankName = name;
      this.sortBankState = false;
    },
    // 选择分类
    selectType(id, name) {
      this.radioTypeSelect = id;
      this.typeKey = id;
      this.typeName = name;
      this.sortTypeState = false;
    },
    // 取消筛选
    cancelSort(type) {
      if (type == 0) {
        this.sortBankState = false;
        this.bankName = "选择支行";
        this.radioBankSelect = 0;
        this.bankKey = "";
      }
      if (type == 1) {
        this.sortTypeState = false;
        this.typeName = "分类";
        this.radioTypeSelect = 0;
        this.typeKey = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.contanier {
  display: flex;
  flex-direction: column;
}
.common-scroll {
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.business-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  .select-filter {
    display: flex;
    font-size: 0.328125rem;
    .select-bank {
      flex: 1;
      padding: 10px 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f7f7f7;
      color: #abacae;
    }
    .select-sort {
      display: flex;
      padding: 15px 0;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      border: 1px solid #f7f7f7;
      flex: 1;
      color: #abacae;
    }
  }
  .sort {
    display: flex;
    flex-direction: column;
    .list-item {
      padding: 10px 15px;
      border-bottom: 1px solid #fff;
      text-align: center;
      font-size: 0.28125rem;
      background-color: #f7f7f7;
    }
    .sort-list {
      display: flex;
      flex-direction: column;
    }
  }
}
.main-list {
  position: relative;
  width: 100%;
  padding: 15px;
  z-index: 50;
  box-sizing: border-box;
}
.main {
  .main-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    .main-item {
      display: flex;
      align-items: center;
      margin: 10px 15px;
      padding: 20px 0px;
      border-bottom: 1px solid #f7f7f7;
      box-sizing: border-box;
      .item-left {
        width: 1.992186rem;
        flex-shrink: 0;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-right {
        width: 4.921871rem;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        padding: 0px 10px;
        box-sizing: border-box;
        p:nth-child(1) {
          padding: 10px 0;
          font-size: 0.328125rem;
          font-weight: 500;
          box-sizing: border-box;
        }
        p:nth-child(2) {
          font-size: 0.046875rem;
          text-overflow: ellipsis;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p:nth-child(3) {
          font-size: 0.117187rem;
          padding: 10px 0 5px 0;
          box-sizing: border-box;
        }
        p:nth-child(4) {
          font-size: 0.117187rem;
          text-overflow: ellipsis;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
.showLoad {
  text-align: center;
}
.icon-load {
  width: 50px;
  height: 50px;
}
.active {
  color: #f14449 !important;
}
</style>
