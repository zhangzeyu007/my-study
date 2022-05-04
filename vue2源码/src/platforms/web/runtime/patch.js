/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-04 13:01:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-04 19:40:28
 * @FilePath: \my-study\vue2源码\src\platforms\web\runtime\patch.js
 */
/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

// TODO : 重新生成patch函数
export const patch: Function = createPatchFunction({ nodeOps, modules })
