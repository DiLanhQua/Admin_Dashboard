import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Biểu tượng marker tùy chỉnh để tránh lỗi thiếu biểu tượng mặc định
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customIcon}></Marker>
    );
  };

  return (
    <MapContainer
  center={[14.0583, 108.2772]} // Tọa độ trung tâm của Việt Nam
  zoom={5}
  style={{ height: '300px', width: '100%' }}
>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;

// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';


// // Biểu tượng marker tùy chỉnh để tránh lỗi thiếu biểu tượng mặc định
// const customIcon = new L.Icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const MapPicker = ({ onLocationSelect }) => {
//   const [position, setPosition] = useState(null);

//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         setPosition(e.latlng);
//         onLocationSelect(e.latlng);
//       },
//     });

//     return position === null ? null : (
//       <Marker position={position} icon={customIcon}></Marker>
//     );
//   };

//   return (
//     <div style={{ height: "500px", width: "100%" }}>
//     <MapContainer center={[14.0583, 108.2772]} zoom={5} style={{ height: "280px", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//     </MapContainer>
//   </div>
  
//   );
// };

// export default MapPicker;

