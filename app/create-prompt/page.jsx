'use client';

import {useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";


export default function CreatePrompt(){
    const router = useRouter();
    const {data: session} = useSession();

    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    async function createPrompt(event){
        event.preventDefault();

        setSubmit(true);

        try{
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok){
                router.push('/');
            }
        }
        catch(error){
            console.log("Error in creating prompt", error.message);
        }
        finally{
            setSubmit(false);
        }
    }

    return (
        <Form 
            type="Create"
            post={post}
            setPost={setPost}
            submit = {submit}
            handleSubmit = {createPrompt}
        />
    );
}