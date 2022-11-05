import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ styles, label, ...props }) => {
  return (
    <button type='button' style={styles} {...props}>
      {label}
    </button>
  )
}

Button.propTypes = {}

Button.defaultProps = {}
