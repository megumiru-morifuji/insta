//Login.jsx
// ログインページ
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';


const Login=({email,password,setEmail,setPassword}) =>{
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const navigate = useNavigate(); // ← これで「遷移する機能」を取得

    const handleLogin=(e)=>{
        e.preventDefault();
        fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                console.error('サーバーエラー');
            }
            navigate('/');
        })
        .catch(error => {
            console.error('通信に失敗しました', error);
        }); // ← ここで fetch の Promise チェーンが終了
    }; // 
    
    return(
        <div className="">
            <form action="" onSubmit={handleLogin}>
                <input type="email" name="" onChange={e=>setEmail(e.target.value)}/>
                <input type="text" name="" onChange={e=>setPassword(e.target.value)} />
                <button>ログイン</button>

            </form>
           
        </div>
    )
}

export default Login;
