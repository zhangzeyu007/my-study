<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-01-14 12:16:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-02-16 21:03:13
 * @FilePath: \front\src\views\HomeView.vue
-->

<template>
  <el-row class="mb-4">
    <el-button @click="sendMessage">发送</el-button>
    <el-badge :value="count" class="item">
    <el-button type="primary" @click="startwebsoket">开启websoket</el-button>
    </el-badge>
    <el-button class="btn" @click="closewebsoket">关闭websoket</el-button>
  </el-row>
</template>


<script setup>
import { onMounted, onUnmounted , ref} from 'vue';
import socket from '../soket.js';

let count = ref(0)

onMounted(() => {
      // 监听事件
      socket.on('count', (value) => {
        count.value = value
        console.log('服务端响应：', value); // "got it"
    });
      // 其他需要的监听事件...
    });

    onUnmounted(() => {
      // 清除监听，避免内存泄露
      // socket.off('connected');
      // socket.off('message');
      // 其他需要清除的监听事件...
    });

   // 你可以在这里写其他逻辑，比如发送消息:
   const sendMessage = () => {
      console.log('发送消息');
      socket.emit("message", "启动轮询", (response) => {
      console.log('服务端响应：',response); // "got it"
   });

};
// 开启websoket
  const startwebsoket = () => { 
      console.log('开启websoket');
      socket.connect();
    }
    
// 关闭websoket
  const closewebsoket = () => {          
    socket.close()
   }
</script>

<style scoped>
.item {
  margin-left: 10px;
}
.btn {  
  margin-left: 10px;
}
</style>