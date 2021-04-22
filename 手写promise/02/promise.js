/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-21 17:41:55
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-22 14:11:18
 */

class zzPromise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = "rejected"
    constructor(executor) {
        this.status = zzPromise.PENDING
        this.value = null;
        this.callbacks = []
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
            setTimeout(() => {
                this.callbacks.map(callbacks => {
                    callbacks.onFulfilled(this.value)
                })
            }, 0)
        }
    }
    reject(reason) {
        if (this.status === zzPromise.PENDING) {
            this.status = zzPromise.REJECTED
            this.value = reason;
            setTimeout(() => {
                this.callbacks.map(callbacks => {
                    callbacks.onRejected(reason)
                })
            }, 0)
        }
    }
    then(onFulfilled, onRejected) {
        if (typeof onFulfilled != 'function') {
            onFulfilled = () => this.value
        }
        if (typeof onRejected != "function") {
            onRejected = () => this.value
        }
        return new zzPromise((resolve, reject) => {
            if (this.status === zzPromise.PENDING) {
                debugger
                this.callbacks.push({
                    onFulfilled: value => {
                        console.log('走啊');
                        try {
                            let result = onFulfilled(value);
                            if (result instanceof zzPromise) {
                                result.then(resolve, reject)
                            } else {
                                resolve(result)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    },
                    onRejected: value => {
                        try {
                            let result = onRejected(value);
                            if (result instanceof zzPromise) {
                                result.then(resolve, reject)
                            } else {
                                resolve(result)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    }

                })
                console.log(this.callbacks);
            }
            if (this.status === zzPromise.FULFILLED) {
                console.log('哈哈');
                setTimeout(() => {
                    try {
                        let result = onFulfilled(this.value)
                        if (result instanceof zzPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.status === zzPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.value)
                        if (result instanceof zzPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
        })
    }
}