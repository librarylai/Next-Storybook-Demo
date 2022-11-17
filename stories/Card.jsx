import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CardContainer = styled.div`
  padding: 10px;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'white')};
  border-radius: ${({ square }) => (square ? '0' : '10px')}; // 如果 square 為 true，則 border-radius 為 0，否則為 10%
  border: ${({ variant }) => (variant === 'outlined' ? '1px solid #ccc' : 'none')};
`

const CardTitle = styled.p`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
`

const CardDescription = styled.p`
  font-size: 16px;
`
const CardActions = styled.div`
  padding: 20px 0px;
  display: flex;
  > * {
    margin-right: 8px;
  }
`
function Card({ title, desc, actionChild, ...props }) {
  return (
    <CardContainer {...props}>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{desc}</CardDescription>
      <CardActions>{actionChild}</CardActions>
    </CardContainer>
  )
}

Card.propTypes = {
  /**
     設定 Card 寬度
    */
  width: PropTypes.string,
  /**
     設定 Card 高度
    */
  height: PropTypes.string,
  /**
     設定 Card 背景顏色
    */
  backgroundColor: PropTypes.string,
  /**
     設定 Card 是否為方形
    */
  square: PropTypes.bool,
  /**
     設定 Card 邊框樣式
    */
  variant: PropTypes.oneOf(['outlined', 'contained']),
  /**
     設定 Card 標題
    */
  title: PropTypes.string,
  /**
     設定 Card 內文
    */
  desc: PropTypes.string,
  /**
     設定 Card 行為部分(例如 Button)
    */
  actionChild: PropTypes.node,
}

export default Card
