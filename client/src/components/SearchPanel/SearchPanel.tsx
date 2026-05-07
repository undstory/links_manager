import style from "./SearchPanel.module.scss";

type SearchPanelProps = {
  searchForTitle: string;
  setSearchForTitle: React.Dispatch<React.SetStateAction<string>>;
  searchForDate: string;
  setSearchForDate: React.Dispatch<React.SetStateAction<string>>;
};

const SearchPanel = ({
  searchForTitle,
  setSearchForTitle,
  setSearchForDate,
  searchForDate,
}: SearchPanelProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setSearchForTitle(query);
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
            Szukaj po tytule
          </label>
          <input
            type="text"
            className="input"
            value={searchForTitle}
            onChange={handleSearch}
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
