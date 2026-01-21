import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'

const LocationPicker = ({ setLat, setLng }) => {
  const [pos, setPos] = useState(null)

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        setPos(e.latlng)
        setLat(e.latlng.lat)
        setLng(e.latlng.lng)
      },
    })
    return null
  }

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: 250 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler />
      {pos && <Marker position={pos} />}
    </MapContainer>
  )
}  
export default LocationPicker;