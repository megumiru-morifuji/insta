import TopPages from "./pages/TopPages";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import './App.css'
import { BrowserRouter,Router, Routes, Route } from 'react-router-dom';
import {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import ProfileEdit from "./pages/ProfileEdit";




function App() {
  // ログイン時に使う
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
// ログインされたユーザー情報
  const [loginUsername, setLoginUsername] = useState(""); // ← これがログイン後のユーザーの名前
  const [loginUserDisplayname, setLoginUserDisplayname] = useState(""); // ← これがログイン後のユーザーの表示されるされる名前
  const [loginUserId, setLoginUserId] = useState(""); // ← これがログイン後のユーザーのID
  const [loginUserEmail, setLoginUserEmail] = useState(""); // ← これがログイン後のユーザーのemail
  const [loginUserIntroduction, setLoginUserIntroduction] = useState(""); // ← これがログイン後のユーザーの自己紹介文
  const [loginUserWebSite, setLoginUserWebSite] = useState(""); // ← これがログイン後のユーザーの自己紹介文

  const [uploadedFileUrl, setUploadedFileUrl] = useState("");//投稿されたファイルのURL
  const [file, setFile] = useState(null);
  

  

  // アップロード成功時の関数
  const onUploadSuccess = (url) => {
  console.log("アップロード成功！受け取ったURL:", url);
  setUploadedFileUrl(url); // など必要な処理
};
    


  // リロードしてもログイン情報が消えないようにする
  useEffect(() => {
    const savedUsername = localStorage.getItem("loginUsername");
    const savedDisplayname = localStorage.getItem("loginUserDisplayname");
    const savedUserId = localStorage.getItem("loginUserId");
    const savedUserEmail = localStorage.getItem("loginUserEmail");
    const savedIntroduction = localStorage.getItem("loginUserIntroduction");
    const savedWebsite = localStorage.getItem("loginWebsite");

    if (savedUsername && savedUserId && savedUserEmail) {
      setLoginUsername(savedUsername);
      setLoginUserDisplayname(savedDisplayname);
      setLoginUserId(savedUserId);
      setLoginUserEmail(savedUserEmail);
      setLoginUserIntroduction(savedIntroduction || ""); // ← 追加
    setLoginUserWebSite(savedWebsite || ""); // ← 追加
    }

  /* 第1引数には任意のタイミングで実行させたい関数を記述 */
  },[]) // 第2引数には第1引数の関数を実行するタイミングを制御する変数を配列で記述
    


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>} >
          <Route index element={<TopPages loginUsername={loginUsername} loginUserDisplayname={loginUserDisplayname} loginUserId={loginUserId} loginUserEmail={loginUserEmail} />} />
          <Route path="/:loginUserIdPass" element={<UserPage setUploadedFileUrl={setUploadedFileUrl} file={file} setFile={setFile} uploadedFileUrl={uploadedFileUrl} onUploadSuccess={onUploadSuccess} loginUsername={loginUsername} loginUserId={loginUserId} loginUserEmail={loginUserEmail} loginUserDisplayname={loginUserDisplayname}/>} />
          <Route path=":loginUserIdPass/edit" element={<ProfileEdit setLoginUserDisplayname={setLoginUserDisplayname} setLoginUserWebSite={setLoginUserWebSite} setLoginUserIntroduction={setLoginUserIntroduction} loginUserIntroduction={loginUserIntroduction} loginUserDisplayname={loginUserDisplayname} loginUserWebSite={loginUserWebSite} loginUserId={loginUserId}/>} />
        </Route>
        
        <Route path="/login" element={<Login setLoginUserWebSite={setLoginUserWebSite} setLoginUserIntroduction={setLoginUserIntroduction} email={email} password={password} setEmail={setEmail} setPassword={setPassword} setLoginUsername={setLoginUsername} setLoginUserId={setLoginUserId} setLoginUserEmail={setLoginUserEmail} setLoginUserDisplayname={setLoginUserDisplayname}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
        {/* 他のルートを追加予定 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
