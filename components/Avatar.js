import React from 'react'

const Avatar = ({ imageUrl, size }) => (
  <div className={ `Avatar ${ size === 'small' && 'Avatar--small' }` } >
  {
    imageUrl &&
      <img src={imageUrl} className="Avatar__image" />
  }
  </div>
)

export default Avatar
