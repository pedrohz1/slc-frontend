import { useState, useEffect } from "react";
import { getDados } from "../shared/api/dashboard.api";

function Dashboard() {

    const [dados, setDados] = useState();

    useEffect(() => {
        getDados().then((response) => {
            setDados(response);
            console.log(dados)
        });
    }, []);

    if (!dados) return null;

    return (
        <div>
            <div className="p-2">
                <div className="d-flex flex-column align-items-center text-center">
                    <h1>Portal de Resultados</h1>
                    <span>01/11/2026 - 30/11/2026</span>
                </div>
            </div>
            <div className="d-flex gap-1 align-items-center w-25 m-2">
                <h3 className="mb-0">Locações ativas</h3>
                <span>- {dados.locacoesAtivas}</span>
            </div>
            <div className="progress rounded-pill">
                <div className="progress-bar rounded-pill bg-warning" role="progressbar" style={{ width: `${dados.locacoesAtivas * 8}%` }} aria-valuenow={dados.locacoesAtivas}></div>
            </div>
            <div className="d-flex gap-1 align-items-center w-50 m-2">
                <h3>Locações realizadas</h3>
                <span>- {dados.locacoesRealizadas}</span>
            </div>
            <div className="progress rounded-pill">
                <div className="progress-bar rounded-pill bg-info" role="progressbar" style={{ width: `${dados.locacoesRealizadas * 8}%` }} aria-valuenow={dados.locacoesAtivas}></div>
            </div>
            <div className="d-flex gap-1 align-items-center w-25 m-2">
                <h3>Renda bruta</h3>
                <span>- R${dados.rendaBruta},00</span>
            </div>
            <div className="progress rounded-pill">
                <div className="progress-bar rounded-pill bg-success" role="progressbar" style={{ width: `${dados.rendaBruta / 7}%` }} aria-valuenow={dados.rendaBruta / 5}></div>
            </div>
        </div>
    )
}

export default Dashboard;