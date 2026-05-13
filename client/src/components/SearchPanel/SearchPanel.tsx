import style from "./SearchPanel.module.scss";

type SearchPanelProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchForDate: string;
  setSearchForDate: React.Dispatch<React.SetStateAction<string>>;
};

const SearchPanel = ({
  searchQuery,
  setSearchQuery,
  setSearchForDate,
  searchForDate,
}: SearchPanelProps) => {
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };

  const handleSearchForDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSearchForDate(date);
  };

  const handleCleanUp = () => {
    setSearchQuery("");
    setSearchForDate("");
  };

  return (
    <div className={style.searchPanel}>
      <div className={style.filterSearchPart}>
        <div>
          <label className="label" htmlFor="search">
            Szukaj (tytuł, opis, kategoria, tagi)
          </label>
          <input
            type="text"
            className="input"
            value={searchQuery}
            onChange={handleSearchQuery}
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
      <div className={style.sortingPart}>
        <button onClick={handleCleanUp}>Wyczyść wyszukiwanie</button>
      </div>
    </div>
  );
};

export default SearchPanel;
