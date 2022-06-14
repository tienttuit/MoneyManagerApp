import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTSIZE } from '../constants/constants';

const AddTransactionBtn = props => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: 'rgb(45,139, 126)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        elevation: 0.5,

    },

    text: {
        fontSize: FONTSIZE.extraLarge,
        fontWeight: '300',
        color: 'white',

    }
});

export default AddTransactionBtn;