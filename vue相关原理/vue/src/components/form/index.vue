<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-11 17:09:26
 * @FilePath: \vue\src\components\form\index.vue
-->
<template>
  <div>
    <!-- KForm 指定管理我们的数据和校验规则-->
    <!-- KFormItem: 数据的校验和错误的展示 -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入账户"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" placeholder="请输入密码"></KInput>
      </KFormItem>
      <KFormItem><button @click="login">登入</button></KFormItem>
    </KForm>
  </div>
</template>

<script>
import KInput from "./KInput";
import KFormItem from "./KFormItem";
import KForm from "./KForm";
import Notice from "@/components/Notice.vue";
import create from "@/utils/create";

export default {
  components: {
    KInput,
    KFormItem,
    KForm
  },
  data() {
    return {
      model: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "必须输入用户名" }],
        password: [{ required: true, message: "必须输入密码" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(isValid => {
        create(Notice, {
          title: "泽雨",
          message: isValid ? "请求登入" : "校验失败"
        }).show();
        if (isValid) {
          console.log("登入提交");
        } else {
          console.log("登入失败");
        }
      });
    }
  }
};
</script>

<style scoped></style>
