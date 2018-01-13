import React from 'react'
import MdPerson from 'react-icons/lib/md/person'

const Avatar = ({ imageUrl, size }) => (
  <div className={`Avatar ${size === 'small' && 'Avatar--small'}`}>
    {imageUrl ? (
      <img src={imageUrl} className="Avatar__image" />
    ) : (
      <MdPerson color="#8E9599" size={18} className="Avatar__icon" />
    )}
  </div>
)

export default Avatar
