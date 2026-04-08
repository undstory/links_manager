import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import style from "./LinksPage.module.scss"
import type { LinkType } from "../../types/linkTypes";
import { statusConfig } from "../../constants/stylesConfig";

function LinksPage() {

  const [allLinks, setAllLinks] = useState<LinkType[] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fetchLinks = async () => {
    try {
      const res = await fetch('http://localhost:3001/links/all')
      if(!res.ok) throw new Error('Fetch failed')

      const data: LinkType[] = await res.json()
      console.log(data);

      if(data) setAllLinks(data)
    } catch (e) {
      console.log(e)
       setErrorMessage('Nie udało się pobrać danych, spróbuj póżniej')
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])


  return (
    <div className="mainContainer">
      <PageHeader title="wszystkie linki"/>
             <div className={style.tableWrapper}>
              {allLinks === null ? errorMessage.length ? errorMessage : "Nie udało się pobrać danych" : (
                <table>
                  <thead>
                    <tr>
                      <th>Nazwa linku</th>
                      <th>Adres</th>
                      <th>Kategoria</th>
                      <th>Tagi</th>
                      <th>Status</th>
                      <th>Dodane</th>
                      <th>Aktualizuj</th>
                      <th>Usuń link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLinks.map((el: LinkType) => {
                      const { id, title, url, description, tags, category, createdAt, status} = el
                      const statusName = statusConfig[status]
                      return (
                        <tr key={id}>
                          <td className={style.tooltip}>
                            {title}
                            <span className={style.tooltipText}>{description}</span>
                          </td>
                          <td>{url}</td>
                          <td>{category ? category.name : "-"}</td>
                          <td>{tags ? tags.map(t => t.tag.name).join(", ") : "-" }</td>
                          <td>{statusName.label}</td>
                          <td>{new Date(createdAt).toLocaleDateString()}</td>
                          <td><button>Aktualizacja</button></td>
                          <td><button>Usuń</button></td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              )  }
            </div>
    </div>
  );
}
export default LinksPage