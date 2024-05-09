import './App.css';
import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

function App() {
    const [messageGateway1, setMessageGateway1] = useState('');
    const [messageGateway2, setMessageGateway2] = useState(''); // Nuevo estado para el segundo mensaje

    useEffect(() => {
        const clientGateway1 = mqtt.connect('mqtt://localhost:9001');

        // Maneja la conexión exitosa para el gateway 1
        clientGateway1.on('connect', () => {
            console.log('Conectado al servidor MQTT - Gateway 1');
            clientGateway1.subscribe('/gw/ac233fc18d06/status', (err) => {
                if (err) {
                    console.error('Error al suscribirse al tema en Gateway 1:', err);
                } else {
                    console.log('Suscrito al tema "/gw/ac233fc18d06/status" - Gateway 1');
                }
            });

            // Suscripción al segundo tema
            clientGateway1.subscribe('/gw/ac233fc18cfb/status', (err) => {
                if (err) {
                    console.error('Error al suscribirse al tema en Gateway 1:', err);
                } else {
                    console.log('Suscrito al tema "/gw/ac233fc18cfb/status" - Gateway 1');
                }
            });
        });

        // Maneja los mensajes recibidos para el gateway 1
        clientGateway1.on('message', (topic, message) => {
            if (topic === '/gw/ac233fc18d06/status') {
                setMessageGateway1(message.toString());
            } else if (topic === '/gw/ac233fc18cfb/status') {
                setMessageGateway2(message.toString());
            }
        });

        return () => {
            if (clientGateway1) {
                clientGateway1.end();
            }
        };
    }, []);

    return (
        <div>
            <h1>Datos MQTT - Gateway 1:</h1>
            <p>Mensaje 1: {messageGateway1}</p>
            <p>Mensaje 2: {messageGateway2}</p>
        </div>
    );
}

export default App;
