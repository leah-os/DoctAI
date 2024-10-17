import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAylqfEI9wcqCJ98m7ArH4A-GghpDajaNs');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Функция для отправки запроса в Gemini AI
async function askGemini(prompt) {
    try {
        const result = await model.generateContent([prompt]);
        return result.response.text();
    } catch (error) {
        console.error('Ошибка при запросе к Gemini AI:', error); // Полное сообщение об ошибке
        return 'Не удалось получить ответ. Попробуйте еще раз.';
    }
}

export async function POST(req) {
    const { message } = await req.json();

    if(!message) {
        return new Response(
            JSON.stringify({error: "Message is required"}),
            { status : 400 }
        )
    }
    
    try {
        const resp = await askGemini(message);
        return new Response(
            JSON.stringify({reply: resp}),
            { status: 200 }
        );
    } catch(ex) {
        console.error('Error fetching from Gemini API');
        return new Response(
            JSON.stringify({error: "Failed to get a response from Gemini API"}),
            { status: 500 }
        );
    }
}