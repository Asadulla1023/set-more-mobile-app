import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import ChevronLeftIcon from "../assets/images/chevron_left.png";

const Header = ({ title, whereShouldIGo }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Image style={[styles.logo, { opacity: 0 }]} source={ChevronLeftIcon} />
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

      <TouchableOpacity
        onPress={() => {
          whereShouldIGo();
        }}
      >
        <Text
          style={{
            color: "#1d90f5",
            fontSize: 16,
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
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
