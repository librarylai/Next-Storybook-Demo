import React from 'react'

import CardList from './CardList'
import { SimplyCard } from './Card.stories'
import { Middle } from './Button.stories'

// 透過 假資料 的方式，在 CardList 上建立多個 Card 的 Story
const MOCK_LIST_DATA = [
  {
    ...SimplyCard.args, // 使用 SimplyCard.args 參數當作 CardList 的資料
  },
  {
    // 透過自己設定 Object 的方式，建立 CardList 的資料
    title: '我是卡片標題',
    desc: '使用 Object 方式當作資料',
    actionChild: (
      <>
        <Middle {...Middle.args}>使用 Button Story 的 Middle 按鈕</Middle>
      </>
    ),
    backgroundColor: '#dedbc2',
  },
]

export default {
  title: 'Component/CardList',
  component: CardList,
}

const Template = (args) => <CardList {...args} />

export const SimplyCardList = Template.bind({})
SimplyCardList.args = {
  data: MOCK_LIST_DATA,
}
