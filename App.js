import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Callout } from "react-native-maps";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Menu from "./components/Menu";
import MarkerDetails from "./components/MarkerDetails";
import MapViewComponent from "./components/MapViewComponent";


export default function App() {
  const [modal, modalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const datas = require("./places.json").MenuItems;

  return (
    <View style={styles.view}>
      <MapViewComponent
        activeCategory={activeCategory}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        datas={datas}
      />
      {selectedItem !== null && (
        <MarkerDetails
          setSelectedItem={(a) => {
            setSelectedItem(a);
          }}
          item={selectedItem}
        />
      )}
      <Callout style={styles.button}>
        <TouchableOpacity
          style={[styles.touchable]}
          onPress={() => modalVisible(true)}
        >
          <Text style={styles.touchableText}>
            <FontAwesomeIcon
              size={25}
              icon={faChevronLeft}
              onPress={() => modalVisible(true)}
            />
          </Text>
        </TouchableOpacity>
      </Callout>
      {activeCategory && (
        <Callout style={styles.headingCallout}>
          <TouchableOpacity
            onPress={() => {
              setActiveCategory("");
            }}
          >
            <Text style={styles.activeHeading}>{activeCategory}</Text>
          </TouchableOpacity>
        </Callout>
      )}

      <Menu
        datas={datas}
        setActiveCategory={(a) => {
          setActiveCategory(a);
        }}
        modalVisible={(a) => modalVisible(a)}
        modal={modal}
        setSelectedItem={setSelectedItem}
      ></Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  all: {
    width: "100%",
    height: "100%",
  },
  touchable: {
    paddingVertical: 100,
    paddingHorizontal: 10,
    margin: 10,
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 100,
    left: Dimensions.get("window").width - 60,
  },
  activeHeading: {
    color: "black",
    paddingHorizontal: 10,
    margin: 10,
    fontSize: 35,
    fontWeight: "bold",
  },
  headingCallout: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(192,192,192,0.6)",
  },
});
