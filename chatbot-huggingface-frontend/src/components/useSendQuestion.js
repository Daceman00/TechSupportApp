import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

export function useSendQuestion() {
    const [isSending, setIsSending] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on('answer', (data) => {
            setIsSending(false);
            setResponse(data);
            console.log(data)
        });

        socket.on('error', (errorMessage) => {
            setIsSending(false);
            setError(errorMessage);
        });

        return () => {
            socket.off('answer');
            socket.off('error');
        };
    }, []);

    const sendQuestion = ({ pdfPath, question, maxNewTokens = 15 }) => {
        setIsSending(true);
        setResponse(null);
        setError(null);

        socket.emit('generate', {
            pdfPath,
            question,
            max_new_tokens: maxNewTokens
        });
    };

    return { isSending, response, error, sendQuestion };
}