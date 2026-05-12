import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { CITIES } from '../data/mockData'

const CITY_COORDS = {
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi NCR': { lat: 28.6139, lng: 77.2090 },
  'Bengaluru': { lat: 12.9716, lng: 77.5946 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
}

const getMarkerColor = (count) => {
  if (count > 200) return '#47bf72'
  if (count >= 100) return '#f59e0b'
  return '#ef4444'
}

export default function MapView() {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ width: '100%', height: '280px', borderRadius: '12px' }}
      className="z-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
        opacity={0.95}
      />

      {CITIES.map(city => {
        const coords = CITY_COORDS[city.name]
        if (!coords) return null

        const radius = Math.max(city.count / 12, 3)
        const color = getMarkerColor(city.count)

        return (
          <CircleMarker
            key={city.name}
            center={[coords.lat, coords.lng]}
            radius={radius}
            fillColor={color}
            color={color}
            weight={1}
            opacity={1}
            fillOpacity={0.5}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-emb-textprimary">{city.name}</div>
                <div className="text-emb-textsecondary text-xs mt-1">
                  {city.count} assets
                </div>
                <div className="text-emb-textsecondary text-[10px] mt-2 italic">
                  Click to filter
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
