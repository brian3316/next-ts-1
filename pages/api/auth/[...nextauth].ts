import NextAuth from 'next-auth';
import { Md5 } from 'ts-md5';
import Providers from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextApiRequest } from 'next';


const fakeUser = {
    name: "brian0091",
    email: "brian0091@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e"
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                console.log("cre", credentials);

                if (credentials?.loginname && credentials?.password) {
                    if (credentials.loginname === fakeUser.name && Md5.hashStr(credentials.password) === fakeUser.password) {
                        // 驗證成功，回傳使用者資料
                        // return Promise.resolve(fakeUser);
                        return fakeUser;
                    } else {
                        // 驗證失敗，回傳 null 表示登入失敗
                        // return Promise.resolve(null);
                        return null;
                    }
                } else {
                    // 沒有提供登入名稱或密碼，回傳 null 表示登入失敗
                    // return Promise.resolve(null);
                    
                }
            }
        })
    ],
    session: {
        maxAge: 60,
    },
    callbacks: {
        async session({ session, user, token }) {
            console.log({session,user,token});
            return session;
        },
    },

});
