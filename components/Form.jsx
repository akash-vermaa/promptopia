
import Link from "next/link";

export default function Form({type, post, setPost, submit, handleSubmit}){
    return(
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{ type } Post </span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world and let your imagination run wild with any AI powered platform
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">Your AI prompts</span>
                    <textarea 
                        value={post.prompt}
                        onChange={(event) => setPost({...post, prompt: event.target.value})}
                        placeholder="Write your prompt here..."
                        required
                        className="form_textarea"
                    />
                </label>
                
                <label>
                    <span 
                        className="font-satoshi font-semibold text-base text-gray-700"
                    >
                        Tag
                        <span className="font-normal"> (#product, #webdevelopment, #idea)</span>
                        <input 
                            value={post.tag}
                            onChange={(event) => setPost({...post, tag: event.target.value})}
                            placeholder="#tag"
                            required
                            className="form_input"
                        />
                    </span>
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link
                        href="/"
                        className="text-gray-500 text-sm"
                    >
                        Cancel
                    </Link>

                    <button
                    className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                        type="submit"
                        disabled={submit}

                    >
                        {submit ? `${type}ing...`: type }
                    </button>
                </div>
            </form>

        </section>
    );
}