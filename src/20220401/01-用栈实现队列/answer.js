var MyQueue = function() {
  this.queue = [];
  this.stack = [];
  this.top = 0;
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.queue[this.top] = x;
  this.stack[this.top] = x;
  this.top++;
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if (this.top === 0) return
  return --this.queue.length && this.stack[0];
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  return this.queue[0]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  this.queue.length = 0;
  this.top = 0
  return this.top === 0
};

var q = new MyQueue();
q.push(1);
q.push(2);

console.log(q.peek());
console.log(q.pop());
console.log(q.empty());


/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
