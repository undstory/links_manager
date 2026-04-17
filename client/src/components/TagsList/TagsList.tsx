import { useEffect, useState } from 'react';

import Card from '../Card/Card';
import style from './TagsList.module.scss'
import type { TagType } from '../../types/linkTypes';
import { colors } from '../../constants/stylesConfig';




function TagsList () {

    const [tags, setTags] = useState<TagType[]>([])
    const [errorMessage, setErrorMessage] = useState('')

    const fetchTags = async () => {

        try {
            const res = await fetch('http://localhost:3001/tags')
            if(!res.ok) throw new Error('Fetch failed')
            const data: TagType[] = await res.json()
            if(data) setTags(data)
        } catch(e) {
            console.log(e)
            setErrorMessage('Nie udało się pobrać danych, spróbuj później')

        }
    }
    useEffect(() => {
        fetchTags()
    }, [])



    return (
        <>
            <Card header='Najpopularniejsze tagi'>
            { tags.length > 0 ? (
                <div className={style.tagsWrapper}>{tags.map((item, index) => {

                    return (
                        <span style={{ backgroundColor: colors[index % colors.length], color: "#fff"}} className="badge" key={item.id}>{item.name}</span>
                    )})}
                </div>
            ) :  errorMessage ? <p className={style.errorMessage}>{errorMessage}</p> : <p>Brak tagów do wyświetlenia</p> }
            </Card>
        </>
    )
}

export default TagsList