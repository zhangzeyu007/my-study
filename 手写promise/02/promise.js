/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-21 17:41:55
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-21 20:29:08
 */

class zzPromise {
    static PENDING = 'pending'
    static FUILLED = 'fulfilled'
    static REJECTED = "rejected"
    constructor(executor) {
        this.status = zzPromise.PENDING
        this.value = null;
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value) {
        if (this.status === zzPromise.PENDING) {
            this.status = zzPromise.FUILLED
            this.value = value
        }
    }
    reject(reason) {
        if (this.status === zzPromise.PENDING) {
            this.status = zzPromise.REJECTED
            this.value = reason;
        }
    }
}