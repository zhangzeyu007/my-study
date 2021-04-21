/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-13 19:50:06
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-21 09:28:27
 */
const RESOLVE = 'resolved'
const REJECT = 'rejected'
const PENDING = 'pending'

class JJPromise {
    status = PENDING
    result = undefined
    reason = undefined
    constructor(excution) {
        const resolve = (result) => {
            if (this.status === PENDING) {
                this.result = result
                this.status = RESOLVE
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECT
            }
        }
        excution(resolve, reject)
    }

    then(onResolved, onRejected) {
        if (this.status === RESOLVE) {
            setTimeout(() => {
                onResolved(this.result)
            }, 0)
        }
        if (this.status === REJECT) {
            setTimeout(() => {
                onRejected(this.reason)
            }, 0)
        }
    }
}



