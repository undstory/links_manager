
import style from './DashboardPage.module.scss'


import LatestLinks from '../../components/LatestLinks/LatestLinks';
import TagsList from '../../components/TagsList/TagsList';
import PageHeader from '../../components/PageHeader/PageHeader';



const DashboardPage = () => {

    return (
        <div className="mainContainer">
            <PageHeader title="dashboard" />
            <div className={style.cardWrapper}>
                <LatestLinks />
                <TagsList />
            </div>
        </div>
    )
}

export default DashboardPage