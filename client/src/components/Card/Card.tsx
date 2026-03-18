import styles from './Card.module.scss'

type CardProps = {
    header: string,
    children: React.ReactNode
}

function Card({header, children} : CardProps) {

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
            <h2 className={styles.cardTitle}>{header}</h2>
            <div>{children}</div>
            </div>
        </div>
    )
}
export default Card

