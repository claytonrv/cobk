import React, { useEffect, useState, useMemo } from 'react';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard ({ history }) {
    const [stops, setStops] = useState([]);

    const userid = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333',{
        query: {userid},
    }), [userid]);

    useEffect(() => {
        socket.on('newStop', data => {
            loadStops();
        })
    }, [socket]);

    async function loadStops(){
        const now = new Date();
        const date = now.getFullYear()+"-"+((now.getMonth()+1) < 10 ? "0"+(now.getMonth()+1) : (now.getMonth()+1))+"-"+(now.getDate() < 10 ? "0"+now.getDate() : now.getDate());
        const userid = localStorage.getItem('user');
        const response = await api.get(`/dashboard?date=${date}`, {
            headers: { userid }
        });
        setStops(response.data);
    }

    useEffect(() => {
        loadStops();
    }, []);

    async function handleSubmit(event){
        event.preventDefault();
        
        const userid = localStorage.getItem('user');
        const stopType = (lastStop === null || lastStop.stopType === "OUT" ? "IN" : "OUT");
        
        await api.post('/add_stop', { stopType: stopType }, {
            headers: { userid }
        });

        loadStops()
    }

    const lastStop = stops[stops.length-1];

    return (
        <>
            <ul className="stop-list">
                {stops.map(stop => (
                    <li key={stop._id}>
                        <header>

                        </header>
                        <strong>{stop.stopType === 'IN' ? "Entrada" : 'Saída'}</strong>
                        <span>Dia: {stop.date}</span>
                        <span>Hora: {stop.time}</span>
                   </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <button className="btn" type="submit" >Nova {(lastStop == null || lastStop.stopType == "OUT" ? "entrada" : "saída")}</button>
            </form>
        </>
    )
}