import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "../../utils/Header";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [eye, setEye] = useState(false);
  const [data, setData] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const redirect = () => {
    navigation.navigate("Sign with");
  };
  const storeData = async () => {
    try {
      const jsonValue = {
        name: name,
        email: email,
        password: password,
      };
      await AsyncStorage.setItem("@user", JSON.stringify(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <Header title={"Create an account"} whereShouldIGo={redirect} />
      <View style={styles.container}>
        <Text>Name</Text>
        <View style={styles.label}>
          <TextInput
            style={{
              paddingBottom: 10,
              fontSize: 17,
            }}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
            placeholderTextColor={"#a0a0a0"}
          />
        </View>
        <Text>Email</Text>
        <View style={styles.label}>
          <TextInput
            style={{
              paddingBottom: 10,
              fontSize: 17,
            }}
            onChangeText={(text) => setEmail(text)}
            placeholder="name@domain.com"
            placeholderTextColor={"#a0a0a0"}
          />
        </View>
        <Text>Password</Text>
        <View style={styles.label}>
          <TextInput
            style={{
              paddingBottom: 10,
              fontSize: 17,
            }}
            secureTextEntry={!eye}
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={"#a0a0a0"}
          />
          <Icon
            name={eye ? "eye-off" : "eye"}
            size={20}
            onPress={() => {
              setEye(!eye);
            }}
          />
        </View>
        <TouchableHighlight
          onPress={() => {
            storeData();
            navigation.navigate("setUser");
          }}
          style={[styles.signWith, { backgroundColor: "#1d90f5" }]}
        >
          <Text style={{ color: "#fff" }}>Create an account</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    paddingVertical: "20%",
    paddingHorizontal: "8%",
  },
  label: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#909090",
    borderBottomWidth: 1,
    marginBottom: 60,
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
