// 根据README.md的3. 实战案例的步骤中去做
// 这里做第二步: 定义状态



class MyPromise {

  // 定义静态状态
  static PENDING = 'PENDING';
  static FULFILLED = 'FULFILLED';
  static REJECT = 'REJECT';
  constructor(fn) {
    // promise 的三种状态
    this.PENDING = MyPromise.PENDING;
    this.FULFILLED = MyPromise.FULFILLED;
    this.REJECT = MyPromise.REJECT;
    // 11. 第二部分: 存在一个state存放状态, 根据(规范)[https://www.ituring.com.cn/article/66566], Promise有三种状态
    // 12. 首先我们知道, state一开始是pending状态
    this.state = this.PENDING;
    // 7. 缓存那些需要挂载的then方法, 这里是一个数组因为一个数组可能挂载多个then方法, 这是一个队列, 先到先执行
    this.resolvedCallbacks = []
    const resolve = (val) => {
      // 13. 当执行了resolve后, 状态就是fulfilled状态, 所以我们这里修改对应的状态
      this.state = this.FULFILLED;
      // 6. 这里执行所有的then方法

      // 10. 当我执行这个resolve的时候我们就去Callback里面去取就可以了, 并且要把val传进去, 因为上一个then是要把状态传递下去的
      this.resolvedCallbacks.map(fn => fn(val))
    }
    const reject = () => {
      // 13. 当reject执行的时候, 状态就会变成了REJECT状态
      this.state = this.REJECT;

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
    if (this.state === this.PENDING) {
      this.resolvedCallbacks.push(onFullFilled)
    }
  }


}


const fn = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
const fn1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('step1_获取到数据了')
  }, 2000)
})
console.log(fn);




