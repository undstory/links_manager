import { useEffect, useState } from "react";
import type { LinkType } from "../../types/linkTypes";
import Card from "../../components/Card/Card";
import style from "./LatestLinks.module.scss";
import { colors, statusConfig } from "../../constants/stylesConfig";
import { updateStatus } from "../../api/updateStatus";

function LatestLinks({ refreshKey }: { refreshKey: number }) {
  const [latestLinks, setLatestLinks] = useState<LinkType[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchLinks = async () => {
    try {
      const res = await fetch("http://localhost:3001/links/latest");
      if (!res.ok) throw new Error("Fetch failed");
      const data: LinkType[] = await res.json();
      if (data) setLatestLinks(data);
    } catch (e) {
      console.log(e);
      setErrorMessage("Nie udało się pobrać danych, spróbuj póżniej");
    }
  };
  useEffect(() => {
    fetchLinks();
  }, [refreshKey]);

  const handleOpen = async (item: LinkType) => {
    if (item.status === "TO_READ") {
      await updateStatus(item.id, "READ");
      fetchLinks();
    }
  };

  return (
    <>
      <Card header="Najnowsze linki">
        {errorMessage ? (
          <p className={style.errorMessage}>{errorMessage}</p>
        ) : latestLinks === null ? (
          <p>Ładowanie...</p>
        ) : latestLinks.length === 0 ? (
          <p>Brak najnowszych linków</p>
        ) : (
          <ul>
            {latestLinks.map((item) => {
              const status = statusConfig[item.status];
              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className={style.cardRow}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleOpen(item)}
                  >
                    <div
                      style={{
                        backgroundColor: colors[item.id % colors.length],
                      }}
                      className={style.cardIcon}
                    />
                    <span className={style.cardLinkTitle}>{item.title}</span>
                    <span className={`badge ${status.className}`}>
                      {status.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </>
  );
}

export default LatestLinks;
