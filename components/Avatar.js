import Image from 'next/image'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { MdPerson } from 'react-icons/md'

const canUseDOM = typeof window !== 'undefined'

const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

function Avatar({ imageUrl, name, size }) {
  const [showDefaultAvatar, setShowDefaultAvatar] = useState(!imageUrl)
  const imageRef = useRef(null)
  useIsomorphicLayoutEffect(() => {
    if (imageRef.current) {
      // Necessary so we can fallback to the default avatar in case of an error
      imageRef.current.src = imageUrl
    }
  }, [])
  return (
    <div className={`Avatar ${size === 'small' && 'Avatar--small'}`}>
      {showDefaultAvatar ? (
        <MdPerson color="#8E9599" size={18} className="Avatar__icon" />
      ) : (
        <img
          ref={imageRef}
          alt={name}
          src={imageUrl}
          onError={() => setShowDefaultAvatar(true)}
          className="Avatar__image"
        />
      )}
    </div>
  )
}

export default Avatar
