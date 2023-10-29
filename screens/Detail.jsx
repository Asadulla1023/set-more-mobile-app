import { Linking, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Button } from "@react-native-material/core";

const Detail = ({ navigation, route }) => {
  const { data } = route.params;
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios
      .get(`${process.env.API}/user-list`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "4eb19977-cb6f-40a2-8108-7ce6190b7830",
        },
      })
      .then((res) => setUsers(res.data))
      .catch((e) => console.log(e))
  }, []);

  const bookedUser = users.find((user) => user.t_id === data.t_user);

  const cancelOrder = (id) => {
    axios.patch(`http://168.119.110.233:5000/api/v1/order-update/${id}/`, {
      status: 0
    }, {
      headers: {
        "x-api-key": "4eb19977-cb6f-40a2-8108-7ce6190b7830",
      }
    }).then((res)=> console.log(res.data)).catch((e)=> console.log(e))

    navigation.navigate("home")

  }

  if (data) {
    return (
      <SafeAreaView>
        <Text>{data.time}</Text>
        <Text>{data.day}</Text>
        <Text>
          Ordered -{" "}
          <Text
            style={{
              textTransform: "capitalize",
            }}
          >
            {bookedUser && bookedUser.name}
          </Text>
        </Text>
        <Text>
          Booker's phone number -{" "}
          <Text
            onPress={() => {
              Linking.openURL(`tel:${bookedUser && bookedUser.phone_number}`);
            }}
          >
            {bookedUser && bookedUser.phone_number}
          </Text>
        </Text>
        <Button onPress={()=> {
          cancelOrder(data && data.id)
        }} title="Cancel"/>
      </SafeAreaView>
    );
  }
};

export default Detail;

const styles = StyleSheet.create({});
