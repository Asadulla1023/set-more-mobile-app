import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../utils/Header";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogIn = ({ navigation }) => {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const redirect = () => {
    navigation.navigate("login");
  };

  const checkUser = async () => {
    await AsyncStorage.getItem("@user").then((user) => {
      if (JSON.parse(user).email === email && JSON.parse(user).password === password) {
        Alert.alert(`Welcome ${JSON.parse(user).name}`)
        navigation.navigate("setUser")
      } else{ 
        Alert.alert("user not found")
      }
    })
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <Header title={"Sign in"} whereShouldIGo={redirect} />
        <View style={styles.form}>
          <Text>Email</Text>
          <View style={styles.label}>
            <TextInput
              style={{
                paddingBottom: 10,
                fontSize: 17,
              }}
              placeholder="name@domain.com"
              onChangeText={(text) => setEmail(text)}
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
              style={[styles.signWith, { backgroundColor: "#1d90f5" }]}
              onPress={() => {
                checkUser();
              }}
            >
              <Text style={{ color: "#fff" }}>Sign in</Text>
            </TouchableHighlight>
          <Text
            style={{
              color: "#1d90f5",
              textAlign: "center",
            }}
          >
            Forgot password
          </Text>
        </View>
        <TouchableOpacity onPress={()=> {
          navigation.navigate("Sign with")
        }}>
        <Text
          style={{
            color: "#1d90f5",
            textAlign: "center",
            fontSize: 17,
          }}
        >
          Create an account{" "}
          <Text style={{ color: "#000", textTransform: "uppercase" }}>
            - free
          </Text>
        </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
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
  label: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#909090",
    borderBottomWidth: 1,
    marginBottom: 60,
  },
  form: {
    paddingHorizontal: "8%",
  },
});
