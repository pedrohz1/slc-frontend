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
            <h2>Locações ativas</h2>
            <div className="progress">
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${dados.locacoesAtivas * 8}%` }} aria-valuenow={dados.locacoesAtivas}></div>
            </div>
            <h2>Locações realizadas</h2>
            <div className="progress">
                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${dados.locacoesRealizadas * 8}%` }} aria-valuenow={dados.locacoesAtivas}></div>
            </div>
            <h2>Renda bruta</h2>
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${dados.rendaBruta / 7}%` }} aria-valuenow={dados.rendaBruta / 5}></div>
            </div>
        </div>
    )
}

export default Dashboard;