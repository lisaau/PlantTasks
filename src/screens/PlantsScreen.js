import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import PlantContext from '../context/PlantContext';
import { Feather, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

const plantIcons = ['tree', 'flower-tulip-outline', 'flower', 'flower-outline', 'flower-poppy', 'leaf'];

export default function PlantsScreen({ navigation }) { 
    const { plants, deletePlant, loading } = useContext(PlantContext);

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => navigation.navigate('ViewPlant', { id: data.item.id })}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={{alignItems:'center'}}>
                <Text>{data.item.name} </Text>
                <MaterialCommunityIcons name={plantIcons[data.item.id % plantIcons.length]} style={[styles.icon, {color: 'green'}]}/>
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

    const dataToDisplay = plants === null || plants.length === 0?
        <View style={styles.textContainer}>
            <Text style={styles.text}>Click '+' to a plant!</Text>
        </View>
        :
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

    return (
        loading === true ? 
        <ActivityIndicator style={styles.indicator} size='large' /> :
        dataToDisplay
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 24,
        color: 'green'
    },
    icon: {
        fontSize: 24,
        padding: 5
    },
    indicator: {
        padding: 200
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 80,
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