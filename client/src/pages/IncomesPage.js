import Navbar from "../components/Navbar";
import { VentasHeader } from "./HomeVentas";
import IncomesList from "../components/incomes/IncomesList";
import IncomesFilter from "../components/incomes/IncomesFilter";
import { IncomesProvider, useIncomes } from "../context/incomesContext";

export function IncomesPage() {
  return (
    <IncomesProvider>
      <IncomesPageContent />
    </IncomesProvider>
  );
}

function IncomesPageContent() {
  const { incomes } = useIncomes();
  return (
    <div>
      <Navbar />
      <hr className="my-3 h-0.5 border-t-0 bg-neutral-100 opacity-50 dark:opacity-50" />
      <VentasHeader />
      <IncomesFilter />

      <IncomesList incomes={incomes} />
    </div>
  );
}
