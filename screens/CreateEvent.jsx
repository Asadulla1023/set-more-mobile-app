import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "../assets/images/chevron_left.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";

import { useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";



const CreateEvent = ({ navigation, route }) => {
  const { data } = route.params;

  const [dataUser, setDataUser] = useState();
  const [counter, setCounter] = useState("");
  const [time, setTime] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [length, setLength] = useState(0);
  const [latest, setLatest] = useState();
  const [dataDT, setDataDT] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@user");
      // const someV = await AsyncStorage.getItem("@job");
      setDataUser(JSON.parse(value));
      // setJob(JSON.parse(someV))
    } catch (error) {
      console.log(error);
    }
  };
  getData();

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: true,
  //     shouldSetBadge: false,
  //   }),
  // });
  
  // // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: "default",
  //     title: `Mushs${latest.day}`,
  //     body: "And here is the body!",
  //     data: { someData: "goes here" },
  //   };
  //   // console.log(latest)
  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }
  
  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     // console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }
  
  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [250, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }
  
  //   return token;
  // }

  useEffect(() => {
    axios
      .get(`${process.env.API}/order-list/booked`, {
        headers: {
          "x-api-key": "4eb19977-cb6f-40a2-8108-7ce6190b7830",
        },
      })
      .then((res) => setDataDT(res.data))
      .catch((e) => console.log(e));
  }, []);

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //       console.log(notification)
  //     });
  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // })
  

  const date = new Date();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.warn("A date has been picked: ", time);
    setTime(time);
    hideDatePicker();
  };

  const dt = new Date(data);
  const dates = [
    {
      date: 0,
      day: "Sun",
    },
    {
      date: 1,
      day: "Mon",
    },
    {
      date: 2,
      day: "Tue",
    },
    {
      date: 3,
      day: "Wed",
    },
    {
      date: 4,
      day: "Thu",
    },
    {
      date: 5,
      day: "Fri",
    },
    {
      date: 6,
      day: "Sat",
    },
  ];
  const months = [
    {
      monthQueue: 1,
      month: "Jan",
    },
    {
      monthQueue: 2,
      month: "Feb",
    },
    {
      monthQueue: 3,
      month: "Mar",
    },
    {
      monthQueue: 4,
      month: "Apr",
    },
    {
      monthQueue: 5,
      month: "May",
    },
    {
      monthQueue: 6,
      month: "Jun",
    },
    {
      monthQueue: 7,
      month: "Jul",
    },
    {
      monthQueue: 8,
      month: "Aug",
    },
    {
      monthQueue: 9,
      month: "Sep",
    },
    {
      monthQueue: 10,
      month: "Oct",
    },
    {
      monthQueue: 11,
      month: "Nov",
    },
    {
      monthQueue: 12,
      month: "Dec",
    },
  ];
  const selectedDay = dates.find((date) => date.date === dt.getDay());
  const selectedMonth = months.find(
    (month) => month.monthQueue === dt.getMonth() + 1
  );

  const handlePost = () => {
    axios.post(
      `http://168.119.110.233:5000/api/v1/order-list/`,
      {
        t_user: 6024248780,
        product_id: 1,
        admin_id: 1,
        cat: 2,
        username: null,
        phone_number: null,
        day: `${data}`,
        time: "21:00 - 22:00",
        status: 1,
        created_at: `${date}`,
      },
      {
        headers: {
          "x-api-key": "4eb19977-cb6f-40a2-8108-7ce6190b7830",
          "Content-Type": "application/json",
        },
      }
    );
    navigation.navigate("home");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={[styles.logo]} source={ChevronLeftIcon} />
        </TouchableOpacity>
        <Text
          style={{
            color: "#000",
            fontSize: 23,
            fontWeight: "600",
            // backgroundColor: "#000"
          }}
        >
          New Event
        </Text>

        <TouchableOpacity
          onPress={() => {
            handlePost();
          }}
        >
          <Text
            style={{
              color: "#1d90f5",
              fontSize: 15,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: "3%",
        }}
      >
        <TouchableOpacity style={styles.select}>
          <Text
            style={{
              fontSize: 13,
              color: "#909090",
            }}
          >
            Name {`${counter.length}/500`}
          </Text>
          <View style={styles.selection}>
            <TextInput
              placeholder="Lunch, Meeting, etc..."
              placeholderTextColor={"#d7d7d7"}
              onChangeText={(text) => {
                setCounter(text);
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.select}>
          <Text
            style={{
              fontSize: 13,
              color: "#909090",
            }}
          >
            Starts
          </Text>
          <View style={styles.selection}>
            <Text style={{ color: "#000", width: "50%", fontSize: 16 }}>
              {selectedDay.day}, {selectedMonth.month} {dt.getDate()}
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                5:00 pm
              </Text>
            </TouchableOpacity>
            {/* <Icon name="chevron-right" size={30} /> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.select}>
          <Text
            style={{
              fontSize: 13,
              color: "#909090",
            }}
          >
            Staff
          </Text>
          <View
            style={[
              styles.selection,
              {
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={{ color: "#000", width: "50%", fontSize: 16 }}>
              {dataUser && dataUser.name}
            </Text>
            <Icon name="chevron-right" size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.select}>
          <Text
            style={{
              fontSize: 13,
              color: "#909090",
            }}
          >
            Duration
          </Text>
          <View style={styles.selection}>
            <Text style={{ color: "#000" }}>1 hr</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.select}>
          <Text
            style={{
              fontSize: 13,
              color: "#909090",
            }}
          >
            Add
          </Text>
          <View
            style={[
              styles.selection,
              {
                justifyContent: "space-between",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Icon name="video-outline" size={20} />
              <Text>Video Meeting</Text>
            </View>
            <View>
              <Text>eer</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.select}>
          <Text
            style={{
              fontSize: 13,
              color: "#909090",
            }}
          >
            Note
          </Text>
          <View style={styles.selection}>
            <TextInput
              placeholder="Add Note"
              placeholderTextColor={"#d7d7d7"}
            />
          </View>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        accentColor="#1d90f5"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "1%",
    paddingHorizontal: "3%",
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 0.5,
    paddingBottom: "1%",
  },
  logo: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  select: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 0.5,
    paddingHorizontal: "3%",
    paddingVertical: "3%",
  },
  selection: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
  },
});
