//UserPage.jsx

import ProfileUpload from "../components/ProfileUpload";
import { useParams } from "react-router-dom";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import ProfileEdit from "../pages/ProfileEdit";
import { Link } from "react-router-dom";

const UserPage = ({ uploadedFileUrl,setUploadedFileUrl,loginUsername, loginUserId, loginUserEmail,loginUserDisplayname,onUploadSuccess,setFile,file}) => {
  const { loginUserIdPass } = useParams();
  const [userExists, setUserExists] = useState(null);//ユーザーが存在するかどうの状態管理理
  const navigate = useNavigate(); // ← これで「遷移する機能」を取得

  const [targetUser, setTargetUser] = useState({
  targetUsername: "",
  targetUserDisplayname: "",
  targetUserId: ""
});
           // 表示対象のユーザー情報
  const [targetUserExists, setTargetUserExists] = useState(null); // 存在確認
  
 // 投稿完了した際の挙動
  useEffect(() => {
  if (uploadedFileUrl) {
    console.log("投稿完了");
    const handleUpload = async () => {
           

            try {
               
                const response = await fetch('http://localhost:8080/api/handleUpload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      user_id: loginUserId,    // 事前に取得しているログインユーザーID
                      mediaUrl: uploadedFileUrl
                    })
                });

                if (response.ok) {
                    console.log(response);
                    setUploadedFileUrl(null);
                    setFile(null);
                    document.getElementById("upload-input").value = "";
                } else {
                    alert("投稿データの保存に失敗しました");
                }
            } catch (error) {
                console.error('認証確認エラー:', error);
                 alert("投稿データの保存に失敗しました");
            }
        };

        handleUpload();

  }
}, [uploadedFileUrl]); // ← 依存配列に指定

   useEffect(() => {
    // サーバーに該当ユーザーが存在するか問い合わせ
    fetch(`http://localhost:8080/api/users/${loginUserIdPass}`)
      .then(response => {
        if (response.ok) {
          setUserExists(true); // ユーザー存在
          return response.json(); // ← レスポンスのJSONを取得
        } else if (response.status === 404) {
          setUserExists(false); // 存在しない
        } else {
          throw new Error("サーバーエラー");
        }
      })
      .then(data => {
            console.log(data);
            
  
            setTargetUser({
              targetUsername: data.username,
              targetUserDisplayname: data.displayname,
              targetUserId: data.userId
            });

        })
      .catch(err => {
        console.error("通信エラー", err);
        navigate("/error"); // 通信失敗はエラーページへ
      });
  }, [loginUserIdPass]);

  if (userExists === null) {
    return <div>読み込み中...</div>; // 読み込み中表示
  }

  if (userExists === false) {
    return <div>指定されたユーザーは存在しません。</div>; // 404表示（簡易版）
    // もしくは navigate("/notfound") でもOK
  }


 

  

  


  // 自分のページかどうかを判定
  const isOwnProfile = loginUserIdPass === loginUsername;


  return (
    <div className="toppage-flex">
      <div>
           {isOwnProfile&&(
      
        <div style={{ marginTop: '20px' }}>
            <Link 
              to={`/${loginUsername}/edit`}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                display: 'inline-block'
              }}
            >
              プロフィール編集
            </Link>
          </div>
      )}
        <p>表示されているユーザーの情報</p>
          <div>ユーザーアカウント: {loginUserIdPass}</div>
          <div>ユーザーネーム: {targetUser.targetUserDisplayname}</div><ProfileUpload setUploadedFileUrl={setUploadedFileUrl} onUploadSuccess={onUploadSuccess}/></div>
   
  
     <div className="my-acount">
          
        </div>
      <div className="my-acount">
          <p>自分のログイン情報</p>
          <div>ユーザーアカウント: {loginUsername}</div>
          <div>ユーザーネーム: {loginUserDisplayname}</div>
      </div>
      
        
    
    
    </div>
  );
};

export default UserPage;
