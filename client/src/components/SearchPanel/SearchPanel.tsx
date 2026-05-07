import style from "./SearchPanel.module.scss";

type SearchPanelProps = {
  searchForTitleOrDescription: string;
  setSearchForTitleOrDescription: React.Dispatch<React.SetStateAction<string>>;
  searchForDate: string;
  setSearchForDate: React.Dispatch<React.SetStateAction<string>>;
};

const SearchPanel = ({
  searchForTitleOrDescription,
  setSearchForTitleOrDescription,
  setSearchForDate,
  searchForDate,
}: SearchPanelProps) => {
  const handleSearchForTitleOrDescription = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = e.target.value.trim();
    setSearchForTitleOrDescription(query);
  };

  const handleSearchForDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSearchForDate(date);
  };
  return (
    <div>
      <div className={style.filterSearchPart}>
        <div>
          <label className="label" htmlFor="search">
            Szukaj po tytule lub opisie
          </label>
          <input
            type="text"
            className="input"
            value={searchForTitleOrDescription}
            onChange={handleSearchForTitleOrDescription}
          />
        </div>
        <div>
          <label className="label" htmlFor="search">
            Szukaj po dacie utworzenia
          </label>
          <input
            type="date"
            className="input"
            value={searchForDate}
            onChange={handleSearchForDate}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
