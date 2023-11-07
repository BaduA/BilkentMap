import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "./SearchBar";

function Menu({
  datas,
  modalVisible,
  setActiveCategory,
  modal,
  setSelectedItem,
}) {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    if (searchPhrase !== "") {
      let copySearchList = [];
      for (const [key, value] of Object.entries(datas)) {
        if (copySearchList.length >= 5) {
          break;
        }
        try {
          value.forEach((element) => {
            if (copySearchList.length >= 5) {
              throw new Error("Break");
            }
            let boolList = [];
            for (let i = 0; i < searchPhrase.length; i++) {
              if (
                element.name
                  .toLowerCase()
                  .includes(searchPhrase[i].toLowerCase()) === false
              ) {
                boolList.push(false);
              } else {
                boolList.push(true);
              }
            }
            if (boolList.includes(false) !== true) {
              copySearchList.push(element);
            }
          });
        } catch (err) {}
      }
      setSearchList(copySearchList);
    } else {
      setSearchList([]);
    }
  }, [searchPhrase]);
  return (
    <Modal visible={modal}>
      <View style={styles.modalView}>
        <Text style={{ fontSize: 30 }}>Menü</Text>
        <SearchBar
          clicked={clicked}
          setClicked={setClicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          searchList={searchList}
          modalVisible={modalVisible}
          setSelectedItem={setSelectedItem}
          setActiveCategory={setActiveCategory}
        ></SearchBar>
        <View style={styles.menu}>
          {Object.keys(datas).map((item) => {
            return (
              <TouchableOpacity
                style={styles.menuItem}
                key={item}
                onPress={() => {
                  setActiveCategory(item);
                  modalVisible(false);
                  setSelectedItem(null);
                }}
              >
                <Text style={{ fontSize: 18 }}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={[styles.touchable]}
          onPress={() => modalVisible(false)}
        >
          <Text style={styles.touchableText}>
            <FontAwesomeIcon
              size={25}
              icon={faChevronRight}
              onPress={() => modalVisible(false)}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 100,
    paddingHorizontal: 10,
    margin: 10,
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 100,
    left: Dimensions.get("window").width - 60,
  },
  modalView: {
    backgroundColor: "#C1C1C1",
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  menuItem: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#68a0cf",
    maxHeight: 50,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    zIndex: 1,
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 20,
  },
});

export default Menu;
