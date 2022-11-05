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
