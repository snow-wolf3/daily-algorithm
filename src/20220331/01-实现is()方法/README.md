Object.is() 和===基于一致，除了以下情况：
```js
Object.is(0, -0) // false
0 === -0 // true

Object.is(NaN, NaN) // true
NaN === NaN // false

```

SameValue(x, y)
The internal comparison abstract operation SameValue(x, y), where x and y are ECMAScript language values, produces true or false. Such a comparison is performed as follows:
内部比较抽象操作SameValue（x，y），其中x和y是ECMAScript语言值，生成true或false。这样的比较如下所示：

ReturnIfAbrupt(x).
ReturnIfAbrupt(y).
If Type(x) is different from Type(y), return false.
If Type(x) is Undefined, return true.
If Type(x) is Null, return true.
If Type(x) is Number, then
If x is NaN and y is NaN, return true.
If x is +0 and y is −0, return false.
If x is −0 and y is +0, return false.
If x is the same Number value as y, return true.
Return false.
If Type(x) is String, then
If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices) return true; otherwise, return false.
If Type(x) is Boolean, then
If x and y are both true or both false, return true; otherwise, return false.
If Type(x) is Symbol, then
If x and y are both the same Symbol value, return true; otherwise, return false.
Return true if x and y are the same Object value. Otherwise, return false.
NOTEThis algorithm differs from the Strict Equality Comparison Algorithm (7.2.13) in its treatment of signed zeroes and NaNs.