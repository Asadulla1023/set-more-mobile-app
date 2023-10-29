import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header2 from "../utils/Header2";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const SetUser = ({ navigation }) => {
  const [data, setData] = useState();
  const [industry, setIndustry] = useState(false);
  const [industrySelect, setIndustrySelect] = useState(false);
  const [search, setSearch] = useState("");
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@user");
      setData(JSON.parse(value));
      // AsyncStorage.clear()
    } catch (error) {
      console.log(error);
    }
  };

  getData();

  const industryArr = [
    "Hair Salon",
    "BarberShop",
    "Nail Salon",
    "Spa/Message/Waxing",
    "Computers/Technology/IT",
    "Consulting/Bussines Services",
    "Creative Services/Designer",
    "Developer",
    "Writer",
    "Enterprice",
    "Tutor/Mentor/Instructor",
    "Law Office",
    "Other",
    "fuu",
  ];

  const redirect = async () => {
    navigation.navigate("home");
    try {
      const jsonValue = {
        job: industrySelect,
      };
      await AsyncStorage.setItem("@job", JSON.stringify(jsonValue));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Header2
        title={!industry ? "Welcome to Setmore" : "Industry Type"}
        whereShouldIGo={redirect}
      />
      {!industry ? (
        <>
          <TouchableOpacity
            style={[
              styles.select,
              {
                borderTopColor: "#D7D7D7",
                flexDirection: "column",
                alignItems: "flex-start",
                borderTopWidth: 1,
                marginTop: 10,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#545454",
              }}
            >
              Company Name
            </Text>
            <Text>{data && data.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndustry(!industry);
            }}
            style={styles.select}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#545454",
              }}
            >
              Industry Name
            </Text>
            <View style={styles.selection}>
              <Text
                style={
                  !industrySelect ? { color: "#909090" } : { color: "#000" }
                }
              >
                {!industrySelect ? "Industry Type" : industrySelect}
              </Text>
              <Icon name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.select}>
            <Text
              style={{
                fontSize: 12,
                color: "#545454",
              }}
            >
              Currency
            </Text>
            <View style={styles.selection}>
              <Text>лв Uzbekistan, UZS</Text>
              <Icon name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderColor: "#D7D7D7",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 50,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
              height: 40,
              marginHorizontal: "8%",
            }}
          >
            <Icon name="search-web" size={20} />
            <TextInput
              onChangeText={(e) => setSearch(e.toLocaleLowerCase())}
              style={styles.input}
              placeholder="Search..."
              placeholderTextColor="#909090"
            />
          </View>
          <ScrollView
            horizontal={false}
            style={{
              marginTop: 20,
            }}
          >
            {industryArr.map((e) => {
              if (e.toLocaleLowerCase().includes(search)) {
                return (
                  <Text
                    key={e}
                    style={{
                      paddingHorizontal: "5%",
                      paddingVertical: "5%",
                      borderColor: "#D7D7D7",
                      borderWidth: 0.5,
                    }}
                    onPress={() => {
                      setIndustrySelect(e);
                      setIndustry(!industry);
                    }}
                  >
                    {e}
                  </Text>
                );
              } else {
                <Text
                  key={e}
                  style={{
                    paddingHorizontal: "5%",
                    paddingVertical: "5%",
                    borderColor: "#D7D7D7",
                    borderWidth: 0.5,
                  }}
                  onPress={() => {
                    setIndustrySelect(e);
                    setIndustry(!industry);
                  }}
                >
                  {e}
                </Text>;
              }
            })}
            <Text></Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SetUser;

const styles = StyleSheet.create({
  select: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    paddingHorizontal: "2%",
    paddingVertical: "5%",
  },
  selection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
  },
});
