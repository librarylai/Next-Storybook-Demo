# 【筆記】Storybook 系列(一) - Storybook 安裝與基本教學

###### tags: `筆記文章`

![](https://i.imgur.com/63MNo1t.png)

## 安裝 Storybook

1. **建立一個 Next 專案或是 Create-react-app 專案**

   > yarn create next-app next-storybook (這邊以 Next.js 舉例)

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

## 初階 - 學習建立一個最基本的 Story 元件

上面的部分我們已經將整個 Storybook 加入到專案中了，現在我們可以先將先前 CLI 『預設產生在 storites 資料夾下的檔案』都先『刪除』，因為我們要開始來攥寫 Storybook 的基本元件，這邊將會一步一步介紹整個流程。

### 1. storites 資料夾內建立 `Button.jsx` 與 `Button.stories.jsx` 這兩隻檔案

如果是原本 CLI 就有建立的話，可以直接將裡面內容刪光，因此這時您的資料結構大概會長這樣 :point_down: (PS.只剩下這兩隻檔案)

![](https://i.imgur.com/yJp1P0Y.png)

### 2. 攥寫 Button.jsx 元件

我們先寫個最基本的 Button 元件，可以看到元件主要會接收 `styles` 與 `label` 這兩個 props，讓我們等等可以自行『設定樣式』與『按鈕文字』。

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

沒意外應該可以看到我們剛剛所寫的 `Small` 與 `Middle` 這兩個 Story Button 才對，如果有正確看到就代表目前『初階』的練習已經算是完成了呦！！ :+1:

![](https://i.imgur.com/KtA8ssz.gif)

## 初階二 - 做一個類似 MUI 或 Antd 的 Button

到目前為止，我們已經學習到了最基本攥寫 Story 的方法了，接下來我們要回來改寫一下前面的 Button 元件，因為我們總不能都一直透過 `styles` 來調整元件樣式吧，這樣不僅每次都得寫一大堆 CSS 程式碼也不好閱讀，而且沒有規範。

一般在開發上，設計師會規範整個網站的 UIKit，例如 Button 有哪些顏色主題、哪些尺寸...等，因此我們應該朝這種方向來設計我們的元件，像是透過`color`、`size`...等屬性來設定『按鈕顏色』、『按鈕尺寸』。

> **補充：**
> 這邊會使用到 styled-components 來攥寫 Button 元件，因此要麻煩讀者們安裝一下，如果還不會 styled-components 的讀者可參考 [styled-components 官方](https://styled-components.com/docs/basics#getting-started)
>
> `yarn add styled-components`

### 調整 Button.jsx 元件 - 使用 Styled-components

現在我們重新調整 Button 元件，首先我們需要讓使用者能夠傳入 `color` 與 `size` 這兩個 props，因此我們先將 Button 元件調整成 :point_down:

```jsx=
// 增加 size 與 color 這兩個 props
export const Button = ({ size, color, styles, label, ...props }) => {
  return (
    // ButtonStyled 為 styled-component
    <ButtonStyled color={color} size={size} style={styles} {...props}>
      {label}
    </ButtonStyled>
  )
}
```

接著，我們將這些 Props 傳給 Styled-components 並且依照我們所制定的規範來產生對應的 Button 尺寸與顏色。(PS. 這邊只有簡單寫幾個，詳細可自行依造專案情況設定。)

> **尺寸(Size)規範：**
> small: { width: '100px' , height:'24px'}
> middle: { width: '150px' , height:'32px'}
>
> **顏色(Color)規範：**
> primary: lightblue
> secondary: lightgreen

```jsx=

// 依照 Size 取得 Button 尺寸
const getButtonSize = (size) => {
  switch (size) {
    default:
    case 'small':
      return {
        width: '100px',
        height: '24px',
      }
    case 'middle':
      return {
        width: '150px',
        height: '32px',
      }
  }
}
// 依照 Color 取得 Button 主題顏色
const getButtonColor = (color) => {
  switch (color) {
    default:
    case 'primary':
      return {
        backgroundColor: 'lightblue',
        color: 'white',
      }
    case 'secondary':
      return {
        backgroundColor: 'lightgreen',
        color: 'white',
      }
  }
}
// styled-component 部分
const ButtonStyled = styled.button`
  border: none;
  ${({ size }) => getButtonSize(size)}
  ${({ color }) => getButtonColor(color)}
`
```

### 調整 Button.stories.jsx - 使用 color 與 size 屬性

現在我們需要將 Button 的 Story 改成使用 `color` 與 `size` 這兩個屬性來傳入，因此程式碼會變成這樣 :point_down:

#### Ps.兩者比較起來，是不是變的好閱讀了許多呀！!

```jsx=
// Button.stories.jsx
/*...省略...*/
// 建立一個 Small 樣式的 Button 在 Storybook 上
export const Small = Template.bind({})
Small.args = {
  size: 'small', // 調整這邊...
  color: 'primary',// 調整這邊...
  label: 'SmallButton',
}
// 建立一個 Middle 樣式的 Button 在 Storybook 上
export const Middle = Template.bind({})
Middle.args = {
  size: 'middle',// 調整這邊...
  color: 'secondary',// 調整這邊...
  label: 'MiddleButton',
}

----------------------
/* Before */
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

#### 最後來看一下這次更動後的成果吧：

![](https://i.imgur.com/2XEHB0z.gif)

## 初階三 - 從面板(Controls)自行調整各種樣式

上面的部分我們增加了 `color` 與 `size` 這兩個屬性，可以注意看一下上面圖片中有個 **Controls** 的部分可以讓我們自行輸入去操作元件，就像是我們透過 Console 中的 Element 去改變 DOM 的樣式一樣。

仔細觀查一下可以發現，目前 **Controls** 中的 `color` 與 `size` 這兩個屬性都需要輸入一些『特定的字串』，例如：`small`、`middle`、`primary`...等才能正常渲染出對應的樣式。

但我們總不可能讓 PM 或 設計師每次都自己手動輸入這些特定文字，而且也容易造成打錯字等問題，因此這邊會使用到 **argTypes** 這個參數來設定。

### 調整 Button.stories.jsx - 使用 argTypes 控制參數

在開始使用 **ArgTypes** 之前，首先我們要先好好了解一下這個特殊的參數。

> ArgTypes are a first-class feature in Storybook for specifying the behaviour of Args. By specifying the type of an arg, you constrain the values that it can take and provide information about args that are not explicitly set

簡單來說就是，我們可以『**透過 ArgTypes 來對 Args 裡面的參數做一些設定**』，像是補上描述(description)或是欄位在 Control 中的呈現方式(type)...等，詳細細節可參考 [ArgsTable - Storybook Doc](https://storybook.js.org/docs/react/writing-docs/doc-block-argstable)

```jsx=
export default {
  title: 'Component/Button', // 路由的部分代表『分類』，因此這邊代表在 Storybook 上會顯示 Component 這個類別，裡面有一個 Button 元件
  component: Button,
  argTypes: {
    size: {
      options: ['small', 'middle'], // 我們所自定義的 Size 規範
      control: { type: 'radio' }, // 使用 radio 方式呈現
      description: '用來設定 Button 的尺寸',
      table: {
        defaultValue: {
          summary: 'small',
        },
      },
    },
    color: {
      options: ['primary', 'secondary'], // 我們所自定義的 Color 規範
      control: { type: 'radio' }, // 使用 radio 方式呈現
      description: '用來設定 Button 的主題顏色',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
  },
}
```

#### 讓我們來看看調整完的成果！！！

在 **Description** 與 **Default** 方面，除了 **ArgTypes** 可以設定之外，也可以透過 Component 中的 **defaultProps** 與 **propTypes** 來做設定，因此如果原本在開發元件時就有習慣寫 defaultProps 與 propTypes 參數的話就『不用』在 ArgTypes 中再寫一次了。

> 補充：如果兩者都有設定，顯示會以 ArgTypes 為主。

![](https://i.imgur.com/Ik7rbHA.png)

## Reference

1. [Assign object to variable before exporting as module default - Borislav Hadzhiev](https://bobbyhadz.com/blog/react-assign-object-to-variable-before-exporting-as-module)
2. [[JavaScript] 函數原型最實用的 3 個方法 — call、apply、bind - realdennis](https://realdennis.medium.com/javascript-%E8%81%8A%E8%81%8Acall-apply-bind%E7%9A%84%E5%B7%AE%E7%95%B0%E8%88%87%E7%9B%B8%E4%BC%BC%E4%B9%8B%E8%99%95-2f82a4b4dd66)
3. [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？ - Huli](https://blog.huli.tw/2018/06/23/javascript-call-by-value-or-reference/)
