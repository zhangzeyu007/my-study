/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-02 14:17:51
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-02 14:18:59
 * @FilePath: \vue3ts\src\enums\httpEnum.ts
 */
// 请求结果集

export enum ResultEnum {
	SUCCESS = 200,
	TOKEN_EXPIRED = 401,
	ERROR = 300,
	TIMEOUT = 10042,
	TYPE = 'success',
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
	// json
	JSON = 'application/json;charset=UTF-8',
	// json
	TEXT = 'text/plain;charset=UTF-8',
	// form-data 一般配合qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data  上传
	FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
