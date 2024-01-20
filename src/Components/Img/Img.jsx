import React from 'react'

const Img = ({source,alt, style}) => {
  return (
    <img className={style} src={source} alt={alt} />
  )
}

export default Img