import { useEffect, useState } from 'react';
import style from './DashboardPage.module.scss'
import type { LinkType } from '../../types/linkTypes';
import Card from '../../components/Card/Card';
import { iconColors, statusConfig } from '../../constants/stylesConfig';


const DashboardPage = () => {

    const [ latestlLinks, setLatestlLinks ] = useState<LinkType[] | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {

        const fetchLinks = async () => {

            try {
                const res = await fetch('http://localhost:3001/links/latest')
                if(!res.ok) throw new Error('Fetch failed')
                const data: LinkType[] = await res.json()
                if(data) setLatestlLinks(data)
            } catch(e) {
                console.log(e)
                setErrorMessage('Nie udało się pobrać danych, spróbuj póżniej')

            }
        }

        fetchLinks()

    }, [])

    return (
        <div className={style.mainContainer}>
            <div className={style.header}>
                <h2>Dashboard</h2>
            </div>
            <div className={style.cardWrapper}>

            { latestlLinks !== null  ?
            <Card header='Najnowsze linki'>
                <ul>{latestlLinks.map((item) => {
                    const status = statusConfig[item.status]
                    return (
                        <li className={style.cardRow} key={item.id}>
                            <div style={{ backgroundColor: iconColors[item.id  % iconColors.length]}} className={style.cardIcon} />
                            <span className={style.cardLinkTitle}>{item.title}</span>
                            <span className={`badge ${status.className}`}>{status.label}</span>
                        </li>
                    )})}
                </ul>
            </Card>
             :  errorMessage && <p className={style.errorMessage}>{errorMessage}</p> }
            </div>
        </div>
    )
}

export default DashboardPage