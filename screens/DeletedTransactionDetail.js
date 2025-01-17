import { React, useLayoutEffect, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  deleteTransaction,
  loadTransaction,
  undoTransaction,
} from "../Helper/local-storage-service";
import { FONTSIZE } from "../constants/constants";
import { formatMoney } from "../Helper/helpers";
import { FontAwesome } from "@expo/vector-icons";

const DeletedTransactionDetail = (props) => {
  const item = props.route.params.item;
  const [day, month, year, hour, minute] = [
    new Date(item.dateCreated).getDate(),
    new Date(item.dateCreated).getMonth() + 1,
    new Date(item.dateCreated).getFullYear(),
    new Date(item.dateCreated).getHours(),
    new Date(item.dateCreated).getMinutes(),
  ];
  const [undoTrigger, setUndoTrigger] = useState(false);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            {
              {
                Alert.alert(
                  "Khôi phục giao dịch",
                  "Bạn chắc chắn muốn khôi phục lại giao dịch này?",
                  [
                    { text: "Hủy" },
                    {
                      text: "Khôi phục",
                      onPress: () => {
                        setUndoTrigger(true);
                      },
                    },
                  ]
                );
              }
            }
          }}
        >
          <FontAwesome name="undo" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  useEffect(() => {
    if (undoTrigger) {
      undoTransaction(props.route.params.item);
      props.navigation.navigate("Giao dịch", { trigger: "true" });
    }
  }, [undoTrigger]);
  return (
    <View style={styles.screen}>
      <View style={styles.detailView}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Image source={require("../icon/wage.png")} />
          <Text style={styles.inputTitle}>Số tiền</Text>
          <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
            <Text style={{ fontSize: FONTSIZE.body }}>
              {formatMoney(item.moneyValue)} VND
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Image source={item.categoryValue.img} />
          <Text style={styles.inputTitle}>Hạng mục</Text>
          <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
            <Text style={{ fontSize: FONTSIZE.body }}>
              {item.categoryValue.title}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Image source={require("../icon/purse.png")} />
          <Text style={styles.inputTitle}>Loại ví</Text>
          <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
            <Text style={{ fontSize: FONTSIZE.body }}>{item.walletValue}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Image source={require("../icon/calendar.png")} />
          <Text style={styles.inputTitle}>Thời điểm</Text>
          <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
            <Text style={{ fontSize: FONTSIZE.body }}>
              {day}/{parseInt(month) + 1}/{year} {hour}:{minute}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Image source={require("../icon/notes.png")} />
          <Text style={styles.inputTitle}>Ghi chú</Text>
          <View style={{ alignItems: "flex-end", flex: 1, marginRight: 20 }}>
            <Text style={{ fontSize: FONTSIZE.body }}>{item.note}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    alignItems: "center",
  },

  detailView: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
    width: "85%",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.4,
    elevation: 4,
    borderRadius: 5,

    padding: 15,
  },

  inputTitle: {
    fontSize: FONTSIZE.body,
    fontWeight: "500",
    paddingLeft: 5,
  },
});

export default DeletedTransactionDetail;
