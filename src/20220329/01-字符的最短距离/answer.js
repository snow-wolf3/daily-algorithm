/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */

var shortestToChar = function(s, c) {
  let cNum = 0;
  let count = 0;
  let left = 0;
  let right = 0;
  let i = 0;
  const answer = [];
  while (i < s.length) {
    // console.log('==', s[i]);
    if (s[i] !== c) {
      count++;
    }
    if (s[i] === c) {
      if (cNum === 0) {
        let j = right;
        while (j > 0) {
          answer.push(j);
          j--;
        }
        if (s.length - 1 === right && left === 0) {
          answer[s.length - 1] = 0;
        } else {
          answer[0] = 0;
        }
      } else {
        console.log();
        const average = (right - left) / 2;
        const isLast = right === s.length - 1; // 当前的s[i]是否最后一个元素了, 当右边没有目标c值时, 直接赋值数组
        const averageRightAndLeft = ~~average; // 向下取整的平均数, 用来中心扩散赋值的时候使用
        const isEven = average !== averageRightAndLeft; // 两个目标字符中间相隔元素的个数是否为偶数
        let midStart = isEven ? left + averageRightAndLeft : left + averageRightAndLeft + 1; // 确定中心扩散的点
        console.log(s[i], i, left, right, average, isLast, averageRightAndLeft, isEven, midStart);

        let l = 0;
        while (midStart > l) {
          if (isLast) {

          }
          if (!isEven) {
            answer[averageRightAndLeft + 1] = 0;
            answer[midStart] = averageRightAndLeft + 1;
          } else {
            answer[midStart + l + 1] = averageRightAndLeft - l;
            if (!isLast) {
              answer[midStart - l] = averageRightAndLeft - l;
            }
            if (isLast) {
              answer[right] = 0
            }
          }
          l++;
        }
      }

      left = i;
      right = i;
      cNum++;
    }

    right++;
    i++;
  }
  console.log(answer);
};
var shortestToChar2 = function(s, c) {
  const len = s.length
  let i = 0;
  let left = 0;
  let right = 0;
  const answer = [];
  let lastIndex = 0;
  let notC = 0;
  while (i < len) {
    if (s[i] === c) {
      notC = 0;
      lastIndex = i
      answer[i] = 0;
      let j = left;
      let lar = right - left;
      while (j < lar) {
        if (left === 0) {
          answer[j] = right - left - j;
        }
        j++
      }
      left = i + 1;
      right = i + 1;
    } else {
      notC+=1;
      const n = notC / 2;
      if (s[i + 1] === c) {
        if (notC % 2) {
          answer[(~~n) + left] = Math.ceil(n)
        }
        for (let index = 0; index < ~~n; index++) {
          answer[left + index] = index + 1;
          answer[left + notC - index - 1] = index + 1
        }
      }
    }
    if (len - 1 === i && lastIndex !== len - 1) {
      for (let k = lastIndex + 1, l = 1; k < len; k++, l++) {
        answer[k] = l;
      }
    }
    right++;
    i++;
  }
  return answer
}

let s = "bbab", c = "b";
shortestToChar2(s, c)