/**
 * 解题思路
 * 
 * 
 */
function curry(func) {
  const len = func.length;
  const arg = [];
  // es5版使用arguments
  // function getArgs() {
  //   if (arg.length < len) {
  //     for (const key in arguments) {
  //       if (Object.hasOwnProperty.call(arguments, key)) {
  //         const el = arguments[key];
  //         arg.push(el);
  //         if (arg.length >= len) {
  //           return func(...arg)
  //         }
  //       }
  //     }
  //     return getArgs
  //   }
  //   return func(...arg)
  // }

  // 使用es6的剩余参数
  function getArgs(...args) {
    if (arg.length < len) {
      for (let i = 0; i < args.length; i++) {
        const el = args[i];
        arg.push(el);
          if (arg.length >= len) {
            return func(...arg)
          }
      }
      return getArgs
    }
    return func(...arg)
  }
  return getArgs
}
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);
// curriedSum(1, 2, 3)
// console.log(curriedSum(1)(2)(3));
// alert(curriedSum(1, 2, 3)); // 6, still callable normally
// alert(curriedSum(1)(2, 3)); // 6, currying of 1st arg
// alert(curriedSum(1)(2)(3)); // 6, full currying

function reAssignParam(a, b) {
  console.log(a, b);
  console.log(void 0 === undefined);
  if (b === void 0) b = 5;
  console.log(b);
}
reAssignParam()