import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import FinancePieChart from '../components/PieChart';

const data = [
    {
        name: "Seoul",
        population: 0,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

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
                    <Entypo name="bar-graph" size={FONTSIZE.header2} color="white" />
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ CỘT</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "COLUMN CHART" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
                <View style={{ width: 0.25, backgroundColor: 'white' }}></View>
                <TouchableOpacity
                    style={styles.category}
                    onPress={() => setCurrentState('PIE CHART')}
                >
                    <Foundation name="graph-pie" size={FONTSIZE.header2} color="white" />
                    <Text style={[styles.cate_text]}>BIỂU ĐỒ TRÒN</Text>
                    <View style={{ width: '98%', borderWidth: currentState == "PIE CHART" ? 2 : 0, borderColor: '#00C897', position: 'absolute', bottom: -3 }}></View>
                </TouchableOpacity>
            </SafeAreaView>
            {
                currentState == "PIE CHART" ? <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <FinancePieChart title={"Loại giao dịch"} data={data} />
                    <FinancePieChart title={"Chi tiêu"} data={data} />
                    <FinancePieChart title={"Thu nhập"} data={data} />
                </ScrollView> : <View></View>
            }



        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',

    },

    headerBar: {
        width: '100%',
        backgroundColor: 'rgb(45,139, 126)',
        flexDirection: 'row',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    category: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cate_text: {
        fontSize: FONTSIZE.header2,
        fontWeight: '500',
        color: 'white',
        padding: 5,
    }
})

export default ReportScreen;