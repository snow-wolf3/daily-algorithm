/**
 * @param {number} maxSize
 */

var CustomStack = function(maxSize) {
  this.stack = [];
  this.maxSize = maxSize;
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
  if (this.stack.length < this.maxSize) {
    this.stack[this.stack.length] = x;
  }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
  if (this.stack.length) {
    const top = this.stack[this.stack.length-1];
    this.stack.length--
    return top;
  }
  this.stack.length = 0;
  this.top = 0;
  return -1
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
  k = Math.min(this.stack.length, k);
  for (let i = 0; i < k; i++) {
    this.stack[i] += val
  }
};
var customStack = new CustomStack(3)
customStack.push(1);
customStack.push(2);
customStack.pop();
customStack.push(2);
customStack.push(3);
customStack.push(4);
customStack.increment(5, 100);                // 栈变为 [101, 102, 103]
//customStack.increment(2, 100);                // 栈变为 [201, 202, 103]
// customStack.pop();                          // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
// customStack.pop();                            // 返回 202 --> 返回栈顶值 202，栈变为 [201]
// customStack.pop();                            // 返回 201 --> 返回栈顶值 201，栈变为 []
// customStack.pop();   
console.log(customStack);

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */