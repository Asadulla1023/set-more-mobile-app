import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  Touchable,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";

import LogoImg from "../assets/images/setmore-logo.png";
import GoogleIcon from "../assets/images/google.png";
import FaceBookIcon from "../assets/images/facebook.png";

import { SafeAreaView } from "react-native-safe-area-context";
const Register = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.container}>
        <Image
          source={LogoImg}
          style={{
            width: 180,
            height: 50,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <View style={styles.register}>
          <View style={styles.signWith}>
            <Image
              source={FaceBookIcon}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text>Sign in with FaceBook</Text>
          </View>
          <View style={styles.signWith}>
            <Image
              source={GoogleIcon}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text>Sign in with Google</Text>
          </View>
          <Text style={{ textAlign: "center", marginVertical: "4%" }}>
            Or Use
          </Text>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Log in");
            }}
            style={[styles.signWith, { backgroundColor: "#1d90f5" }]}
          >
            <Text style={{ color: "#fff" }}>Sign in with email</Text>
          </TouchableHighlight>
          <Text style={{ textAlign: "center", marginVertical: "6%" }}>
            New to Setmore?
          </Text>
          <View style={styles.signWith}>
            <Text
              style={{ color: "#1d90f5" }}
              onPress={() => {
                navigation.navigate("Sign with");
              }}
            >
              Create an account{" "}
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#000",
                }}
              >
                - free
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    height: "100%",
    paddingVertical: "20%",
    paddingHorizontal: "8%",
  },
  register: {
    height: "70%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  signWith: {
    width: "100%",
    borderColor: "#d9e1ee",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    height: 50,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
});
