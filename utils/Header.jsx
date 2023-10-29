import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import ChevronLeftIcon from "../assets/images/chevron_left.png";

const Header = ({ title, whereShouldIGo }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=> {
        whereShouldIGo()
      }}>
        <Image style={styles.logo} source={ChevronLeftIcon} />
      </TouchableOpacity>
      <Text
        style={{
          color: "#000",
          fontSize: 23,
          fontWeight: "600",
          // backgroundColor: "#000"
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "transparent",
        }}
      >
        Create
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "1%",
    paddingHorizontal: "3%",
  },
  logo: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
});
