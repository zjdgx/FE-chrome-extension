# 2019/01/30 VUE指令

**自定义指令作用是对普通 DOM 元素进行底层操作**

## 自带指令
  1. v-text: 主要用来更新textContent，可以等同于JS的text属性
  2. v-html
  3. v-pre: 主要用来跳过这个元素和它的子元素编译过程
  4. v-cloak: 这个指令是用来保持在元素上直到关联实例结束时进行编译。
  5. v-once: v-once关联的实例，只会渲染一次。之后的重新渲染，实例极其所有的子节点将被视为静态内容跳过，这可以用于优化更新性能。
  6. v-if
  7. v-else
  8. v-else-if
  9. v-show
  10. v-for
  11. v-bind
  12. v-model: 用于在表单上创建双向数据绑定。
    - 修饰符.lazy: v-model同步输入框的值和数据。可以通过这个修饰符，转变为在change事件再同步
    - 修饰符.number
    - 修饰符.trim: 自动过滤用户输入的首尾空格
  13. v-on

## 自定义指令
  1. 全局指令
    ```javascript
      Vue.directive('name', function () {// name为自定义指令名字
        ...
      })
    ```
  2. 组件内指令
    ```javascript
      directives: {
        name: { // name为自定义指令名字
          ...
        }
      }
    ```
  3. 钩子函数
    - bind: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    - inserted: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    - update: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    - componentUpdated: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    - unbind: 只调用一次，指令与元素解绑时调用。
  4. 钩子函数参数
    - el: 指令所绑定的元素，可以用来直接操作 DOM 。
    - binding: 一个对象，包含以下属性:
      - name: 指令名，不包含v-前缀
      - value: 指令的绑定值，例如: v-my-directive="1 + 1" 中，绑定值为 2。
      - oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      - expression: 字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
      - arg: 传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      - modifiers: 一个包含修饰符的对象。例如: v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    - vnode: Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
    - oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
