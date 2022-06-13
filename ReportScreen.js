import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const ReportScreen = props => {
    const [currentState, setCurrentState] = useState('COLUMN CHART');
    // const CurrentScreen = currentState == 'GOAL' ? <GoalDeTail /> : <GoalRecord onPress={() => props.navigation.navigate('Thống kê')} />

    return (
        <View style={styles.screen}>

            {/* view for displaying header bar: COLUMN CHAT and PIE CHART */}
            <SafeAreaView style={styles.headerBar}>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('COLUMN CHART')}
                >
                    <Entypo name="bar-graph" size={25} color="white" />
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ CỘT</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "COLUMN CHART" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
                <View style={{ width: 0.25, backgroundColor: 'white' }}></View>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('PIE CHART')}
                >
                    <Foundation name="graph-pie" size={25} color="white" />
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ TRÒN</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "PIE CHART" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
            </SafeAreaView>


        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    headerBar: {
        width: '100%',
        backgroundColor: 'rgb(45,139, 126)',
        flexDirection: 'row',
        height: '12%'
    },

    category: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cate_text: {
        fontSize: FONTSIZE.header1,
        fontWeight: '500',
        color: 'white',
        padding: 5,
    }
})

export default ReportScreen;