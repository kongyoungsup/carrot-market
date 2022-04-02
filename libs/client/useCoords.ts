import { useEffect, useState } from 'react';

interface TypeUsecoords{
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {

  const [coords, setCoords] = useState<TypeUsecoords>( { latitude: null, longitude: null } );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({
      coords: { latitude, longitude }}: GeolocationPosition) => { 
        setCoords( { latitude, longitude } )
     })
  }, []); 

  return coords

}

