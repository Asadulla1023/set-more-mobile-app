import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
const Services = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        height: "100%",
        paddingHorizontal: "4%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 0.8,
          borderBottomColor: "#D7D7D7",
          paddingHorizontal: "2%"
        }}
      >
        <TouchableOpacity onPress={()=>{
          navigation.navigate("home")
        }} style={styles.box}>
          <Text
            style={{
              transform: [{ rotate: "45deg" }],
              fontSize: 40,
              fontWeight: "100",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            New Appoinment
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Select Service
          </Text>
        </View>
        <Text
          style={{
            color: "transparent",
          }}
        >
          wefjnb
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: "4%",
        }}
      >
        <TouchableOpacity
          style={{
            gap: 15,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "1%",
            paddingVertical: "2%",
            borderBottomWidth: 0.8,
            borderBottomColor: "#D7D7D7",
          }}
          onPress={()=> {
            navigation.navigate("event", {data: item})
          }}
        >
          <Icon
            style={{
              height: 60,
              backgroundColor: "#D7D7D7",
              width: 60,
              textAlign: "center",
              paddingTop: "5%",
              borderRadius: 900,
            }}
            name="calendar-blank-outline"
            color={"#545454"}
            size={25}
          />
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Event
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "1%",
            paddingVertical: "2%",
            borderBottomWidth: 0.8,
            borderBottomColor: "#D7D7D7",
            gap: 15
          }}
        >
          <View
            style={{
              height: 60,
              backgroundColor: "#F99D22",
              width: 60,
              textAlign: "center",
              borderRadius: 900,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              15
            </Text>
          </View>
          <View style={{
            justifyContent: "space-between"
          }}>
            <Text>15 Minutes Meeting</Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}>
              <Icon name="video-outline" size={24} />
              <Text>15 mins,</Text>
              <Text>0.00</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "1%",
            paddingVertical: "2%",
            borderBottomWidth: 0.8,
            borderBottomColor: "#D7D7D7",
            gap: 15
          }}
        >
          <View
            style={{
              height: 60,
              backgroundColor: "#20B2AA",
              width: 60,
              textAlign: "center",
              borderRadius: 900,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              30
            </Text>
          </View>
          <View style={{
            justifyContent: "space-between"
          }}>
            <Text>15 Minutes Meeting</Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}>
              <Icon name="video-outline" size={24} />
              <Text>30 mins,</Text>
              <Text>0.00</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "1%",
            paddingVertical: "2%",
            borderBottomWidth: 0.8,
            borderBottomColor: "#D7D7D7",
            gap: 15
          }}
        >
          <View
            style={{
              height: 60,
              backgroundColor: "#318CE7",
              width: 60,
              textAlign: "center",
              borderRadius: 900,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              60
            </Text>
          </View>
          <View style={{
            justifyContent: "space-between"
          }}>
            <Text>60 Minutes Meeting</Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}>
              <Icon name="video-outline" size={24} />
              <Text>1 hrs,</Text>
              <Text>0.00</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Services;

const styles = StyleSheet.create({
  box: {
    alignItems: "flex-start",
    paddingHorizontal: "2%",
  },
});
