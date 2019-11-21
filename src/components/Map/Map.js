import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as farmsData from '../Map/map-data.json';



function Map(){
    
    const [selectedFarm, setSelectedFarm] = useState(null);

    return(
    <GoogleMap defaultZoom={12.3} defaultCenter={{lat:35.198284, lng:-111.651299}}>

        {farmsData.features.map(farm => (
            <Marker
            key={farm.properties.FARM_ID}
            position={{
                lat:farm.properties.coordinates[0],
                lng:farm.properties.coordinates[1]
            }}
            onClick={() => {
                console.log(farm)
             setSelectedFarm(farm);   
            }}
            />
        ))}
        {selectedFarm && (
          <InfoWindow
          position={{
            lat:selectedFarm.properties.coordinates[0],
            lng:selectedFarm.properties.coordinates[1]
        }}
        onCloseClick={() => {
            setSelectedFarm(null);
        }}
          >
              <div>

              <h2>{selectedFarm.properties.NAME}</h2>
              <href>{selectedFarm.properties.website}</href>
              </div>
          </InfoWindow>  
        )}
        </GoogleMap>
    )

    

    }


    const WrappedMap = withScriptjs(withGoogleMap(Map));
export default function MyMap(){
    
        return <div style={{ width: '100vw', height: '100vh'}}>
            <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry.drawing.places&key=` + process.env.REACT_APP_GOOGLEKEY }
            loadingElement={<div style={{ height: "100%" }}/>}
            containerElement={<div style={{ height: "100%"}}/>}
            mapElement={<div style={{height: "100%"}}/>}
            />
        </div>
    }

