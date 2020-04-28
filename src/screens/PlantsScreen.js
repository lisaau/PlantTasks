import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import PlantContext from '../context/PlantContext';
import { Feather, MaterialIcons} from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function PlantsScreen({ navigation }) { 
    const { plants, deletePlant } = useContext(PlantContext);

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => navigation.navigate('ViewPlant', { id: data.item.id })}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{data.item.name}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backBtns, styles.backLeftBtnAdd]}
                onPress={() => navigation.navigate('TaskFormScreen', { id: data.item.id, name: data.item.name })}
            >
                <MaterialIcons name='playlist-add' style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backBtns, styles.backLeftBtnView]}
                onPress={() => navigation.navigate('ViewTasksScreen', { id: data.item.id, name: data.item.name })}
            >
                <MaterialIcons name='playlist-add-check' style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backBtns, styles.backRightBtnDelete]}
                onPress={() => deletePlant(data.item.id)}
            >
                <Feather name='trash' style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                data={plants}
                keyExtractor={plant => plant.id.toString()}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={150}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={5000}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        fontSize: 24,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backBtns: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backLeftBtnAdd: {
        backgroundColor: '#BFDFBF',
    },
    backLeftBtnView: {
        backgroundColor: '#BFCFDF',
        right: 225,
    },
    backRightBtnDelete: {
        backgroundColor: '#DFBFCF',
        right: 0,
    },
});