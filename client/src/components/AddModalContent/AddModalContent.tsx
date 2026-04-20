import { useEffect, useState } from "react";
import style from "./AddModalContent.module.scss";
import type { Category } from "../../types/linkTypes";

type FormState = {
  title: string;
  url: string;
  description: string;
  categoryId: number | null;
  tags: number[];
};

const AddModalContent = () => {
  const initialState: FormState = {
    title: "",
    url: "",
    description: "",
    categoryId: null,
    tags: [],
  };

  const [form, setForm] = useState<FormState>({
    title: "",
    url: "",
    description: "",
    categoryId: null,
    tags: [],
  });

  const [category, setCategory] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/categories");
      if (!res.ok) throw new Error("Fetch failed");
      const catData = await res.json();
      console.log("categories", catData);

      setCategory(catData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3001/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error");

      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form className={style.form}>
        <label className={style.label}>
          Tytuł:
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={style.input}
          />
        </label>

        <label className={style.label}>
          Wklej adres url:
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            className={style.input}
          />
        </label>

        <label className={style.label}>
          Opis:
          <input
            name="description"
            className={style.input}
            value={form.description}
            onChange={handleChange}
            placeholder="Max 500 znaków"
          />
        </label>
        <label className={style.label}>
          Kategoria:
          <select
            value={form.categoryId ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                categoryId: Number(e.target.value),
              }))
            }
          >
            <option value="" disabled>
              Wybierz kategorię
            </option>
            {category.map((el: Category) => {
              return (
                <option key={el.id} value="1">
                  {el.name}
                </option>
              );
            })}
          </select>
        </label>
        <label className={style.label}>
          Dodaj tagi oddzielone przecinkiem:
          <input
            name="tags"
            className={style.input}
            value={form.tags.join(", ")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
                  .map(Number),
              }))
            }
          />
        </label>
        <label className={style.labelCheckbox}>
          Dodaj do ulubionych:
          <input
            type="checkbox"
            name="favorite"
            className={style.checkbox}
            checked={form.tags.includes(1)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setForm((prev) => ({
                ...prev,
                tags: isChecked
                  ? [...prev.tags, 1]
                  : prev.tags.filter((tag) => tag !== 1),
              }));
            }}
          />
        </label>
        <div className={style.buttonsWrapper}>
          <button type="button" onClick={handleSubmit}>
            Dodaj
          </button>
          <button type="button" onClick={() => setForm(initialState)}>
            Anuluj
          </button>
        </div>
      </form>
    </>
  );
};

export default AddModalContent;
