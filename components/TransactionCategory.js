import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { FONTSIZE } from "../constants/constants";
import CategoryCard from "../components/CategoryCard";
import { AddSavingGoal } from "../Helper/local-storage-service";
import AddNewCategory, { DeleteCategory } from "./AddNew_DeleteCategory";
import { EXPENSE_DATA, INCOME_DATA, SAVING_DATA } from "../model/data";

const TransactionCategory = (props) => {
  const [cateType, setCateType] = useState("CHI TIÊU");
  const [addNew, setAddNew] = useState(false);
  const DATA =
    cateType == "CHI TIÊU"
      ? EXPENSE_DATA
      : cateType == "TIẾT KIỆM"
      ? SAVING_DATA
      : INCOME_DATA;

  {
    /* render item for flatlist of transaction items */
  }
  const renderItem = ({ item }) => {
    return (
      <CategoryCard
        isDelete={addNew}
        id={item.id}
        img={item.img}
        title={item.title}
        onPress={() => {
          props.choseItem({
            id: item.id,
            title: item.title,
            img: item.img,
            type: item.type,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {addNew ? (
        <AddNewCategory
          addType={cateType}
          onPress={(addNew) => setAddNew(!addNew)}
        />
      ) : null}
      {/* Close button */}
      <View style={styles.rightBtt}>
        <Button color="green" title=" Thoát " onPress={() => props.onClose()} />
      </View>

      {/* Add new category button */}
      <View style={styles.leftBtt}>
        <Button
          color="green"
          title="Chỉnh"
          onPress={() => setAddNew(!addNew)}
        />
      </View>

      {/* {Header view} */}
      <View
        style={{
          height: "15%",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={[
            styles.category_types,
            { borderBottomWidth: cateType == "TIẾT KIỆM" ? 3 : 0 },
          ]}
          onPress={() => setCateType("TIẾT KIỆM")}
        >
          <Text
            style={[
              { fontSize: FONTSIZE.header1 },
              { color: cateType == "TIẾT KIỆM" ? "rgb(45,139, 126)" : "gray" },
            ]}
          >
            Tiết Kiệm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.category_types,
            { borderBottomWidth: cateType == "CHI TIÊU" ? 3 : 0 },
          ]}
          onPress={() => setCateType("CHI TIÊU")}
        >
          <Text
            style={[
              { fontSize: FONTSIZE.header1 },
              { color: cateType == "CHI TIÊU" ? "rgb(45,139, 126)" : "gray" },
            ]}
          >
            Chi Tiêu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.category_types,
            { borderBottomWidth: cateType == "THU NHẬP" ? 3 : 0 },
          ]}
          onPress={() => setCateType("THU NHẬP")}
        >
          <Text
            style={[
              { fontSize: FONTSIZE.header1 },
              { color: cateType == "THU NHẬP" ? "rgb(45,139, 126)" : "gray" },
            ]}
          >
            Thu Nhập
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of transaction item  */}
      <FlatList
        contentContainerStyle={{}}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "50%",
    // height: 100,
    // padding: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.6,
    elevation: 0.6,
  },

  category_types: {
    borderBottomColor: "rgb(45,139, 126)",
    borderBottomWidth: 3,
  },

  rightBtt: {
    position: "absolute",
    right: 0,
    top: "-10%",
  },

  leftBtt: {
    position: "absolute",
    left: 0,
    top: "-10%",
  },
});

export default TransactionCategory;
