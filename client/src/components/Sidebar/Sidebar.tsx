import { Link } from 'react-router';
import styles from './Sidebar.module.scss'

const Sidebar = () => {


    return (
        <div className={styles.sidebarContainer}>
            <h1 className={styles.sidebarTitle}>Link Manager</h1>
            <div className={styles.navWrapper}>
                <nav className={styles.navContainer}>
                    <Link className={styles.navLink} to="/">Dashboard</Link>
                    <Link className={styles.navLink} to="/links">Links</Link>
                </nav>
                <button className={styles.sidebarButton}>Dodaj Link</button>
            </div>
        </div>
    )
}

export default Sidebar
