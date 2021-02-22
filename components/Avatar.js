import Image from 'next/image'
import { useState } from 'react'
import { MdPerson } from 'react-icons/md'

function Avatar({ imageUrl, name, size }) {
  const pixelSize = size === 'small' ? 34 : 66
  const [shouldFallback, setShouldFallback] = useState(!imageUrl)
  return (
    <div className={`Avatar ${size === 'small' && 'Avatar--small'}`}>
      {shouldFallback ? (
        <MdPerson color="#8E9599" size={18} className="Avatar__icon" />
      ) : (
        <Image
          alt={name}
          src={imageUrl}
          width={pixelSize}
          height={pixelSize}
          onError={() => setShouldFallback(true)}
          className="Avatar__image"
        />
      )}
    </div>
  )
}

export default Avatar
