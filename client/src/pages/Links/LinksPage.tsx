import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import style from "./LinksPage.module.scss";
import type { LinkType } from "../../types/linkTypes";
import { statusConfig } from "../../constants/stylesConfig";
import Table from "../../components/Table/Table";
import { updateStatus } from "../../api/updateStatus";

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
      const res = await fetch("http://localhost:3001/links/all");
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
      const res = await fetch(`http://localhost:3001/links/${id}`, {
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
      <div className="table__wrapper">
        {errorMessage ? (
          <p className={style.error}>{errorMessage}</p>
        ) : allLinks === null ? (
          <p>Ładowanie...</p>
        ) : allLinks.length === 0 ? (
          <div className={style.emptyState}>
            <p>Brak linków w bazie</p>
            <span>Dodaj pierwszy link, żeby zacząć</span>
          </div>
        ) : (
          <Table
            data={allLinks}
            keyExtractor={(el) => el.id}
            columns={[
              {
                header: "Nazwa linku",
                render: (el) => (
                  <div className={style.tooltip}>
                    <a
                      href={el.url}
                      className={style.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleOpen(el)}
                    >
                      {el.title}
                      {el.description && el.description.length > 0 ? (
                        <span className={style.tooltipText}>
                          {el.description}
                        </span>
                      ) : null}
                    </a>
                  </div>
                ),
              },
              {
                header: "Kategoria",
                render: (el) => (el.category ? el.category.name : "-"),
              },
              {
                header: "Tagi",
                render: (el) =>
                  el.tags
                    ? el.tags.map((t) => (
                        <span className={style.tag} key={t.tag.id}>
                          {t.tag.name}
                        </span>
                      ))
                    : "-",
              },
              {
                header: "Status",
                render: (el) => statusConfig[el.status].label,
              },
              {
                header: "Dodane",
                render: (el) => new Date(el.createdAt).toLocaleDateString(),
              },
              {
                header: "Aktualizacja",
                render: (el) => (
                  <button
                    className={style.buttonEdit}
                    onClick={() => handleEdit(el)}
                  >
                    Edytuj
                  </button>
                ),
              },
              {
                header: "Usuń link",
                render: (el) => (
                  <button
                    className={style.buttonDel}
                    onClick={() => removeItem(el.id)}
                  >
                    Usuń
                  </button>
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
export default LinksPage;
