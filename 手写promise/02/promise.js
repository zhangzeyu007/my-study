/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-21 17:41:55
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-21 22:45:12
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
            onFulfilled = () => {

            }
        }
        if (typeof onRejected != "function") {
            onRejected = () => {

            }
        }
        return new zzPromise((resolve, reject) => {
            if (this.status === zzPromise.PENDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        try {
                            let result = onFulfilled(value);
                            resolve(result)
                        } catch (error) {
                            onRejected(error)
                        }
                    },
                    onRejected: value => {
                        try {
                            let result = onRejected(value);
                            resolve(result)
                        } catch (error) {
                            onRejected(error)
                        }
                    }

                })
            }
            if (this.status === zzPromise.FULFILLED) {
                setTimeout(() => {
                    try {
                        let result = onFulfilled(this.value)
                        resolve(result)
                    } catch (error) {
                        onRejected(error)
                    }
                }, 0)
            }

            if (this.status === zzPromise.REJECTED) {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.value)
                        resolve(result)
                    } catch (error) {
                        onRejected(error)
                    }
                }, 0)
            }
        })
    }
}