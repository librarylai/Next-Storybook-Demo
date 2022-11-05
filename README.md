# Storybook

## 安裝 Storybook

1. **建立一個 Next 專案**

   > yarn create next-app next-storybook

2. **使用 Storybook CLI 來快速將 Storybook 相關設定加入到『現有專案』中**

   > npx storybook init ( ps.這個步驟會跑一陣子)
   >
   > ![](https://i.imgur.com/u0js3a3.png)

3. **安裝 eslint-plugin-storybook**

   > Storybook CLI 會在安裝過程中檢查是否專案有安裝 eslint，且是否有安裝 `eslint-plugin-storybook`，如果尚未安裝則會跳出『是否安裝的提問』
   >
   > ![](https://i.imgur.com/WfqajOf.png)

4. **Storybook 安裝成功畫面**

   > 可以透過 `package.json` 來發現到 CLI 幫我們安裝了許多 Storybook 所需要的套件，以及在 `scripts` 內也增加了『啟動』與『打包』的對應指令。
   >
   > 在專案方面，CLI 自動幫我們產生了一個 `stories` 資料夾，並且建立了一些元件範例，方便我們之後參考使用。最後 Storybook 的相關設定檔則在 `.storebook/main.js` 這隻檔案中。
   >
   > ![](https://i.imgur.com/Q6jzlbW.png)

5. **攥寫 story 元件時碰到 `import anonymous` 問題**

   > ![](https://i.imgur.com/zynTAYF.png)
   >
   > 這部分可以直接調整 eslint 的 rules 來允許 anonymous object。
   > 詳細說明可參考：[Assign object to variable before exporting as module default - Borislav Hadzhiev](https://bobbyhadz.com/blog/react-assign-object-to-variable-before-exporting-as-module)
   >
   > ```javascript=
   > /* .eslintrc.json */
   > {
   >  "extends": "next/core-web-vitals",
   >  "rules": {
   >    "import/no-anonymous-default-export": [
   >      "error",
   >      {
   >        "allowObject": true
   >      }
   >    ]
   >  }
   > }
   > ```

6. **啟動 Storybook**
   > 現在我們已經將 Storybook 等相關設定都安裝好了，是時候該來 `yarn storybook` 將整個專案的 Storybook 跑起來看看了 (**ps.預設會跑在 6006 port**)，如果可以看到以下畫面就代表您『安裝的步驟』順利完成了呦！ :+1: e
   >
   > ![](https://i.imgur.com/7u7YbJx.gif)

## 實作基本元件

上面的部分我們已經將整個 Storybook 加入到專案中了，現在我們可以先將先前 CLI 『預設產生在 storites 資料夾下的檔案』都先『刪除』，因為我們要開始來攥寫 Storybook 的基本元件，這邊將會一步一步介紹整個流程。

### 1. storites 資料夾內建立 `Button.jsx` 與 `Button.stories.jsx` 這兩隻檔案

如果是原本 CLI 就有建立的話，可以直接將裡面內容刪光，因此這時您的資料結構大概會長這樣 :point_down: (PS.只剩下這兩隻檔案)

![](https://i.imgur.com/yJp1P0Y.png)

### 2. 攥寫 Button.jsx 元件

我們先寫個最基本的 Button 元件，可以看到元件主要會接收 `styles` 與 `label` 這兩個 props，讓我們等等可以自行設定樣式與文字。

```jsx=
export const Button = ({ styles, label, ...props }) => {
  return (
    <button type='button' style={styles} {...props}>
      {label}
    </button>
  )
}
```

### 3. 攥寫 Button.stories.jsx 檔

上面已經寫了一個基本的 Button 元件，現在我們要開始把它呈現在 Storybook 上，因此我們需要在 `Button.stories.jsx` 中寫上以下內容 :point_down:

```jsx=
import React from 'react'
import { Button } from './Button'

export default {
  title: 'Component/Button', // 路由的部分代表『分類』，因此這邊代表在 Storybook 上會顯示 Component 這個類別，裡面有一個 Button 元件
  component: Button,
}

const Template = (args) => <Button {...args} />

// 建立一個 Small 樣式的 Button 在 Storybook 上
export const Small = Template.bind({})
Small.args = {
  styles: {
    width: '100px',
    height: '24px',
    backgroundColor: 'lightblue',
    color: 'white',
  },
  label: 'SmallButton',
}
// 建立一個 Middle 樣式的 Button 在 Storybook 上
export const Middle = Template.bind({})
Middle.args = {
  styles: {
    width: '150px',
    height: '32px',
    backgroundColor: 'lightblue',
    color: 'white',
  },
  label: 'MiddleButton',
}
```

#### 這段程式碼主要有兩個部分需要討論一下：

1. **bind 的使用**
2. **args 的使用**

**關於 bind 的部分**，可以看到這邊使用了 `bind()` 這個 function 來複製一份 Template 的 function，因此 story 都擁有各自獨立的 reference。

> 補充：
> 這邊並不能使用 `call` 跟 `apply`，因為它們是會回傳『執行完該函式的 return 值』，而 `bind` 則是回傳『擁有新 reference 的該函式』。
>
> **如果對 reference 與 call、apply、bind 不太理解的話，推薦閱讀以下大大們的文章：**
>
> 1. [[JavaScript] 函數原型最實用的 3 個方法 — call、apply、bind - realdennis](https://realdennis.medium.com/javascript-%E8%81%8A%E8%81%8Acall-apply-bind%E7%9A%84%E5%B7%AE%E7%95%B0%E8%88%87%E7%9B%B8%E4%BC%BC%E4%B9%8B%E8%99%95-2f82a4b4dd66)
> 2. [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？ - Huli](https://blog.huli.tw/2018/06/23/javascript-call-by-value-or-reference/)

關於 args 的部分，它是 Storybook 官方特別設置的一個參數，用來將我們所需要的 props 傳遞給到元件，詳細可參考官方文檔 [Storybook’s “args”](https://storybook.js.org/docs/react/writing-stories/args)。

> “Args” are Storybook’s mechanism for defining those arguments in a single JavaScript object. Args can be used to dynamically change props, slots, styles, inputs, etc. It allows Storybook and its addons to live edit components.

#### 先來看一下目前為止的成果：

![](https://i.imgur.com/KtA8ssz.gif)

## Reference

1. [Assign object to variable before exporting as module default - Borislav Hadzhiev](https://bobbyhadz.com/blog/react-assign-object-to-variable-before-exporting-as-module)
2. [[JavaScript] 函數原型最實用的 3 個方法 — call、apply、bind - realdennis](https://realdennis.medium.com/javascript-%E8%81%8A%E8%81%8Acall-apply-bind%E7%9A%84%E5%B7%AE%E7%95%B0%E8%88%87%E7%9B%B8%E4%BC%BC%E4%B9%8B%E8%99%95-2f82a4b4dd66)
3. [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？ - Huli](https://blog.huli.tw/2018/06/23/javascript-call-by-value-or-reference/)
