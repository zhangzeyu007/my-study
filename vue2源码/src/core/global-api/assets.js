/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-04 13:01:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-05 13:32:05
 * @FilePath: \my-study\vue2源码\src\core\global-api\assets.js
 */
/* @flow */

import { ASSET_TYPES } from "shared/constants";
import { isPlainObject, validateComponentName } from "../util/index";

// TODO: 实现Vue.component() ... 三个方法
export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach((type) => {
    // todo 静态方法
    // todo Vue.component('comp', {.....})
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production" && type === "component") {
          validateComponentName(id);
        }
        if (type === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          // todo 生成构造函数
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        // todo 注册
        // todo {components: {comp:ctor}}
        // todo 未来选项合并之后, 每个组件里面都会有该组件注册
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}
