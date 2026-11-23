import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Layout() {
    return (
        <div>
            <Navbar />
            {/* Espaço para a navbar fixa não cobrir o conteúdo */}
            <main className="container" style={{ paddingTop: '120px' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
