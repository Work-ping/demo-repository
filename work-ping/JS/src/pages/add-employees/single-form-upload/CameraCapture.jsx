import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const [isCaptured, setIsCaptured] = useState(false)

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    streamRef.current = stream
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    streamRef.current = null
  }

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  const capture = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    stopCamera()
    setIsCaptured(true)

    const pixels = new Uint8Array(
      ctx.getImageData(0, 0, canvas.width, canvas.height).data
    )

    const hashBuffer = await crypto.subtle.digest('SHA-256', pixels)
    const hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    console.log('ENCRYPTED PIXEL HASH (CAMERA):', hash)

    onCapture?.({
      source: 'camera',
      hash
    })
  }

  const retake = () => {
    setIsCaptured(false)
    startCamera()
  }

  return (
    <>
     
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="100%"
        style={{ display: isCaptured ? 'none' : 'block' }}
      />

      
      <canvas
        ref={canvasRef}
        style={{
          display: isCaptured ? 'block' : 'none',
          width: '100%'
        }}
      />

      {!isCaptured && (
        <Button className="mt-3" onClick={capture}>
          Capture Face
        </Button>
      )}

      {isCaptured && (
        <Button variant="secondary" className="mt-3" onClick={retake}>
          Retake
        </Button>
      )}
    </>
  )
}

export default CameraCapture
