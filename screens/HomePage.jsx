import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, Agenda, AgendaList } from "react-native-calendars";
import Footer from "../utils/Footer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

import { useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

let l = 0;

let objLatest;

const HomePage = ({ navigation }) => {
  const [latest, setLatest] = useState();
  const [items, setItems] = useState({});
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const date = new Date();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification(expoPushToken, value) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: `Booked ${value.day}`,
      body: "And here is the body!",
      data: { someData: "goes here" },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    // refreshPage()
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [250, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    axios
      .get(`${process.env.API}/order-list/booked`, {
        headers: {
          "x-api-key": "4eb19977-cb6f-40a2-8108-7ce6190b7830",
        },
      })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response.notification);
    });

    if (data.length > length) {
      let delta = data.length - length;
      setLatest(data.splice(-1, data.length - delta));
      console.log(latest);
      try {
        const v = AsyncStorage.setItem("@latest", JSON.stringify(latest));
        console.log(v);
      } catch (e) {
        console.log(e);
      }
    }
    setLength(data.length);
  });

  const getLatest = async () => {
    try {
      const value = await AsyncStorage.getItem("@latest");
      console.log(value[1]);
      value && sendPushNotification(expoPushToken, value);
    } catch (error) {
      console.log(error);
    }
  };
  getLatest()

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = 1;
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              height: Math.max(10, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    const dtr = data.filter((dt) => dt.day === item.day);
    return (
      <Pressable
        style={[styles.item]}
        onPress={() => {
          navigation.navigate("service", { item: item.day });
        }}
        key={`${item}`}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            paddingHorizontal: "2%",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {dtr &&
              dtr.map((d, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("detail", { data: d });
                    }}
                  >
                    <Text
                      key={Math.random()}
                      style={[
                        {
                          width: "100%",
                          fontSize: 15,
                        },
                        index !== 0
                          ? {
                              marginTop: 10,
                            }
                          : null,
                      ]}
                    >
                      {d ? d.time : "No appointment"} -{" "}
                      {d.product_id === 1
                        ? "Katta stadion"
                        : d.product_id === 2
                        ? "Kichkina stadion"
                        : "Chimboy stadion"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          <Icon name="plus" size={20} color={"#00ADF5"} />
        </View>
      </Pressable>
    );
  };

  const refreshPage = React.useCallback(() => {
    axios
      .get(`${process.env.API}/order-list/booked`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "4eb19977-cb6f-40a2-8108-7ce6190b7830",
        },
      })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.container}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={`${date.getFullYear()}-0${
            date.getMonth() + 1
          }-${date.getDate()}`}
          refreshControl={null}
          showClosingKnob={true}
          refreshing={false}
          renderItem={renderItem}
          maxToRenderPerBatch={20}
          hideKnob={true}
          onRefresh={refreshPage}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "2%",
            paddingVertical: "1.1%",
          }}
        >
          <Text
            style={{
              color: "#545454",
            }}
            onPress={() => {
              navigation.navigate("notific");
            }}
          >
            This week's confirmed revenue: 0
          </Text>
          <Icon
            name="chevron-right"
            size={25}
            color={"#545454"}
            maxFontSizeMultiplier={400}
          />
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    backgroundColor: "#fff",
  },
});
