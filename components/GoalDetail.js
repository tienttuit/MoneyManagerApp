import { React, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import { FONTSIZE } from "../constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import CountDown from "../components/CountDown";
import { formatMoney } from "../Helper/helpers";
import { getDateDifference } from "../Helper/helpers";

const Card = (props) => {
  return (
    <View style={styles.card}>
      <Text
        style={{ fontSize: FONTSIZE.body, fontWeight: "400", color: "#006E7F" }}
      >
        {props.title}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="attach-money" size={24} color="black" />
        <Text style={{ fontSize: FONTSIZE.header2, fontWeight: "500" }}>
          {props.value} VND
        </Text>
      </View>
    </View>
  );
};

const GoalDeTail = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const progress_perc =
    props.item.data.currentMoney / props.item.data.savingValue;
  const [dateDiff, seDateDiff] = useState(
    getDateDifference(new Date(props.item.data.date))
  );

  return (
    <View style={{ width: "100%", height: "100%", flexDirection: "column" }}>
      <View
        style={{
          paddingVertical: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            alignItems: "center",
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#006E7F" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text
            style={{
              fontSize: FONTSIZE.small,
              color: "#006E7F",
              fontWeight: "500",
            }}
          >
            Auto saving
          </Text>
        </View>

        <Progress.Circle
          size={230}
          progress={progress_perc}
          color={"#006E7F"}
          thickness={5}
          unfilledColor={"white"}
          borderColor={"white"}
        />
        <Image source={require("../icon/goal.png")} style={styles.img} />
        <View
          style={{ backgroundColor: "#F8CB2E", padding: 8, borderRadius: 5 }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.small,
              color: "#006E7F",
              fontWeight: "500",
            }}
          >
            {progress_perc.toFixed(2) >= 1
              ? 100
              : progress_perc.toFixed(2) * 100}
            %
          </Text>
        </View>
      </View>
      <View style={{ height: "22%" }}>
        <View
          style={{
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            title="Đã tiết kiệm"
            value={formatMoney(props.item.data.currentMoney)}
          />
        </View>
        <View
          style={{
            height: "50%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Card
            title="Còn lại"
            value={formatMoney(
              props.item.data.savingValue - props.item.data.currentMoney < 0
                ? 0
                : props.item.data.savingValue - props.item.data.currentMoney
            )}
          />
          <Card
            title="Mục tiêu"
            value={formatMoney(props.item.data.savingValue)}
          />
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#EE5007",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
        >
          <MaterialIcons name="date-range" size={28} color="black" />
          <Text
            style={{ fontSize: FONTSIZE.small, padding: 10, color: "white" }}
          >
            Ngày kết thúc {new Date(props.item.data.date).getDate()}/
            {new Date(props.item.data.date).getMonth() + 1}/
            {new Date(props.item.data.date).getFullYear()}
          </Text>
        </View>

        <View style={{ padding: 10, borderRadius: 5 }}>
          <CountDown date={dateDiff} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    position: "absolute",
  },

  card: {
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 4,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default GoalDeTail;
