//Signup.jsx
// ユーザー登録ページ
import {useState,useEffect} from "react";


const Signup=() =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    const handleSignup=(e)=>{
        e.preventDefault();
        fetch("http://localhost:8080/api/login",{method: "POST",
            headers: {
                "Content-Type": "application/json"  // body の形式をサーバーに通知
            },
            body: JSON.stringify({                // 送るデータを JSON 文字列に変換
                email: email,
                password: password,
                name:name
            })})
        .then(res=>console.log(res))
    }
    
    return(
        <div className="">
            <form action="" onSubmit={handleSignup}>
                email:
                <input type="email" onChange={e=>setEmail(e.target.value)}/>
                パスワード：
                <input type="text" onChange={e=>setPassword(e.target.value)} />
                名前：
                <input type="text" onChange={e=>setName(e.target.value)} />
                <button>登録</button>

            </form>
           
        </div>
    )
}

export default Signup;
