import React, { PropTypes } from 'react'

var style = {
  width: '200px',
  height: '200px',
  transition: '1s all ease',
  background: props.color,
  margin: '25px'
}

const Square = (props) => {
  return (
    <div style={style} onClick={props.handleClick} data-id={props.id}>
    </div>
  )
}

export default Square
