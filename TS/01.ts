/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-15 12:14:37
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-15 13:47:01
 * @FilePath: \my-study\TS\01.ts
 */

// 布尔值
let isDone: boolean = false;

// 数值
let count: number = 10;

// 字符串
let name1: string = 'TypeScript';

// 数组
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // 另一种语法

// 元组 Tuple
let x: [string, number] = ['hello', 10];

// 枚举
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

// Any 
let notSure: any = 4;

// Void
function warnUser(): void {
	console.log("This is my warning message");
}

// Null 和 Undefined
let u: undefined = undefined;
let n: null = null;