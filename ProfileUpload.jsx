// ProfileUpload.jsx

import { useState } from "react";
// import { FaPlusCircle } from "react-icons/fa"; // 一時的にコメントアウト

const ProfileUpload = ({ onUploadSuccess,setUploadedFileUrl,setFile,file }) => {
 

  const handleUpload = async () => {
    if (!file) return alert("ファイルを選択してください");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "img_preset"); // ここはプリセット名に合わせる
    formData.append("api_key", "297819297723733"); // ← ここに入力

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dybeoma2g/auto/upload", {  //クラウドネーム入れる
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("アップロード成功:", result.secure_url);
      console.log("アップロード成功レスポンス:", result); // ← 🔍ここで中身を全て見る
      onUploadSuccess(result.secure_url); // 親コンポーネントにURL渡す
      
    } catch (error) {
      console.error("アップロード失敗", error);
      alert("アップロード中にエラーが発生しました");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: "none" }}
        id="upload-input"
      />
      <label htmlFor="upload-input" style={{ 
        cursor: "pointer", 
        fontSize: "3rem", 
        color: "#555",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "2px dashed #555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9"
      }}>
        +
      </label>
      {file && (
        <div>
          <p>{file.name}</p>
          <button onClick={handleUpload}>アップロード</button>
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
