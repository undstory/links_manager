import style from "./SearchPanel.module.scss";

type SearchPanelProps = {
  searchForTitle: string;
  setSearchForTitle: React.Dispatch<React.SetStateAction<string>>;
};

const SearchPanel = ({
  searchForTitle,
  setSearchForTitle,
}: SearchPanelProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setSearchForTitle(query);
  };
  return (
    <div>
      <div className={style.filterSearchPart}>
        <div>
          <label className="label" htmlFor="search">
            Search by title
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
            Search by date
          </label>
          <input
            type="date"
            className="input"
            // value={searchForDate}
            // onChange={handleSearchForDate}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
