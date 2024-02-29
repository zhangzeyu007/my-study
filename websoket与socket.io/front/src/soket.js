/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-01-14 18:35:06
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-02-16 20:11:10
 * @FilePath: \front\src\soket.js
 */
import  io  from 'socket.io-client';
// 这里的 URL 应该替换为你的 Socket.IO 服务器的 URL
const socket  = io('ws://localhost:7001',{
	query: {
    "myKey": "111"
  },
  autoConnect: false,
  transports: ['websocket']
});

socket.on("connect", () => {
  console.log(socket.connected, '链接状态----成功');

});

socket.on('error', (error) => {
  console.log("发生错误--------------------");
  console.log(error,'error');
});

socket.on("connect_error", (error) => {
  console.log("链接失败--------------------");
  console.log(error,'error');
  console.log(socket.connected, '链接状态----失败');
  // socket.connect();
});

socket.on("auth", (state) => {
  console.log(state);
  socket.disconnect();
});

socket.on("disconnect", (state) => {
  console.log(state, '断开链接------------');
});

socket.on("reconnect", () => {
   console.log('重新链接------------');
   socket.connect();
});

socket.on("reconnect_attempt", (state) => {
console.log('尝试重新链接------------',state);
});

socket.on('reconnect_error', (error) => {
  console.log('尝试重新链接错误------------',error);
});

socket.on("ping", () => {
  console.log('ping');
});


export default socket;