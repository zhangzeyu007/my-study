/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-01 18:53:37
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 10:40:49
 * @FilePath: \vue3ts\src\utils\is\index.ts
 */

const toString = Object.prototype.toString;
/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

// 是否是函数
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, 'Function');
}

// 是否已定义
export function isDef<T = unknown>(val?: T): val is T {
	return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
	return !isDef(val)
}

// 是否是对象
export function isObject(val: any): val is Record<any, any> {
	return val !== null && is(val, 'Object')
}
// 是否Date
export function isDate(val: unknown): val is Date {
	return is(val, 'Date');
}

// 是否为promise
export function isPromise(val: unknown) {
	return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 是否string
export function isString(val: unknown): val is string {
	return is(val, 'String');
}

//是否为AsyncFunction
export function isAsyncFunction<T = any>(val: unknown): val is () => Promise<T> {
	return is(val, 'AsyncFunction')
}