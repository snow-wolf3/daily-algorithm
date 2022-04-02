### 1. 大致流程
                                        resolve触发 ------异步执行--------
                                        ↑                              ↓
new Promise -> 触发constructor(fn) -> 执行fn分两步 -> Promise实例 ----> {then方法和catch方法
                                        ↓                              ↑
                                        reject 触发报错----异步执行-------


### 2. Promise自身的状态
1. state存放当前的状态
2. value存放当前状态的值
3. then方法, 返回值也是一个Promise
4. catch方法
5. finally方法
6. 静态方法, 入Promise.all;

### 3. 实战案例
1. 实现一个promise, 在 setTimeout 中去 resolve
2. 实现一个promise, 直接同步 resolve
3. 实现一个promise, 防止 resolve 多次
4. 实现一个promise, 可以让 then 链式调用
5. 实现一个promise, 支持空 then
6. 实现一个promise, 支持 then 传递 thenable 对象
7. 实现一个promise, 支持 then 传递 promise 对象
8. 实现一个promise, 支持 resolve 传递 promise 对象
9. 实现一个promise, 处理 then 中的循环 promise 对象
10. 实现一个promise, 支持静态方法Promise.all
11. 实现一个promise, 支持 reject 和 catch
11. 实现一个promise, 支持处理完成态或失败态的then
