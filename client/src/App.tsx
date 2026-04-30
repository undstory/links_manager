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
import type { LinkType } from "./types/linkTypes";

function App() {
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedLink, setSelectedLink] = useState<LinkType | null>(null);

  return (
    <div className="main-container">
      <Sidebar setModalType={setModalType} />
      {modalType ? (
        <Modal
          title={modalType === "add" ? "Dodaj link" : "Edytuj link"}
          onClose={() => {
            setModalType(null);
            setSelectedLink(null);
          }}
        >
          <AddModalContent
            type={modalType}
            initialData={selectedLink ?? undefined}
            onSuccess={() => setRefreshKey((prev) => prev + 1)}
            setModalType={setModalType}
          />
        </Modal>
      ) : null}
      <Routes>
        <Route
          path={PATHS.DASHBOARD}
          element={<DashboardPage refreshKey={refreshKey} />}
        />
        <Route
          path={PATHS.LINKS}
          element={
            <LinksPage
              setSelectedLink={setSelectedLink}
              setModalType={setModalType}
              refreshKey={refreshKey}
            />
          }
        />
        <Route path={PATHS.TO_READ} element={<ToReadPage />} />
        <Route path={PATHS.FAVORITE} element={<FavoritePage />} />
      </Routes>
    </div>
  );
}

export default App;
