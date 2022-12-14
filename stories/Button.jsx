import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//  依照 Size 取得 Button 尺寸
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
//  依照 Color 取得 Button 主題顏色
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
    case 'error':
      return {
        backgroundColor: 'red',
        color: 'white',
      }
  }
}

const ButtonStyled = styled.button`
  border: none;
  cursor: pointer;
  ${({ size }) => getButtonSize(size)}
  ${({ color }) => getButtonColor(color)}
`

export const Button = ({ children, size, color, styles, label, onClick, ...props }) => {
  return (
    <ButtonStyled color={color} size={size} style={styles} onClick={onClick} {...props}>
      {children ? children : label}
    </ButtonStyled>
  )
}

Button.propTypes = {
  /**
   設定 Button 文字
  */
  label: PropTypes.string,
}

Button.defaultProps = {
  label: 'Button Label',
}
