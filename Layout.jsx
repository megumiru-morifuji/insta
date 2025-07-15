//Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Layout=()=>{
    return(
        <div>
            <div className="toppage-flex">
                <Sidebar />
                <div>
                    <Outlet /> {/* ここがページによって切り替わる部分 */}
                </div>
    </div></div>
    )
}

export default Layout;
