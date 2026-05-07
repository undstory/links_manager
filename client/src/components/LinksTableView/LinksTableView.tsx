import { useMemo, useState } from "react";
import { statusConfig } from "../../constants/stylesConfig";
import type { LinkType } from "../../types/linkTypes";
import SearchPanel from "../SearchPanel/SearchPanel";
import Table from "../Table/Table";
import style from "./LinksTableView.module.scss";
import { sanity } from "../../utils/utilsfn";

type LinksTableViewProps = {
  data: LinkType[];
  errorMessage: string;
  onRemoveItem: (id: number) => void;
  onEdit: (link: LinkType) => void;
  onOpen: (link: LinkType) => void;
};

const LinksTableView = ({
  data: allLinks,
  errorMessage,
  onEdit,
  onOpen,
  onRemoveItem,
}: LinksTableViewProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchForDate, setSearchForDate] = useState<string>("");

  const filteredData = useMemo(() => {
    return allLinks
      .filter((el) => {
        if (!searchQuery) return true;
        return (
          sanity(el.title).includes(searchQuery) ||
          sanity(el.description).includes(searchQuery)
        );
      })
      .filter((el) => {
        if (!searchForDate) return true;
        console.log("el.createdAt", el.createdAt);
        const apiDate = new Date(el.createdAt).toISOString().split("T")[0];
        return apiDate === searchForDate;
      });
  }, [allLinks, searchQuery, searchForDate]);

  return (
    <div className="table__wrapper">
      <SearchPanel
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        searchForDate={searchForDate}
        setSearchForDate={setSearchForDate}
      />
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
          data={filteredData}
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
                    onClick={() => onOpen(el)}
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
                <button className={style.buttonEdit} onClick={() => onEdit(el)}>
                  Edytuj
                </button>
              ),
            },
            {
              header: "Usuń link",
              render: (el) => (
                <button
                  className={style.buttonDel}
                  onClick={() => onRemoveItem(el.id)}
                >
                  Usuń
                </button>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default LinksTableView;
