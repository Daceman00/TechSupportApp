const express = require('express');
const http = require('http');
const fs = require('fs');
const pdf = require('pdf-parse');
const { HfInference } = require('@huggingface/inference');
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',  // Allow only this origin
        methods: ['GET', 'POST'],  // Allow only specific methods
    }
});

const hf = new HfInference("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");

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('generate', async ({ pdfPath, question, max_new_tokens }) => {
        console.log("Received payload:", { pdfPath, question, max_new_tokens });

        if (!pdfPath || !question) {
            socket.emit('error', 'PDF path and question are required.');
            return;
        }

        try {
            const pdfBuffer = fs.readFileSync(pdfPath);
            const pdfData = await pdf(pdfBuffer);
            let extractedText = pdfData.text;

            // Truncate text if it exceeds a certain length
            const maxInputTokens = 32000;  // Adjust this as necessary
            if (extractedText.length > maxInputTokens) {
                extractedText = extractedText.slice(0, maxInputTokens);
            }

            const prompt = `\n\nText:\n${extractedText}\n\nQuestion:\n${question}`;
            const completion = await hf.textGeneration({
                model: 'mistralai/Mistral-7B-Instruct-v0.2',
                inputs: prompt,
                max_new_tokens: max_new_tokens || 15,  // Increase this as needed
                temperature: 0.7,  // Adjust for randomness
                top_p: 0.9,        // Adjust for diversity
                repetition_penalty: 1.1,
            });

            socket.emit('answer', { ok: true, question, answer: completion.generated_text });
        } catch (err) {
            console.error('Error:', err);
            socket.emit('error', 'Failed to process PDF or generate answer.');
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
