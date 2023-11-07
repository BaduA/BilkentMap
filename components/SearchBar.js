import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({
  clicked,
  searchPhrase,
  setSelectedItem,
  setSearchPhrase,
  setClicked,
  searchList,
  modalVisible,
  setActiveCategory
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={30}
            color="black"
            style={{ padding: 2, marginLeft: 10 }}
            onPress={() => {
              setSearchPhrase("");
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        )}
      </View>
      <View style={styles.searchResultsContainer}>
        {searchList.map((element) => {
          return (
            <TouchableOpacity
              style={styles.element}
              onPress={() => {
                modalVisible(false);
                setSearchPhrase("");
                setSelectedItem(element);
                setActiveCategory("")
              }}
              key={element.name}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {element.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    position: "relative",
    zIndex: 5,
  },
  searchResultsContainer: {
    position: "absolute",
    height: 50,
    width: "100%",
    top: "100%",
    borderRadius: 10,
  },
  searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  element: {
    width: "100%",
    height: 50,
    backgroundColor: "#D1D1D1",
    justifyContent: "center",
    padding: 10,
  },
});
