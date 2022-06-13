import { React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryCard from './CategoryCard';
import { FONTSIZE } from '../constants/constants';
import { formatMoney } from '../Helper/helpers';


const TransactionCard = props => {
    const [expenseValue, setExpenseValue] = useState(0);
    const [incomeValue, setIncomeValue] = useState(0);
    const [day, month, year] = [props.itemList[0].dateCreated.toDate().getDate(), props.itemList[0].dateCreated.toDate().getMonth() + 1, props.itemList[0].dateCreated.toDate().getFullYear()]
    // console.log(props)

    let _expenseValue = parseInt(0);
    let _incomeValue = parseInt(0);

    useEffect(() => {
        setExpenseValue(_expenseValue);
        setIncomeValue(_incomeValue);
    })

    if (props.itemList.length != 0)
        return (
            <View style={styles.card}>
                <View style={styles.info_view}>
                    <View>
                        <Text style={{ color: 'white', fontSize: FONTSIZE.small, fontWeight: '400' }}>{day} Th{parseInt(month) + 1} {year}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, paddingHorizontal: 5 }}>
                        <Text style={{ color: 'white', fontSize: FONTSIZE.small, fontWeight: '400' }}>Chi tiêu:{formatMoney(expenseValue)}</Text>
                        <Text style={{ color: 'white', fontSize: FONTSIZE.small, fontWeight: '400' }}>  Thu nhập:+{formatMoney(incomeValue)}</Text>
                    </View>
                </View>

                <View style={styles.item_list} >
                    {props.itemList.map(item => {

                        if (item.categoryValue.type == '-')
                            _expenseValue -= parseInt(item.moneyValue);
                        else
                            _incomeValue += parseInt(item.moneyValue);
                        // console.log(EXPENSE_DATA.indexOf(item.categoryValue)
                        return (<CategoryCard title={item.categoryValue.title} img={item.categoryValue.img} key={props.itemList.indexOf(item)} type={item.categoryValue.type} onPress={() => { }} moneyValue={item.moneyValue} />);
                    })}

                </View>


            </View>
        )
    else
        return (<View></View>)
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        width: '100%',
        // width: 400,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 1,
        shadowOpacity: 0.4,
        elevation: 0.4,
    },

    item_list: {

    },

    info_view: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#069A8E',
    }
});

export default TransactionCard;