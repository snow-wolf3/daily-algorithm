/**
 * @param {string} s
 * @return {string}
 */
// 递归法
var decodeString = function(s) {
  const o = {
    '[': 1,
    ']': -1,
  }
  const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  function copy(str, ind) {
    let newStr = ''
    let i = ind;
    while (i < str.length) {
      if (num.includes(str[i])) {
        const index = str.indexOf('[')
        const count = +(str.substr(i, index - i));
        let tempS = ''
        let t = 0;
        for (let j = index; j < str.length; j++) {
          if (o[str[j]] !== undefined) {
            t += o[str[j]]
            if (t === 0) {
              tempS = str.substr(index + 1, j - index - 1);
              i = j + 1;
              for (let k = 0; k < count; k++) {
                newStr += tempS;
              }
              newStr += str.substr(j + 1);
              if (newStr.indexOf('[') > -1) {
                newStr = copy(newStr, j + 1)
              }
              return newStr
            }
          }
        }
      } else {
        newStr += str[i]
        i++;
      }
    }
    return newStr
  }
  console.log(copy(s, 0));
  return copy(s, 0)
};

// 栈堆法
var decodeString2 = (s) => {
  let stack = []
  for (const char of s) {
    if (char !== ']') { // ] 前的字符都入栈

      stack.push(char)
      // console.log(stack);
      continue
    }
    let cur = stack.pop() // 弹出一个来检测
    let str = '' // 组装字符串
    // 接下来肯定是遇到字母，直到遇到 [
    while (cur !== '[') {
      str = cur + str // cur字符加在左边
      cur = stack.pop() // 再拉出一个
    }
    // 此时cur为 [，接下来要遇到数字
    let num = ''
    cur = stack.pop() // 用下一个将 [ 覆盖
    while (!isNaN(cur)) {
      num = cur + num // 数字字符加在左边
      cur = stack.pop() // 再拉出一个
    }
    // 现在要么是字母，要么是 [
    console.log(cur);
    stack.push(cur)
    for (let j = 0; j < num; j++) {
      stack.push(str)
    }
  }
  console.log(stack.join(''), `stack.join('')`);
  return stack.join('')
}

decodeString2('x2[3[a]r4[ff]]hhh')