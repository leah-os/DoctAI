import { OpenAI } from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

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
            console.log(genPart.inlineData.mimeType);
            console.log(genPart.inlineData.data);
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: prompt },
                    { 
                        role: 'user',
                        mimeType: genPart.inlineData.mimeType,
                        content: genPart.inlineData.data 
                    }
                ],
            });

            return response.choices[0].message.content;
        }
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0].message.content;
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