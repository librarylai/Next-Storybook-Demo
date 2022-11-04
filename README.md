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
