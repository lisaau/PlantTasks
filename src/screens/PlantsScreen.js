import React, { useContext, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import PlantContext from '../context/PlantContext';
import { Feather, MaterialIcons} from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function PlantsScreen({ navigation }) { 
    // const { plants, deletePlant } = useContext(PlantContext);

    // return (
    //     <View
    //         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    //     >
    //         <FlatList
    //             data={plants}
    //             keyExtractor={plant => plant.id.toString()}
    //             renderItem={({ item }) => {
    //                 return (
    //                     <TouchableOpacity
    //                         onPress={() =>
    //                             navigation.navigate('ViewPlant', {
    //                                 id: item.id
    //                             })
    //                         }
    //                     >
    //                         <View style={styles.row}>
    //                             <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen', {id: item.id})}>
    //                                 <MaterialIcons name='playlist-add' style={styles.icon}/>
    //                             </TouchableOpacity>
    //                             <TouchableOpacity onPress={() => navigation.navigate('ViewTasksScreen', {id: item.id, name: item.name})}>
    //                                 <MaterialIcons name='playlist-add-check' style={styles.icon}/>
    //                             </TouchableOpacity>
    //                             <Text>{item.name}, ID:{item.id}</Text>
    //                             <TouchableOpacity onPress={() => deletePlant(item.id)}>
    //                                 <Feather name='trash' style={styles.icon}/>
    //                             </TouchableOpacity>
    //                         </View>
    //                     </TouchableOpacity>
    //                 );
    //             }}
    //         />
    //     </View>
    // );
    // }
    const [listData, setListData] = useState(
        Array(20)
            .fill('')
            .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            console.log('closeRow', rowKey)
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log(`You touched ${data.item.text}. Use this to redirect to view plant screen`)}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>This will be plant {data.item.text}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Test</Text>

            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
                <MaterialIcons name='playlist-add' style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                
                <Text style={styles.backTextWhite}>Close</Text>
                <MaterialIcons name='playlist-add-check' style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnTest]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Feather name='trash' style={styles.icon}/>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={150}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </View>
    );
}

// const styles = StyleSheet.create({
//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingVertical: 20,
//       paddingHorizontal: 20,
//       borderTopWidth: 1,
//       borderColor: 'gray'
//     },
//     icon: {
//         fontSize: 24,
//         marginLeft:20
//       },
//   });

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
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
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
    },
    backRightBtnRight: {
        backgroundColor: 'purple',
        right: 225,
    },
    backRightBtnTest: {
        backgroundColor: 'red',
        right: 0,
    },
});