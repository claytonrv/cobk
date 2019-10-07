import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, AsyncStorage, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import StopList from '../components/StopList';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function List (){

    const [stops, setStops] = useState([]);

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

    const lastStop = stops[stops.length-1];

    function handleRegistration(){

    }

    return <SafeAreaView style={styles.containe}>
        <Image style={styles.logo} source={logo} />

        <ScrollView>
            <StopList stopList={stops} />
        </ScrollView>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Registrar {(lastStop == null || lastStop.stopType == "OUT" ? "entrada" : "saída")}</Text>
        </TouchableOpacity>
    </SafeAreaView>
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
        height: 40,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
})