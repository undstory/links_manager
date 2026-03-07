import { useEffect, useState } from 'react';
import style from './MainView.module.scss'
import type { LinkType } from '../../types/linkTypes';

const DashboardPage = () => {

    const [ links, setLinks ] = useState<LinkType[] | null>(null)

    useEffect(() => {

        const fetchLinks = async () => {

            try {
                const res = await fetch('http://localhost:3001/links')
                if(!res.ok) throw new Error('Fetch failed')
                const data: LinkType[] = await res.json()
                if(data) setLinks(data)
            } catch(e) {
                console.log(e)
            }
        }

        fetchLinks()

    }, [])

    return (
        <div className={style.mainContainer}>

            <h2>MAinView</h2>
            { links !== null  ? (
                links.map((link: LinkType) => {
                    const { title, url } = link
                    return (
                        <div>{title} - {url}</div>
                    )
                } )
            ) : null }
        </div>
    )
}

export default DashboardPage