import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Callout } from "react-native-maps";

function MarkerDetails({ setSelectedItem, item }) {
  return (
    <Callout style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(null);
        }}
      >
        <FontAwesomeIcon
          icon={faX}
          style={styles.icon}
          size={25}
        ></FontAwesomeIcon>
      </TouchableOpacity>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.goTo}
        onPress={() => {
          const scheme = Platform.select({
            ios: "maps://0,0?q=",
            android: "geo:0,0?q=",
          });
          const latLng = `${item.coordinates[0]},${item.coordinates[1]}`;
          const label = item.name;
          const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
          });

          Linking.openURL(url);
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Git
        </Text>
      </TouchableOpacity>
    </Callout>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  icon: {
    color: "red",
    marginLeft: "auto",
    marginTop: 10,
    fontWeight: "bold",
  },
  itemName: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
  },
  goTo: {
    backgroundColor: "#00C4FF",
    borderRadius: 15,
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
});
export default MarkerDetails;
