// 根据README.md的3. 实战案例的步骤中去做
// 这里做第十步: 支持 resolve 传递 promise 对象
// 定义静态状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECT = 'REJECT';
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  // 31. 这里将Function一起处理是不规范的, 我们要单独处理promise
  if (x instanceof MyPromise) {
    // 32. 只要进来这里了, 就跟处理then一样, 也要处理空对象, 链式调用, thenable等等
    // 33. 当pending状态时, 就按照then流程金秀贤
    if (x.state === PENDING) {
      x.then(y => {
        // 30. 这个方法主要是处理这里的y是否还是thenable
        promiseResolutionProcedure(promise2, y, resolve, reject)
      }, reject)
    } else {
      // 34. 如果是FULFILLED或者是REJECT状态就直接resolve或者reject解饿可
      x.state === REJECT && resolve(x.value)
      x.state === FULFILLED && reject(x.value)
    }
  }
  // 29. 递归处理thenable对象
  if ((typeof x === 'object' || typeof x === 'function') && x !== null && typeof x.then === 'function') {
    // 同时提高容错, then也必须是Function
    x.then(y => {
      // 30. 这个方法主要是处理这里的y是否还是thenable
      promiseResolutionProcedure(promise2, y, resolve, reject)
    }, reject)
  } else {
    resolve(x)
  }
}


class MyPromise {

  
  constructor(fn) {
    // promise 的三种状态
    this.PENDING = PENDING;
    this.FULFILLED = FULFILLED;
    this.REJECT = REJECT;
    // 11. 第二部分: 存在一个state存放状态, 根据(规范)[https://www.ituring.com.cn/article/66566], Promise有三种状态
    // 12. 首先我们知道, state一开始是pending状态
    this.state = this.PENDING;

    // 16. 第三步: 定义value, 每个Promise都有自己的一个初始值void 0(undefined), 这里的value是resolve传递的val值 
    this.value = void 0;

    // 7. 缓存那些需要挂载的then方法, 这里是一个数组因为一个数组可能挂载多个then方法, 这是一个队列, 先到先执行
    this.resolvedCallbacks = []
    const resolve = (val) => {
      // 35. 这里只有判断val是否是一个promise对象即可, 单独处理promise对象
      if (typeof val === 'object' || typeof val === 'function') {
        promiseResolutionProcedure(this, val, resolve, reject)
        return
      }
      // 13. 当执行了resolve后, 状态就是fulfilled状态, 所以我们这里修改对应的状态
      // this.state = this.FULFILLED;
      // 17. 当resolve的时候, value就会被赋值
      // this.value = val;
      // 6. 这里执行所有的then方法

      // 10. 当我执行这个resolve的时候我们就去Callback里面去取就可以了, 并且要把val传进去, 因为上一个then是要把状态传递下去的
      // this.resolvedCallbacks.map(fn => fn(val))

      // 20. 当同步resolve的时候, 还没执行到then方法里面这里就已经执行了, 此时这里的then的执行栈为空, 所以这里需要手动将同步任务转为宏任务, 同时在执行then方法的时候有状态限制, 所以这里需要将状态也要放在宏任务中
      setTimeout(() => {
        // this.state = this.FULFILLED;
        // this.resolvedCallbacks.map(fn => fn(val))

        // 21. 只有在等待状态resolve才能被执行, 如果是其他两种状态FULFILLED和REJECT, 说明本次的Promise已经完成了
        if (this.state === this.PENDING) {
          this.value = val;
          this.state = this.FULFILLED;
          this.resolvedCallbacks.map(fn => fn())
        }
      })
    }
    const reject = (val) => {
      // 13_1. 当reject执行的时候, 状态就会变成了REJECT状态
      this.state = this.REJECT;
      // 17_1. 当resolve的时候, value就会被赋值
      this.value = val;

    }
    // 1. new的时候接受一个fun函数, 并且执行, 而这个函数有两个参数, 都是函数参数resolve和reject, 所以我们需要定义这两个参数的函数
    // 2. 其中的resolve需要传递一个参数给then, 那么我们怎么传递这个参数给then方法呢
    fn(resolve, reject)
  }

  // 3. 这里定义原型方法then, 这里千万不能加static, 因为static标志的静态方法, 所有的实例都是访问不了的, static的方法只能在构造函数中使用, 以及继承中的构造函数使用
  // 8. then方法接收两个参数, 第一个参数是接收resolve返回值的回调函数onFullFilled
  then(onFullFilled) {
    // 4. 这里Promise可以挂载多个then方法, 每一个then也可以挂载下一个then, 进行串联操作, 所以then方法在做的事情, 就是把then需要传递的fn缓存起来, 一旦我们的Promise触发resolve的时候, 就会触发我们then缓存起来的方法
    // 5. 因为可以同时执行多个then, 所以我们要将方法缓存再Promise中, 而触发条件就是执行上面的resolve方法, 所以我们回到上面构造函数中的resolve方法

    // 9. 当then接收了onFullFilled方法后, 就会将onFullFilled挂载到this.resolvedCallbacks
    // 14. 当我们的执行态是pending状态的时候才能执行, 就是promise还没完成的时候, 后面这里需要完善
    // 15. 只有在PENDING状态的时候才能缓存我们的Callback
    // if (this.state === this.PENDING) {
    //   this.resolvedCallbacks.push(onFullFilled)
    // }
    // 22. 第六部分: 在then方法中返回一个promise方法, 因为我们这边可以链式调用then, 所以每次都要返回一个new MyPromise
    if (this.state === this.PENDING) {
      // 23. 这里需要链式调用, 我们再次new一个实例返回去
      const promise2 = new MyPromise((resolve, reject) => {
        // 26. 处理空then的链式调用, 同时将val传递下去
        const onFullFillFun = onFullFilled || ((val) => val);

        this.resolvedCallbacks.push(() => {
          //24. 这里push的是一个方法, 因为我们需要获取当前then的值, 然后通过resolve传递给下一个then的回调中
          const x = onFullFillFun(this.value);
          // 28. 根据Promise规范, 需要判断then返回的是不是一个thenable对象, 因为如果返回一个包含then函数的对象, 则需要进行链式调用一下, 提到外面做静态方法
          // if ((typeof x === 'object' || typeof x === 'function') && x !== null && typeof x.then === 'function') {
          //   // 同时提高容错, then也必须是Function
          //   x.then(y => 
          //     resolve(y)
          //   )
          // } else {
          //   resolve(x)
          // }
          promiseResolutionProcedure(promise2, x, resolve, reject)
        })
      })
      return promise2
    }
  }


}


const fn = new Promise((resolve, reject) => {
  // resolve('step1')
  resolve(new Promise((res, rej) => {
    res('我是resolve里面的promise对象')
  }))
})
const fn1 = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('step1_获取到数据了')
  // }, 2000)
  // 18. 第四部分: 当我们直接返回同步的resolve
  // resolve('step2')

  // 19. 第五部分: 防止resolve多次
  // resolve('step3')
  // resolve('step3.1')
  // resolve('4.0')

  // 25. 第七部分: 支持空then的链式调用
  // resolve('step 5')
  
  // 27. 第八部分: then支持thenable对象, 意思就是返回一个then方法
  // resolve('step 6')
  // resolve('step 7')

  // 35. 第十部分: 处理resolve返回一个promise对象
  resolve(new MyPromise((res, rej) => {
    res('我是resolve里面的promise对象')
  }))

})
fn.then((r) => {
  console.log('获取到数据', r);

  // return {
  //   then(resolve, reject) {
  //     resolve({
  //       then: ((r, j) => {
  //         r({
  //           then: ((r, j) => {
  //             r('我是内部的多层thenable')
  //           })
  //         })
  //       })
  //     })
  //   }
  // }
  // 第九部分: 返回promise
  return new MyPromise((resolve, rej) => {
    resolve('7.1')
  })
}).then((e) => {
  console.log('第二层传递了', e);
})




