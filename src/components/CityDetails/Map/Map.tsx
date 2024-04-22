import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { FC } from 'react';
type Props = {
  mapCenter: { lat: number; lng: number };
};
const Map: FC<Props> = ({ mapCenter }) => {
  return (
    <div className='bg-white border  opacity-100 h-[400px]  w-full xl:w-[50%] rounded-[30px] overflow-hidden z-10'>
      <LoadScript googleMapsApiKey='AIzaSyDOVIKhKSqry9MShoZ1ZyEnRvFQdkI56RI'>
        <GoogleMap
          key={`${mapCenter?.lat}-${mapCenter?.lng}`}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={10}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
