import { React, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import DateTimePicker from '@react-native-community/datetimepicker';

const SavingInputModal = () => {
    const [date, setDate] = useState(new Date())
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', }}>
                <Text style={{ fontSize: FONTSIZE.title, fontWeight: 'bold' }}>CREATE NEW GOAL</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                <Image source={require('../icon/piggy-bank.png')} />
            </View>

            <View style={styles.input}>
                <View>
                    <Text style={styles.inputTitle}>Mục tiêu</Text>
                </View>
                <TextInput title="Mục tiêu" placeholder='Tên mục tiêu' style={styles.textInput} ></TextInput>
            </View>

            <View style={styles.input}>
                <View>
                    <Text style={styles.inputTitle}>Số tiền cần tiết kiệm</Text>
                </View>
                <TextInput title="Mục tiêu" placeholder='Số tiền cần tiết kiệm' style={styles.textInput}></TextInput>
            </View>

            <View style={styles.input}>
                <View>
                    <Text style={styles.inputTitle}>Ngày kết thúc</Text>
                </View>
                <DateTimePicker mode="date" value={date} />
            </View>


            <View style={styles.buttonContainer}>
                <Button title='HỦY' color={'red'}></Button>
                <Button title='TẠO'></Button>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        height: '60%',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0.4,
        marginBottom: 10,
    },

    input: {
        backgroundColor: 'white',
        height: 80,
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,

    },

    inputTitle: {
        fontSize: FONTSIZE.header2,
        marginBottom: 5,
        fontWeight: '600'
    },

    textInput: {
        height: '70%',
        padding: 5,
        fontSize: FONTSIZE.body,
        fontWeight: '500',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    },

    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1,
        width: '100%',
        boderWidth: 1,
        justifyContent: 'flex-end',
        borderTopWidth: 0.3,
        borderTopColor: 'gray',
        alignItems: 'center'
    }
});

export default SavingInputModal;