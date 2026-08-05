import AppProviders from "./providers/AppProviders";
import AppRoutes from "../routes/AppRoutes"; // Or wherever your routes file is located

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;