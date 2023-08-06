import axios from "axios";
import { useState } from "react";
import { ServiceResp } from "../../types/ApiResponse";
import { useRouter } from "next/router";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 在這裡處理登入邏輯，例如提交表單或呼叫 API
    console.log("Username:", username);
    console.log("Password:", password);
    const status = await signIn("credentials", {
      redirect: false,
      loginname: username,
      password: password,
      callbackUrl: "/",
    });
    if (status?.ok && status.url) {
      router.push(status.url);
    } else {
    }

    // try {
    //   const res = await axios.post("/api/login", {
    //     loginname: username,
    //     password: password,
    //   });
    //   const resObj: ServiceResp = res.data;
    //   if (resObj.isSuccess()) {
    //     router.push("/");
    //   } else {
    //     //TODO
    //     return;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">登入</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              使用者名稱
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              密碼
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            type="submit"
            onClick={handleLogin}
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  console.log(session);

  if (session) {
    return {
      redirect: {
        destination: "/", // 指定重定向目标路径
        permanent: false, // 如果为 true，则 HTTP 状态码为 301（永久重定向），否则为 302（临时重定向）
      },
    };
  }
  return {
    props: {},
  };
}
