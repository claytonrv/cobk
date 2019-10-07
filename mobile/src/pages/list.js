import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import socketio from 'socket.io-client';

import StopList from '../components/StopList';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function List (){

    const [stops, setStops] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(userid => {
            const socket = socketio('http://192.168.0.13:3333', {
                query: { userid }
            });

            socket.on('newStop', booking => {
                loadStops();
            })
        });
    }, []);

    useEffect(() => {
        loadStops();
    }, []);

    async function loadStops(){
        const userid = await AsyncStorage.getItem('user');
        const now = new Date();
        const date = now.getFullYear()+'-'+(now.getMonth()+1 < 10 ? '0'+now.getMonth()+1 : now.getMonth()+1)+'-'+(now.getDate() < 10 ? '0'+now.getDate() : now.getDate());
        const response = await api.get('/dashboard', { 
            params: { date },
            headers: { userid }
        });
        setStops(response.data);
    }

    async function handleRegistration(){
        const userid = await AsyncStorage.getItem('user');
        const lastStop = stops[stops.length-1];
        const stopType = (lastStop == null || lastStop.stopType == "OUT" ? "IN" : "OUT");
        console.log(stopType);
        api.post('/add_stop', {
            stopType
        }, {
            headers: { userid }
        });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                <StopList stopList={stops} />
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                <Text style={styles.buttonText}>Registrar {((stops[stops.length-1]) == null || (stops[stops.length-1]).stopType == "OUT" ? "entrada" : "saída")}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    logo: {
        alignSelf: 'center',
        marginTop: 20
    },
    
    button: {
        width: '80%',
        alignSelf: 'center',
        height: 60,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
})