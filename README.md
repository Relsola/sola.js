# Sola.js

## 个人学习测试工具库

## 更新包

npm version 后面参数说明：

- patch：小变动，比如修复 bug 等，版本号变动 v1.0.0->v1.0.1
- minor：增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0
- major：破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0

```bash
pnpm version patch
pnpm publish
```

### `createNanoEvents`

小型发布订阅模型

### `throttle` `debounce`

节流防抖

### `deepClone`

处理简单情况的深克隆

### `once`

只执行一行，再次执行返回第一次的值

### `memoize`

用于缓存给定函数的结果，以防止多次使用相同参数调用计算代价高昂的例程。

### `curry`

用于通过“预填充”一些参数来从现有函数创建一个新函数。

当处理带有多个参数的函数时，使用 `curry` 函数将它们转换为仅需局部参数的函数，因为其他参数将始终保持不变。

- 它有助于避免多次使用同一个变量
- 它使代码更具可读性
- 它将函数划分为多个较小的函数，符合单一职责

### `getType `

校验数据类型

### `getSearchParams`

解析 URL 参数

### `uniqueArrayObject`

根据指定属性过滤数组对象
