1381. 设计一个支持增量操作的栈
先看定义, 思路在片尾

请你设计一个支持下述操作的栈。

实现自定义栈类 CustomStack ：

CustomStack(int maxSize)：用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。
void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。
 

示例：

输入：
```js
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
```
输出：
```js
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
```
解释：
CustomStack customStack = new CustomStack(3); // 栈是空的 []
customStack.push(1);                          // 栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.pop();                            // 返回 2 --> 返回栈顶值 2，栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.push(3);                          // 栈变为 [1, 2, 3]
customStack.push(4);                          // 栈仍然是 [1, 2, 3]，不能添加其他元素使栈大小变为 4
customStack.increment(5, 100);                // 栈变为 [101, 102, 103]
customStack.increment(2, 100);                // 栈变为 [201, 202, 103]
customStack.pop();                            // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
customStack.pop();                            // 返回 202 --> 返回栈顶值 202，栈变为 [201]
customStack.pop();                            // 返回 201 --> 返回栈顶值 201，栈变为 []
customStack.pop();                            // 返回 -1 --> 栈为空，返回 -1
 

提示：

1 <= maxSize <= 1000
1 <= x <= 1000
1 <= k <= 1000
0 <= val <= 100
每种方法 increment，push 以及 pop 分别最多调用 1000 次


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/design-a-stack-with-increment-operation
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

这里需要设计一个支持增量操作的栈, 大白话就是: 对于js来说就是对数组进行增量的操作
首先push和pop两个操作是很简单的, 可以模仿数组操作即可
而increment操作, 接受两个参数, 第一个参数是增量到哪个元素, 第二个参数是增量的数值
第一个参数, 如果比传入的最大值maxSize大的话, 就全部都需要增量, 如果比maxSize小, 那么k就是数组的下标, 第二个参数就增量到下标k值


思路: 
第一: 我们需要定义两个全局变量; ①: 需要增量的栈`stack`; ②: 栈的最长长度
第二: `push`每次对stack的push的时候需要判断是否越界(大于maxSize);
第三: `pop`返回stack的栈顶元素, 并且删除原栈里面pop的这个元素, 如果没有,pop直接返回-1
第四: `increment`取k值和栈长度直接的最小值, 然后循环累加val值


