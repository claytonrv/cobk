import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { bold } from 'ansi-colors';


export default function StopList({ stopList }){
    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={stopList}
                keyExtractor={stop => stop._id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={styles.type}>{item.stopType == "IN" ? "Entrada" : "Saída"}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={styles.hour}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    list: {
        paddingVertical:20,
    },

    listItem: {
        alignSelf: 'center',
        padding: 5,
        marginBottom: 15,
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#d6d7da",
    },

    type: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5
    },

    date: {
        fontSize: 18,
        color: '#ddd',
        marginTop: 5
    },

    hour: {
        alignSelf: 'center',
        fontSize: 25,
        color:'#999',
        fontWeight: 'bold',
        marginTop: 5
    },
});