/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-04 13:01:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-05 09:42:41
 * @FilePath: \my-study\vue2源码\src\core\instance\index.js
 */

import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

//todo Vue构造函数
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  // todo 执行初始化，_init从何而来
  this._init(options);
}

initMixin(Vue); //todo 扩展了一个_init方法
stateMixin(Vue); //todo $data/$props/$set/$delete...
eventsMixin(Vue); //todo $on/$emit/$once/$off
lifecycleMixin(Vue); //todo _update/$forceUpdate/$destroy
renderMixin(Vue); //todo $nextTick/_render

export default Vue;
