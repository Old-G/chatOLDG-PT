import React, { useEffect, useState } from 'react'

const useStorage = (storageName: string) => {
  const [empty, setEmpty] = useState(true)

  const checkStorage = (key: string) => {
    const storedData = localStorage.getItem(key)
    if (!storedData) {
      setEmpty(true)
      console.log('Local storage is empty')
    } else {
      setEmpty(false)
    }
  }

  useEffect(() => {
    // when app loaded
    checkStorage(storageName)

    // when storage updated
    const handler = ({ key }: { key: any }) => checkStorage(key)
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [storageName])

  return { empty }
}

export default useStorage
