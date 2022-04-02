// 第十四版, 完整版, 无注释版
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECT = 'REJECT';
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (x === promise2) {
    throw new Error('Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>')
  }
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then(y => {
        promiseResolutionProcedure(promise2, y, resolve, reject)
      }, reject)
    } else {
      x.state === FULFILLED && resolve(x.value)
      x.state === REJECT && reject(x.value)
    }
  }
  if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
    if(typeof x.then === 'function') {
      x.then(y => {
        promiseResolutionProcedure(promise2, y, resolve, reject)
      }, reject)
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {
  constructor(fn) {
    this.PENDING = PENDING;
    this.FULFILLED = FULFILLED;
    this.REJECT = REJECT;
    this.state = this.PENDING;
    this.value = void 0;
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []
    const resolve = (val) => {
      if ((typeof val === 'object' || typeof val === 'function') && val.then) {
        promiseResolutionProcedure(this, val, resolve, reject)
        return
      }
      setTimeout(() => {
        if (this.state === this.PENDING) {
          this.value = val;
          this.state = this.FULFILLED;
          this.resolvedCallbacks.map(fn => fn())
        }
      })
    }
    const reject = (val) => {
      if ((typeof val === 'object' || typeof val === 'function') && !Array.isArray(val) && val.then) {
        promiseResolutionProcedure(this, val, resolve, reject)
        return
      }
      setTimeout(() => {
        if (this.state === this.PENDING) {
          this.value = val;
          this.state = this.REJECT;
          this.rejectedCallbacks.map(fn => fn())
        }
      })

    }
    fn(resolve, reject)
  }
  then(onFullFilled = val => val, onRejected = (err) => {
    throw new Error(err)
  }) {
    let promise2;
    if (this.state === this.PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFullFilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject)
        })
        this.rejectedCallbacks.push(() => {
          const x = onRejected(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject)
        })
      })
      return promise2
    }
  }
  static all(promiseArr) {
    return new MyPromise((resolve, reject) => {
      const resolveArray = []
      let successTimes = 0;
      function processResult(i, data) {
        resolveArray[i] = data;
        successTimes++;
        if (successTimes === promiseArr.length) {
          resolve(resolveArray)
        }
      }
      for (let i = 0; i < promiseArr.length; i++) {
        const p = promiseArr[i].then((data) => {
          ((i)=>{processResult(i, data)})(i)
        }, err => {
          reject(err)
        })
      }
    })
  }
}

MyPromise.all([new MyPromise((r, j) => {
  j(1)
}), new MyPromise((r, j) => {
  r(2)
})]).then((r) => {
  console.log(r);
})
