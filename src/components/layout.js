import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Layout() {
    return (
        <div>
            <Navbar />
            <main className="container" style={{ paddingTop: '120px' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
