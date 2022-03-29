function addToArrayForm(num, k){
  var kArr = []
  while (k) {
    kArr.unshift(k % 10);
    k = ~~(k / 10)
  }
  const len = num.length;
  const kLen =  kArr.length;
  let i = len - 1;
  let j = kLen - 1;
  let add = false;
  while (i >= 0 || j >= 0) {
    if (i >= 0) {
      num[i] += (~~add)
    }
    if (j >= 0) {
      num[i] += kArr[j];
    }
    if (num[i] >= 10) {
      num[i] = num[i] % 10
      add = true
    } else {
      add = false;
    }
    if (i === 0 && j > 0) {
      i = 0;
      num.unshift(0)
    } else {
      i--;
    }
    j--;
  }
  if (add) {
    num.unshift(1)
  }
  return num
}

// var a = [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,0,6,3]
var a = [7,7,5,2]
var b = 7105
// var a = [1]

// var b = 9999
console.log(
  addToArrayForm(a, b)
);