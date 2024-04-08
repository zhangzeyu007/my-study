/*
/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-15 13:47:35
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-25 16:22:30
 * @FilePath: \my-study\TS\02.ts
 */
interface Person {
	name: string;
	age?: number; // 可选属性
	readonly id: number; // 只读属性
	sayHi: () => string; // 定义方法
}

let user: Person = {
	name: 'TypeScript',
	id: 1234,
	sayHi: () => { return 'Hi there!' }
}


class User {
	name: string; // 属性
	private age: number; // 私有属性

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	public sayHi() { // 公共方法
		console.log(`Hi, my name is ${this.name}`);
	}
}

let user1 = new User('TypeScript', 10);
user1.sayHi(); // Hi, my name is TypeScript


// 函数类型
let add: (x: number, y: number) => number = (x, y) => x + y;

// 可选参数和默认参数
function buildName(firstName: string, lastName?: string, middleName: string = 'A') {

}

// 剩余参数
function push(array: any[], ...items: any[]) {
	items.forEach(item => array.push(item));
}

// 泛型
function reverse<T>(items: T[]): T[] {
	let toReturn = [];
	for (let i = items.length - 1; i >= 0; i--) {
		toReturn.push(items[i]);
	}
	return toReturn;
}

let sample = [1, 2, 3];
let reversedNum = reverse<number>(sample); // [3, 2, 1]
let reverseString = reverse(['a', 'b', 'c']); // ['c', 'b', 'a']


type IDType = number | string;
let userId: IDType = 123;
userId = '456';


interface Box {
	height: number;
	width: number;
}

interface Color {
	red: number;
	green: number;
	blue: number;
}

// 交叉类型
type BoxColor = Box & Color;

let obj: BoxColor = {
	height: 5,
	width: 6,
	red: 255,
	green: 0,
	blue: 0
}

// 联合类型
let value: number | string;
value = 6;
value = 'six';