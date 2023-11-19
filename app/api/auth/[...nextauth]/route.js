import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from "@models/users";
import connectToDB from '@utils/db';

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({session}){
            try{
                const sessionUser = await User.findOne({email: session.user.email});
                session.user.id = await sessionUser._id.toString();
        
                return session;
            }
            catch(error){
                console.log(error.message)
            }
            
        },
        async signIn({account, profile}){
            try{
                if (account.provider === "google") {
                    await connectToDB();
    
                    // get user from db using email
                    const user = await User.findOne({email: profile.email});
                    // if user does not exists, create new one in db
                    if(!user){
                        const newUser = new  User({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(),
                            image: profile.picture
                        })
                        await newUser.save();
                    }   

                    return profile.email_verified && profile.email.endsWith("@gmail.com");
                }
                else{
                    return false;
                }
                
            }
            catch(error){
                console.log("Error in Sign in, ", error.message)
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
