import { Route, Routes } from "react-router";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LinksPage from "./pages/Links/LinksPage";
import { PATHS } from "./constants/paths";
import ToReadPage from "./pages/ToRead/ToReadPage";
import FavoritePage from "./pages/Favorite/FavoritePage";
import { useState } from "react";
import { Modal } from "./components/Modal/Modal";
import AddModalContent from "./components/AddModalContent/AddModalContent";

function App() {
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="main-container">
      <Sidebar onOpenModal={(type) => setModalType(type)} />
      {modalType === "add" ? (
        <Modal title="Dodaj link" onClose={() => setModalType(null)}>
          <AddModalContent
            onSuccess={() => setRefreshKey((prev) => prev + 1)}
            setModalType={setModalType}
          />
        </Modal>
      ) : null}
      <Routes>
        <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />
        <Route
          path={PATHS.LINKS}
          element={<LinksPage refreshKey={refreshKey} />}
        />
        <Route path={PATHS.TO_READ} element={<ToReadPage />} />
        <Route path={PATHS.FAVORITE} element={<FavoritePage />} />
      </Routes>
    </div>
  );
}

export default App;
