import React from 'react'
import Card from './Card'
import { Small } from './Button.stories'
export default {
  title: 'Component/Card', // 路由的部分代表『分類』，因此這邊代表在 Storybook 上會顯示 Component 這個類別，裡面有一個 Button 元件
  component: Card,
}

const Template = (args) => <Card {...args} />

// 建立一個 Small 樣式的 Button 在 Storybook 上。
export const SimplyCard = Template.bind({})
SimplyCard.args = {
  title: 'Simply Card',
  desc: '這是一張卡片，把想說的話寫在這裡吧！',
  square: false,
  variant: 'outlined',
  actionChild: (
    <>
      {/* 這邊複寫掉原本 Button 的 default color 屬性（default：藍色）*/}
      <Small color={'error'}>取消</Small>
      {/* 這邊使用了 Button 的 Small Story 的參數 */}
      <Small {...Small.args}>確定</Small>
    </>
  ),
}
