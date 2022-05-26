import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTSIZE } from '../constants/constants';
import * as Progress from 'react-native-progress';
import GoalDeTail from '../components/GoalDetail';

const SavingDetailScreen = props => {
    const [currentState, setCurrentState] = useState('GOAL');

    return (
        <View style={styles.screen}>
            <View style={styles.headerBar}>
                <TouchableOpacity
                    style={[styles.category,
                    {
                        boderColor: currentState == 'GOAL' ? 'black' : 'white',
                        borderBottomWidth: currentState == 'GOAL' ? 2 : 0
                    }
                    ]}
                    onPress={() => setCurrentState('GOAL')}
                >
                    <Text style={styles.cate_text}>GOAL</Text>
                </TouchableOpacity>
                <View style={{ width: 0.25, backgroundColor: 'white' }}></View>
                <TouchableOpacity
                    style={[styles.category,
                    {
                        boderColor: currentState == 'RECORD' ? 'black' : 'white',
                        borderBottomWidth: currentState == 'RECORD' ? 2 : 0
                    }
                    ]}
                    onPress={() => setCurrentState('RECORD')}
                >
                    <Text style={styles.cate_text}>RECORD</Text>
                </TouchableOpacity>
            </View>

            <GoalDeTail />
        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',

    },

    headerBar: {
        width: '100%',
        height: 60,
        backgroundColor: 'rgb(45,139, 126)',
        flexDirection: 'row',

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

    }
})

export default SavingDetailScreen;