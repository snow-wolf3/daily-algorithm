### 1. arguments使用及注意点
有多种使用arguments方式会导致函数无法优化。使用时必须非常小心arguments。
1.1。重新分配定义的参数，同时也在arguments正文中提及（仅在sloppy mode/非严格模式下）。典型例子：
<font color="red">错误例子</font>

```js
function defaultArgsReassign(a, b) {
  if (arguments.length < 2) {
    // 不能对传入的参数进行修改
    b = 5;
  }
}
```

<font color="green">解决方法是将参数保存到新变量：</font>

```js
function reAssignParam(a, _b) {
    // 接收传入的参数
    var b =_ b;
    if (arguments.length < 2) {
      // 再对参数进行修改
      b = 5;
    }
}
```
禁止直接修改arguments, 以及传递arguments
<font color="red">错误例子</font>

```js
// 以下都是❌ 的

// 禁止修改arguments
function reAssignParam(a, b) {
  arguments = 3;
  return arguments
}
reAssignParam()

// 禁止传递arguments
function leaksArguments2() { 
    var a = arguments;
    return function() {
        return a;
    };
}

// 禁止使用slice等api操作arguments
function leaksArguments3() {
    var args = [].slice.call(arguments);
}
```


使用代理的方法对arguments进行处理
```js
function doesntLeakArguments() {
                    //.length is just an integer, this doesn't leak
                    //the arguments object itself
    var args = new Array(arguments.length);
    for(var i = 0; i < args.length; ++i) {
                //i is always valid index in the arguments object
        args[i] = arguments[i];
    }
    return args;
}

function anotherNotLeakingExample() {
    var i = arguments.length;
    var args = [];
    while (i--) args[i] = arguments[i];
    return args
}
```
