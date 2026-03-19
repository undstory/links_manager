
import style from './DashboardPage.module.scss'


import LatestLinks from '../../components/LatestLinks/LatestLinks';



const DashboardPage = () => {

    return (
        <div className={style.mainContainer}>
            <div className={style.header}>
                <h2>Dashboard</h2>
            </div>
            <div className={style.cardWrapper}>
            <LatestLinks />
            </div>
        </div>
    )
}

export default DashboardPage