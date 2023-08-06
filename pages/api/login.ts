import { NextApiRequest, NextApiResponse } from 'next';
import { Md5 } from 'ts-md5';
import { ServiceResp } from '../../types/ApiResponse';

const fakeUser = {
    loginname: "brian0091",
    email: "brian0091@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e"
}

export default function handler(req: NextApiRequest, res: NextApiResponse){
    const resBuilder = ServiceResp.builder();
    let result: ServiceResp | {} = {}
    if (req.method === 'POST') {
        const reqBody = req.body;
        const { loginname, password } = reqBody;

        if (loginname === undefined || password === undefined
            || loginname === null || password === null) {
            result = resBuilder
                .code(401)
                .message('使用者名稱或密碼，參數錯誤')
                .data({ reqParam: reqBody })
                .build();
            res.status(401).json(result);
            return;
        }

        // 假設驗證使用者名稱和密碼是否正確
        if (loginname === fakeUser.loginname && Md5.hashStr(password) === fakeUser.password) {
            // 登入成功
            result = resBuilder
                .code(200)
                .message('登入成功')
                .data({ loginname, email: fakeUser.email })
                .build();

            res.status(200).json(result);
        } else {
            // 登入失敗
            result = resBuilder
                .code(401)
                .message('登入失敗，使用者名稱或密碼錯誤')
                .data({ reqParam: req.body })
                .build();
            res.status(401).json(result);
        }
    } else {
        result = resBuilder
            .code(405)
            .message('不支援除了 POST 以外的其他請求方法')
            .data({})
            .build();
        res.status(405).json(result); // 不支援除了 POST 以外的其他請求方法
    }
}
