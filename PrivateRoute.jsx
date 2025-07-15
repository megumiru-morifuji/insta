//PrivateRoute.jsx トークン検証
// シンプル版：基本的なトークン検証のみ
// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = 確認中

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                // トークンの有効性をバックエンドで確認
                const response = await fetch('http://localhost:8080/api/validate-token', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // // AuthorizationででJWTトークンを送る
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    // 無効なトークンを削除
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('認証確認エラー:', error);
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // 認証確認中
    if (isAuthenticated === null) {
        return <div>認証確認中...</div>;
    }

    // 認証失敗時はログインページへ
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 認証成功時は元のコンポーネントを表示
    
    return children;
};

export default PrivateRoute;
