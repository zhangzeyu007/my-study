/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-15 16:50:19
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-18 13:08:23
 */

import router from "./router";
import store from "./store";

const whiteList = ["/demo"]; // 无需令牌白名单
router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否是登录
  const hasToken = localStorage.getItem("token");
  // 已登入
  if (hasToken) {
    if (to.path === "/login") {
      // 若已登录没有必要显示登录页, 重定向至首页
      next("/");
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        // 说明用户已获取过角色信息,放行
        next();
      } else {
        try {
          // 先请求获取用户的信息
          const { roles } = await store.dispatch("user/getInfo");
          // 根据当前用户角色过滤出可访问的路由
          const accessRoutes = await store.dispatch(
            "premission/generateRoutes",
            roles
          );
          // 添加至路由器
          router.addRoutes(accessRoutes);

          // 继续路由切换, 确保addRoutes 完成
          next({ ...to, replace: true });
        } catch (error) {
          // 出错需重置令牌并重新登录 (令牌过期、网络出错等原因)
          await store.dispatch("user/resetToken");
          next(`/login?redirect=${to.path}`);
          alert(error || "未知错误");
        }
      }
    }
    //   未登录
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next();
    } else {
      // 重定向至登录登录页
      next(`/login?redirect=${to.path}`);
    }
  }
});
