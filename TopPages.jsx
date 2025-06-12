//TopPages.jsx
// トップページ

import Sidebar from "../components/Sidebar";
import MainFeed from "../components/MainFeed";
import RightSidebar from "../components/RightSidebar";
const TopPages=() =>{
    
    return(
        <div className="toppage-flex">
           <Sidebar />
           <MainFeed />
           <RightSidebar />
        </div>
    )
}

export default TopPages;
