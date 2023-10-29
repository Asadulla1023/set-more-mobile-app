import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Footer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <Icon name="calendar-week" size={35} color={"#00ADF5"} />
        <Text
          style={{
            fontSize: 8,
            color: "#00ADF5",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Calendar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <Icon name="call-split" size={35} color={"#909090"} />
        <Text
          style={{
            fontSize: 8,
            color: "#909090",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Activity
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <Icon name="account-multiple" size={35} color={"#909090"} />
        <Text
          style={{
            fontSize: 8,
            color: "#909090",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Customers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <Icon name="folder-account-outline" size={35} color={"#909090"} />
        <Text
          style={{
            fontSize: 8,
            color: "#909090",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <Icon name="backburger" size={35} color={"#909090"} />
        <Text
          style={{
            fontSize: 8,
            color: "#909090",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
    justifyContent: "space-between",
    borderBottomColor: "#D7D7D7",
    borderTopColor: "#D7D7D7",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});
