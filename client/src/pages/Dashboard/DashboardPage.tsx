import style from "./DashboardPage.module.scss";

import LatestLinks from "../../components/LatestLinks/LatestLinks";
import TagsList from "../../components/TagsList/TagsList";
import PageHeader from "../../components/PageHeader/PageHeader";

const DashboardPage = ({ refreshKey }: { refreshKey: number }) => {
  return (
    <div className="main__container">
      <PageHeader title="dashboard" />
      <div className={style.cardWrapper}>
        <LatestLinks refreshKey={refreshKey} />
        <TagsList />
      </div>
    </div>
  );
};

export default DashboardPage;
