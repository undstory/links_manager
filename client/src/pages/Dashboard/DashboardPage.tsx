
import style from './DashboardPage.module.scss'


import LatestLinks from '../../components/LatestLinks/LatestLinks';
import TagsList from '../../components/TagsList/TagsList';



const DashboardPage = () => {

    return (
        <div className={style.mainContainer}>
            <div className={style.header}>
                <h2>Dashboard</h2>
            </div>
            <div className={style.cardWrapper}>
            <LatestLinks />
            <TagsList />
            </div>
        </div>
    )
}

export default DashboardPage