import { useEffect, useState } from 'react';
import type { LinkType, StatusType } from '../../types/linkTypes';
import Card from '../../components/Card/Card';
import style from './LatestLinks.module.scss'
import { iconColors, statusConfig } from '../../constants/stylesConfig';

function LatestLinks () {
    const [ latestLinks, setLatestLinks ] = useState<LinkType[] | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const fetchLinks = async () => {

        try {
            const res = await fetch('http://localhost:3001/links/latest')
            if(!res.ok) throw new Error('Fetch failed')
            const data: LinkType[] = await res.json()
            if(data) setLatestLinks(data)
        } catch(e) {
            console.log(e)
            setErrorMessage('Nie udało się pobrać danych, spróbuj póżniej')

        }
    }
    useEffect(() => {
        fetchLinks()
    }, [])

        const updateStatus = async (id: number, status: StatusType) => {

        try {
            await fetch(`http://localhost:3001/links/${id}/status`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({status})
            })
        } catch (e: unknown) {
            console.log(e)
        }
    }

    const handleOpen = async (item: LinkType) => {
        if(item.status === "TO_READ"){
            await updateStatus(item.id, "READ")
            fetchLinks()
        }
    }

    return (
        <>
            { latestLinks !== null ? (
            <Card header='Najnowsze linki'>
                <ul>{latestLinks.map((item) => {
                    const status = statusConfig[item.status]
                    return (
                        <li  key={item.id}>
                            <a href={item.url} className={style.cardRow} target="_blank" rel="noopener noreferrer" onClick={() => handleOpen(item)}>
                                <div style={{ backgroundColor: iconColors[item.id  % iconColors.length]}} className={style.cardIcon} />
                                <span className={style.cardLinkTitle}>{item.title}</span>
                                <span className={`badge ${status.className}`}>{status.label}</span>
                            </a>
                        </li>
                    )})}
                </ul>
            </Card>
            ) :  errorMessage && <p className={style.errorMessage}>{errorMessage}</p> }
        </>
    )
}

export default LatestLinks