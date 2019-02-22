# 2019/02/11 VUE过滤器(filter)

**用于一些常见的文本格式化**

## 开发步骤
1. 写filter文件
  ```js
    import Vue from 'vue';

    Vue.filter('capitalize', (value) => {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    });
  ```

2. 将filter文件挂载到全局: `main.js`
  ```js
    import capitalize from './filter/capitalize';
    Vue.filter(capitalize, capitalize);
  ```