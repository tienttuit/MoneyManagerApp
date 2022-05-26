import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const Card = props => {
    return (
        <View style={styles.card}>
            <Text style={{ fontSize: FONTSIZE.header2, fontWeight: '400' }}>{props.title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcons name="attach-money" size={24} color="black" />
                <Text style={{ fontSize: FONTSIZE.header1, fontWeight: '500' }}>{props.value}</Text>
            </View>

        </View>
    )
}

const GoalDeTail = props => {
    return (
        <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
            <View style={{ height: '35%', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Progress.Circle size={250} progress={0.6} color={'#006E7F'} thickness={5} unfilledColor={'white'} borderColor={'white'} />
                <Image source={require('../icon/goal.png')} style={styles.img} />
            </View>
            <View style={{ height: '25%' }}>
                <View style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="SAVED" value="2,000,000 VND" />
                </View>
                <View style={{ height: '50%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Card title="REMAINING" value="8,000,000 VND" />
                    <Card title="GOAL" value="10,000,000 VND" />
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#EE5007', padding: 10, borderRadius: 5 }}>
                    <Text>TARGET ON 25/05/2023</Text>
                </View>

                <View style={{ padding: 10, borderRadius: 5 }}>
                    <Text style={{ fontSize: FONTSIZE.header1, padding: 10, }}>4 Months 12 Days To Go</Text>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    img: {
        position: 'absolute',

    },

    card: {
        backgroundColor: 'white',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0.4,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default GoalDeTail;