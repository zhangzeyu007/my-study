/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-01-14 18:12:51
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-02-16 17:35:12
 * @FilePath: \server\app\io\middleware\auth.js
 */
module.exports = () => {
  return async (ctx, next) => {
    console.log('连接鉴权');
    const { socket } = ctx;
    const query = socket.handshake.query;
    const id = socket.id;
    console.log(id, 'id');
    console.log(query, 'query');
    if (!(query.myKey === '111')) {
      socket.disconnect();
      socket.emit('auth', '鉴权失败');
      console.log('断开链接');
      return;
    }
    console.log('服务端链接成功');
    socket.emit('connect', '服务端连接成功');
    socket.on('message', (arg, callback) => {
      console.log(arg, '接收客户端消息'); // "world"
      callback('服务端收到客户端消息');
    });
    await next();
  };
};
