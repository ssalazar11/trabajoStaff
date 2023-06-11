// import logo from "../assets/logo_merch.png";
import "../css/cards.css";

export function IncomesResume({ incomes }) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center ">
          <div className="card">
            <h3>Ventas hoy</h3>
            <p>$1000</p>
          </div>

          <div className="card">
            <h3>Saldos</h3>
            <h4>Efectivo:</h4>
            <h4>Nequi:</h4>
            <h4>Crédito:</h4>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>ultimas ventas</h3>
        <p>$300</p>
      </div>
    </div>
  );
}

// <div>
//   <div style={{ textAlign: "right" }}>
//     <img src={logo} alt="Logo" style={{ height: "80%", marginTop: "-30px" }} />
//   </div>
//   {/* <SerchableProductTable /> */}
// </div>;
