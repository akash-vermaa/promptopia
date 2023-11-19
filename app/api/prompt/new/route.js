import connectToDB from '@utils/db';
import Prompt from '@models/prompts';

export async function POST(req, res){
    const { userId, prompt, tag } = await req.json();

    try{
        await connectToDB();
        
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});
    }
    catch(error){
        return new Response({
            status: 500,
            msg: "Failed to create a response"
        }, {status: 500});
    }
}