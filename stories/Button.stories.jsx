import React from 'react'
import { Button } from './Button'

export default {
  title: 'Component/Button', // 路由的部分代表『分類』，因此這邊代表在 Storybook 上會顯示 Component 這個類別，裡面有一個 Button 元件
  component: Button,
  decorators: [
    // Story 參數代表我們 Button 的 Small、Middle 這些 Story 元件
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
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

const Template = (args) => <Button {...args} />

// 建立一個 Small 樣式的 Button 在 Storybook 上
export const Small = Template.bind({})
Small.args = {
  size: 'small',
  color: 'primary',
  label: 'SmallButton',
}
// 建立一個 Middle 樣式的 Button 在 Storybook 上
export const Middle = Template.bind({})
Middle.args = {
  size: 'middle',
  color: 'secondary',
  label: 'MiddleButton',
}
