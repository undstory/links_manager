import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import type { LinkType } from "../../types/linkTypes";

import { updateStatus } from "../../api/updateStatus";
import LinksTableView from "../../components/LinksTableView/LinksTableView";

type LinksPageProps = {
  refreshKey: number;
  setSelectedLink: (link: LinkType | null) => void;
  setModalType: (type: "add" | "edit" | null) => void;
};

function LinksPage({
  refreshKey,
  setSelectedLink,
  setModalType,
}: LinksPageProps) {
  const [allLinks, setAllLinks] = useState<LinkType[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchLinks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/links/all`);
      if (!res.ok) throw new Error("Fetch failed");

      const data: LinkType[] = await res.json();

      setAllLinks(data);
    } catch (e) {
      console.log(e);
      setErrorMessage("Nie udało się pobrać danych, spróbuj póżniej");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [refreshKey]);

  const handleEdit = (link: LinkType) => {
    setSelectedLink(link);
    setModalType("edit");
  };

  const handleOpen = async (item: LinkType) => {
    if (item.status === "TO_READ") {
      await updateStatus(item.id, "READ");
      fetchLinks();
    }
  };

  const removeItem = async (id: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/links/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setAllLinks((prev) => (prev ? prev.filter((el) => el.id !== id) : null));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main__container">
      <PageHeader title="wszystkie linki" />
      <LinksTableView
        data={allLinks ?? []}
        errorMessage={errorMessage}
        onRemoveItem={removeItem}
        onEdit={handleEdit}
        onOpen={handleOpen}
      />
    </div>
  );
}
export default LinksPage;
