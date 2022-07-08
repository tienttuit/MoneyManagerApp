import { auth } from "../firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { createKeyID, createKeyFromDate } from "./helpers";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const autoSignIn = () => {
  signInAnonymously(auth)
    .then(() => {
      // console.log("Sign in anonynously");
    })
    .catch((error) => {
      const errorCode = error.code;

      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
};

export const AddTransaction = async (input) => {
  let index = createKeyID(auth.currentUser.uid, input.date);
  const data = {
    moneyValue: input.money,
    categoryValue: input.categoryValue,
    walletValue: input.walletValue,
    dateCreated: input.date,
    note: input.note,
    groupID: createKeyFromDate(input.date),
    status: true,
  };

  var flag = false;

  // if the transaction is saving category, then update value in Saving Goal data
  if (data.categoryValue.id.slice(0, 1) == "s") {
    var doc_id = null;
    var currentMoney = 0;
    var goalMoney = 0;
    const jsonValue = await AsyncStorage.getItem("SavingGoal");

    if (!jsonValue) {
      flag = true;
    } else {
      let savingGoals = JSON.parse(jsonValue);

      for (let goal of savingGoals) {
        if (savingGoals[goal]["status"] == "current") {
          doc_id = savingGoals[goal]["uid"];
          currentMoney = savingGoals[goal]["currentMoney"];
          goalMoney = savingGoals[goal]["savingValue"];
          data["goalID"] = doc_id;
        }
      }
    }

    setTimeout(async () => {
      if (flag) {
        Alert.alert(
          "Tin nhắn hệ thống",
          "Hiện tại bạn chưa có mục tiêu tiết kiệm nào nên không thể thêm giao dịch",
          [
            {
              text: "OK",
              onPress: () => console.log("OK"),
            },
          ]
        );
        return;
      }

      if (parseInt(currentMoney) + parseInt(input.money) >= parseInt(goalMoney))
        updateSavingGoalStatus(doc_id);
      const index = doc_id;
      const jsonValue = await AsyncStorage.getItem("SavingGoal");

      if (jsonValue) {
        let result = JSON.parse(jsonValue);

        if (result[index]) {
          result[index]["currentMoney"] += parseInt(input.money);
          await AsyncStorage.setItem("SavingGoal", JSON.stringify(result));
        }
      }
    }, 2000);
  }

  setTimeout(async () => {
    if (flag) return;
    let jsonTransactions = await AsyncStorage.getItem("transaction");
    let transactions = {};

    if (jsonTransactions) {
      transactions = JSON.parse(jsonTransactions);
    }

    transactions[index] = data;
    await AsyncStorage.setItem("transaction", JSON.stringify(transactions));
  }, 1000);

  return () => unsubscribe();
};

export const deleteTransaction = async (item) => {
  let jsonTransactions = await AsyncStorage.getItem("transaction");
  console.log(item);
  let index = createKeyID(
    auth.currentUser.uid.toString(),
    new Date(item.dateCreated)
  );

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);
    transactions[index].status = false;
    await AsyncStorage.setItem("transaction", JSON.stringify(transactions));
  }
};

export const undoTransaction = async (item) => {
  let jsonTransactions = await AsyncStorage.getItem("transaction");
  let index = createKeyID(
    auth.currentUser.uid.toString(),
    new Date(item.dateCreated)
  );

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);
    transactions[index].status = true;
    await AsyncStorage.setItem("transaction", JSON.stringify(transactions));
  }
};

export const loadTransaction = async (
  setTransactionList,
  setLoading,
  setValue
) => {
  var transactionList = [];
  var expenseValue = 0;
  var incomeValue = 0;
  var cash = 0;
  var debit_card = 0;

  let jsonTransactions = await AsyncStorage.getItem("transaction");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);

    for (let index in transactions) {
      if (transactions[index].status == true) {
        if (transactions[index].categoryValue.type == "-")
          expenseValue += parseInt(transactions[index].moneyValue);
        else incomeValue += parseInt(transactions[index].moneyValue);

        if (transactions[index].walletValue == "Tiền mặt")
          cash +=
            transactions[index].categoryValue.type == "-"
              ? -parseInt(transactions[index].moneyValue)
              : parseInt(transactions[index].moneyValue);
        else
          debit_card +=
            transactions[index].categoryValue.type == "-"
              ? -parseInt(transactions[index].moneyValue)
              : parseInt(transactions[index].moneyValue);

        if (
          transactionList.length == 0 ||
          transactionList.filter(
            (item) => item.id == transactions[index].groupID
          ).length == 0
        )
          transactionList.push({
            id: transactions[index].groupID,
            data: [transactions[index]],
          });
        else {
          transactionList.map((item) => {
            if (item.id == transactions[index].groupID)
              item.data.push(transactions[index]);
          });
        }
      }
    }
  }

  setTimeout(() => {
    setLoading(true);
    setValue({ expenseValue, incomeValue, cash, debit_card });
    // console.log(expenseValue);
    setTransactionList(transactionList);
  }, 1000);
};

export const loadDeletedTransaction = async (
  setTransactionList,
  setLoading,
  setValue
) => {
  var transactionList = [];
  var expenseValue = 0;
  var incomeValue = 0;

  let jsonTransactions = await AsyncStorage.getItem("transaction");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);

    for (let index in transactions) {
      if (transactions[index].status == false) {
        if (transactions[index].categoryValue.type == "-")
          expenseValue += parseInt(transactions[index].moneyValue);
        else incomeValue += parseInt(transactions[index].moneyValue);

        if (
          transactionList.length == 0 ||
          transactionList.filter(
            (item) => item.id == transactions[index].groupID
          ).length == 0
        )
          transactionList.push({
            id: transactions[index].groupID,
            data: [transactions[index]],
          });
        else {
          transactionList.map((item) => {
            if (item.id == transactions[index].groupID)
              item.data.push(transactions[index]);
          });
        }
      }
    }
  }

  setTimeout(() => {
    setLoading(true);
    setValue({ expenseValue, incomeValue });
    // console.log(expenseValue);
    setTransactionList(transactionList);
  }, 1000);
};

export const AddSavingGoal = async (input) => {
  const data = {
    goalID: createKeyID(auth.currentUser.uid, input.date),
    goalName: input.goalName,
    savingValue: input.savingValue,
    date: input.date,
    minValue: input.minValue,
    status: "current",
    currentMoney: 0,
  };
  const jsonValue = await AsyncStorage.getItem("SavingGoal");
  let finalData = {};

  if (jsonValue) {
    finalData = JSON.parse(jsonValue);
  }

  finalData[data.goalID] = data;
  await AsyncStorage.setItem("SavingGoal", JSON.stringify(finalData));
};

export const loadSavingGoalData = async (
  setCurrentGoalInput,
  setGoalState,
  setLoading
) => {
  const jsonValue = await AsyncStorage.getItem("SavingGoal");
  setCurrentGoalInput(null);
  setGoalState(false);
  setLoading(false);

  if (jsonValue) {
    let savingGoals = JSON.parse(jsonValue);
    console.log(savingGoals);
    for (let index in savingGoals) {
      if (savingGoals[index].status == "current") {
        setCurrentGoalInput(savingGoals[index]);
        setGoalState(true);
      }
    }
  }
  setLoading(true);
};

export const loadSavingTransaction = async (setSavingList, goalID) => {
  var savingList = [];
  const jsonValue = await AsyncStorage.getItem("SavingGoal");

  if (jsonValue) {
    let savingGoals = JSON.parse(jsonValue);
    for (let index in savingGoals) {
      if (savingGoals[index].goalID == goalID) {
        savingList.push(savingGoals[index]);
      }
    }
    setSavingList(savingList);
  }
};

export const loadDoneSavingGoal = async (setCompletedGoals) => {
  var completedGoals = [];
  const jsonValue = await AsyncStorage.getItem("SavingGoal");

  if (jsonValue) {
    let savingGoals = JSON.parse(jsonValue);
    for (let index in savingGoals) {
      if (savingGoals[index].status == "done") {
        completedGoals.push(savingGoals[index]);
      }
    }
    setCompletedGoals(completedGoals);
  }
};

export const deleteSavingGoal = async (goalID) => {
  let jsonTransactions = await AsyncStorage.getItem("SavingGoal");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);
    transactions[goalID].status = "deleted";
    await AsyncStorage.setItem("SavingGoal", JSON.stringify(transactions));
  }
};

export const updateSavingGoalStatus = async (goalID) => {
  let jsonTransactions = await AsyncStorage.getItem("SavingGoal");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);
    transactions[goalID]["status"] = "deleted";
    await AsyncStorage.setItem("SavingGoal", JSON.stringify(transactions));
  }
};

export const addExpenseLimits = async (limitValue, category) => {
  const index = "category_" + category.id;
  const jsonValue = await AsyncStorage.getItem("expense_limits");
  let data = {};

  if (jsonValue) {
    let result = JSON.parse(jsonValue);
    result[index] = limitValue;
    data = result;
  } else {
    data[index] = limitValue;
  }
  await AsyncStorage.setItem("expense_limits", JSON.stringify(data));
};

export const loadExpenseLimitValueByCategoryId = async (
  category,
  setLimitValue
) => {
  const index = "category_" + category.id;
  const jsonValue = await AsyncStorage.getItem("expense_limits");
  let limitValue = "Nhập giới hạn cho mục " + category.title;

  if (jsonValue) {
    let result = JSON.parse(jsonValue);

    if (result[index]) {
      limitValue = result[index];
    }
  }
  setLimitValue(limitValue);
};

export const loadExpensesByCategoryList = async (categoriesData) => {
  const jsonValue = await AsyncStorage.getItem("transaction");

  if (jsonValue) {
    let transactions = JSON.parse(jsonValue);

    for (let index in transactions) {
      if (transactions[index].status == true) {
        const dateString = transactions[index].dateCreated.toString();
        for (let category of categoriesData) {
          if (
            transactions[index].categoryValue.id == category.id &&
            category.expenses.filter((e) => e.date === dateString).length == 0
          ) {
            const expenseData = {
              date: dateString,
              method: transactions[index].walletValue,
              total: parseInt(transactions[index].moneyValue),
              status: transactions[index].status,
            };
            category.expenses.push(expenseData);
          }
        }
      }
    }
  }
};
//
export const checkExpenseLimitForCategory = async (
  categoryData,
  categoryLimit,
  transValue,
  setLimitCheck
) => {
  var totalValue = parseInt(transValue);
  const jsonValue = await AsyncStorage.getItem("transaction");

  if (jsonValue) {
    let transactions = JSON.parse(jsonValue);

    for (let index in transactions) {
      if (
        transactions[index]["status"] == true &&
        transactions[index].categoryValue.id == categoryData.id
      ) {
        totalValue += parseInt(transactions[index].moneyValue);
      }
    }
    if (categoryLimit != null && totalValue > categoryLimit) {
      setLimitCheck(false);
    } else {
      setLimitCheck(true);
    }
  }
};

export const getTransactionByType = async (getDataByType) => {
  var transactionData = [
    {
      name: "Chi tiêu",
      value: 0,
      color: "#e3342f",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Thu nhập",
      value: 0,
      color: "#F8B400",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
  ];

  let jsonTransactions = await AsyncStorage.getItem("transaction");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);

    for (let index in transactions) {
      if (transactions[index].status == true) {
        if (transactions[index].categoryValue.type == "-")
          transactionData[0].value += parseInt(1);
        else transactionData[1].value += parseInt(1);
      }
    }

    getDataByType(transactionData);
  }
};

export const getTransactionByExpense = async (getDataByExpense) => {
  var transactionData = [
    {
      name: "Ăn uống",
      value: 0,
      color: "#e3342f",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Quần áo",
      value: 0,
      color: "#f6993f",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Mua sắm",
      value: 0,
      color: "#ffed4a",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Nhà ở",
      value: 0,
      color: "#38c172",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Giải trí",
      value: 0,
      color: "#4dc0b5",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Sức khỏe",
      value: 0,
      color: "#3490dc",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Di chuyên",
      value: 0,
      color: "#6574cd",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Điện nước",
      value: 0,
      color: "#9561e2",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Giáo dục",
      value: 0,
      color: "#f66d9b",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
  ];

  let jsonTransactions = await AsyncStorage.getItem("transaction");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);

    for (let index in transactions) {
      if (transactions[index].status == true) {
        if (transactions[index].categoryValue.title == "Ăn uống")
          transactionData[0].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Quần áo")
          transactionData[1].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Mua sắm")
          transactionData[2].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Nhà ở")
          transactionData[3].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Giải trí")
          transactionData[4].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Sức khỏe")
          transactionData[5].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Đi chuyển")
          transactionData[6].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Hóa đơn điện nước")
          transactionData[7].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Giáo dục")
          transactionData[8].value += parseInt(1);
      }
    }

    getDataByExpense(transactionData);
  }
};

export const getTransactionByIncome = async (getDataByIncome) => {
  var transactionData = [
    {
      name: "Tiền lương",
      value: 0,
      color: "#e3342f",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
    {
      name: "Tiền thưởng",
      value: 0,
      color: "#38c172",
      legendFontColor: "#3BACB6",
      legendFontSize: 15,
    },
  ];

  let jsonTransactions = await AsyncStorage.getItem("transaction");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);

    for (let index in transactions) {
      if (transactions[index].status == true) {
        if (transactions[index].categoryValue.title == "Tiền lương")
          transactionData[0].value += parseInt(1);
        else if (transactions[index].categoryValue.title == "Tiền thưởng")
          transactionData[1].value += parseInt(1);
      }
    }

    getDataByIncome(transactionData);
  }
};

export const getMonthExpense = async (getData) => {
  const data = [
    {
      label: "Tháng 1      ",
      value: 0,
    },
    {
      label: "Tháng 2      ",
      value: 0,
    },

    {
      label: "Tháng 3      ",
      value: 0,
    },
    {
      label: "Tháng 4      ",
      value: 0,
    },

    {
      label: "Tháng 5      ",
      value: 0,
    },
    {
      label: "Tháng 6      ",
      value: 0,
    },

    {
      label: "Tháng 7      ",
      value: 0,
    },

    {
      label: "Tháng 8      ",
      value: 0,
    },
    {
      label: "Tháng 9      ",
      value: 0,
    },

    {
      label: "Tháng 10      ",
      value: 0,
    },
    {
      label: "Tháng 11      ",
      value: 0,
    },
    {
      label: "Tháng 12      ",
      value: 0,
    },
  ];

  let jsonTransactions = await AsyncStorage.getItem("transaction");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);

    for (let index in transactions) {
      if (transactions[index].status == true) {
        if (transactions[index].categoryValue.type == "-")
          data[new Date(transactions[index].dateCreated).getMonth()].value +=
            parseInt(transactions[index].moneyValue);
      }
    }

    getData(data);
  }
};

export const getMonthIncome = async (getData) => {
  const data = [
    {
      label: "Tháng 1      ",
      value: 0,
    },
    {
      label: "Tháng 2      ",
      value: 0,
    },

    {
      label: "Tháng 3      ",
      value: 0,
    },
    {
      label: "Tháng 4      ",
      value: 0,
    },

    {
      label: "Tháng 5      ",
      value: 0,
    },
    {
      label: "Tháng 6      ",
      value: 0,
    },

    {
      label: "Tháng 7      ",
      value: 0,
    },

    {
      label: "Tháng 8      ",
      value: 0,
    },
    {
      label: "Tháng 9      ",
      value: 0,
    },

    {
      label: "Tháng 10      ",
      value: 0,
    },
    {
      label: "Tháng 11      ",
      value: 0,
    },
    {
      label: "Tháng 12      ",
      value: 0,
    },
  ];

  let jsonTransactions = await AsyncStorage.getItem("transaction");

  if (jsonTransactions) {
    let transactions = JSON.parse(jsonTransactions);

    for (let index in transactions) {
      if (transactions[index].status == true) {
        if (transactions[index].categoryValue.type == "+")
          data[new Date(transactions[index].dateCreated).getMonth()].value +=
            parseInt(transactions[index].moneyValue);
      }
    }

    getData(data);
  }
};
