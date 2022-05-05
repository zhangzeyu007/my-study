/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-05-04 13:01:25
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-04 22:54:11
 * @FilePath: \my-study\vue2源码\src\compiler\index.js
 */
/* @flow */

import { parse } from "./parser/index";
import { optimize } from "./optimizer";
import { generate } from "./codegen/index";
import { createCompilerCreator } from "./create-compiler";

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  // TODO 1.解析parse(生成解析树)
  const ast = parse(template.trim(), options);
  // todo 2.优化tansform生成
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  // todo 3. 生成代码
  const code = generate(ast, options);
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  };
});
