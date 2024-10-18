import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function fileToGenerativePart(file) {
    if(!file) return null;

    const mimeType = file.type;

    return {
        inlineData: {
            data: Buffer.from(await file.arrayBuffer()).toString('base64'),
            mimeType
          },
    };
}

// Функция для отправки запроса в Gemini AI
async function askGemini(prompt, genPart) {
    try {
        if(genPart) {
            const result = await model.generateContent([prompt, genPart]);
            return result.response.text();
        }
        const result = await model.generateContent([prompt]);
    } catch (error) {
        console.error('Ошибка при запросе к Gemini AI:', error); // Полное сообщение об ошибке
        return 'Не удалось получить ответ. Попробуйте еще раз.';
    }
}

export async function POST(req) {
    const formData = await req.formData();
    const message = await formData.get('text');

    const file = await formData.get('file');

    if(!message) {
        return new Response(
            JSON.stringify({error: "Message is required"}),
            { status : 400 }
        )
    }
    
    try {
        const genPart = await fileToGenerativePart(file);
        const resp = await askGemini(message, genPart);
        return new Response(
            JSON.stringify({reply: resp}),
            { status: 200 }
        );
    } catch(ex) {
        console.log(ex);
        console.error('Error fetching from Gemini API');
        return new Response(
            JSON.stringify({error: "Failed to get a response from Gemini API"}),
            { status: 500 }
        );
    }
}