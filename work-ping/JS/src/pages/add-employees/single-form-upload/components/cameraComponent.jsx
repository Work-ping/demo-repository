import { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const Camera = () => {
  const [permission, setPermission] = useState('pending') // pending | granted | denied

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        stream.getTracks().forEach(t => t.stop())
        setPermission('granted')
      })
      .catch(() => {
        setPermission('denied')
      })
  }, [])

  if (permission === 'denied') {
    return (
      <div className="text-center text-danger">
        Camera access not given
      </div>
    )
  }

  if (permission === 'pending') {
    return (
      <div className="text-center">
        Requesting camera permission...
      </div>
    )
  }

  return (
    <div className="d-flex justify-content-center">
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
        style={{
          width: '60%',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
    </div>
  )
}

export default Camera
