主题色切换借助了 `scss` 预处理框架的内容，暗黑主题色定义在：`src\styles\common\_dark.scss`，明亮主题色定义在同级： `_light.scss` 中。若想使用定义好的颜色，需要借助 `@include` 方法，并搭配已经定义好的 `@mixin` 方法使用。

案例如下：

1. 定义颜色:

_dark.scss
```scss
@import './var.scss';
$light: (
  background-color: $--color-dark,
)
```

_light.scss
```scss
@import './var.scss';
$light: (
  background-color: $--color-light,
)
```

2. `src\styles\common\mixins\mixins.scss` 定义方法:

```scss
// 获取背景颜色
@mixin fetch-bg-color($target) {
  @include themeify {
    background-color: themed($target);
  }
}
```

3. 页面中使用：

```vue
<style lang="scss" scoped>
/*参数需要与 _dark.scss，_light.scss 定义的名称保持一致*/
* {
  @include fetch-bg-color('background-color');
  /*
    将会渲染成：background-color: "#xxxxx"
  */
}
</style>
```
