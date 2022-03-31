/**
 * @param {string} s
 * @return {string}
 */

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
decodeString('ab3[c2[d]]x2[a]yz')