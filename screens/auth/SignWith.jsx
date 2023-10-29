import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../utils/Header";
import GoogleIcon from "../../assets/images/google.png";
import FaceBookIcon from "../../assets/images/facebook.png";

const SignWith = ({navigation}) => {
    const redirect = () => {
        navigation.navigate("login")
    }
  return (
    <SafeAreaView style={{backgroundColor: "#fff"}}>
      <Header title={"Create an account"} whereShouldIGo={redirect}/>
      <View
        style={{
          paddingHorizontal: "8%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
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
            navigation.navigate("Sign up");
          }}
          style={[styles.signWith, { backgroundColor: "#1d90f5" }]}
        >
          <Text style={{ color: "#fff" }}>Sign in with email</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default SignWith;


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
  });
