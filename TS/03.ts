/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-08 10:45:22
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-08 11:15:11
 * @FilePath: \my-study\TS\03.ts
 */

interface Person extends Emp {
	name: string | number
	age: number
}

type Emp = {
	id: string | number
}

type ID = string | number
let p: Person = { name: 1, age: 1, id: '2' }

type Data = { name: string, age: string | number }

//Partial 含义
type PARTIAL<T> = {
	[K in keyof T]?: T[K]
}

let data: Partial<Data> = { name: '1' }

//Record 含义
type RECORD<T extends string, U> = {
	[K in T]: U
}

type HD = Record<'name' | 'age', string | number>
const xj: HD = { name: 'eee', age: 1 }