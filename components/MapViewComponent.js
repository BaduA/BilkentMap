import React from "react";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

function MapViewComponent({
  datas,
  activeCategory,
  setSelectedItem,
  selectedItem,
}) {
  const [mapRef, updateMapRef] = useState(null);
  const setMapBoundaries = () => {
    if (mapRef === null) {
      return;
    }
    mapRef.setMapBoundaries(
      { latitude: 39.88709208468618, longitude: 32.7654723805642 },
      { latitude: 39.85568258722247, longitude: 32.74104415560945 }
    );
  };
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.all}
      initialRegion={{
        latitude: 39.86913166536849,
        longitude: 32.75579532543298,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
      ref={(ref) => updateMapRef(ref)}
      onMapReady={() => setMapBoundaries()}
      showsUserLocation={true}
      minZoomLevel={14}
    >
      {activeCategory !== "" && (
        <>
          {datas[activeCategory].map((item) => {
            return (
              <Marker
                coordinate={{
                  latitude: item.coordinates[0],
                  longitude: item.coordinates[1],
                }}
                key={item.name}
                onPress={() => {
                  setSelectedItem(item);
                }}
              ></Marker>
            );
          })}
        </>
      )}
      {activeCategory === "" && selectedItem !== null && (
        <>
          <Marker
            coordinate={{
              latitude: selectedItem.coordinates[0],
              longitude: selectedItem.coordinates[1],
            }}
            key={selectedItem.name}
          ></Marker>
        </>
      )}
    </MapView>
  );
}
const styles = StyleSheet.create({
  all: {
    width: "100%",
    height: "100%",
  },
});
export default MapViewComponent;
