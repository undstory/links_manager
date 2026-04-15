import { Link } from 'react-router';
import styles from './Sidebar.module.scss'
import { PATHS } from '../../constants/paths';

type SidebarProps = {
    onOpenModal: (type: "add" | "edit") => void
}

const Sidebar = ({onOpenModal} : SidebarProps) => {


    return (
        <div className={styles.sidebarContainer}>
            <h1 className={styles.sidebarTitle}>Link Manager</h1>
            <div className={styles.navWrapper}>
                <nav className={styles.navContainer}>
                    <Link className={styles.navLink} to={PATHS.DASHBOARD}>Dashboard</Link>
                    <Link className={styles.navLink} to={PATHS.LINKS}>Wszystkie linki</Link>
                    <Link className={styles.navLink} to={PATHS.TO_READ}>Do przeczytania</Link>
                    <Link className={styles.navLink} to={PATHS.FAVORITE}>Ulubione</Link>
                </nav>
                <button className={styles.sidebarButton} onClick={() => onOpenModal("add")}>Dodaj Link</button>
            </div>
        </div>
    )
}

export default Sidebar
