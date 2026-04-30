/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import style from "./AddModalContent.module.scss";
import type { Category, LinkType } from "../../types/linkTypes";

type FormState = {
  title: string;
  url: string;
  description: string;
  categoryId: number | null;
  isFavorite: boolean;
  tags: string[];
};

type AddModalContentProps = {
  setModalType: Dispatch<SetStateAction<"add" | "edit" | null>>;
  onSuccess: () => void;
  type: "add" | "edit";
  initialData?: LinkType | null;
};

const AddModalContent = ({
  setModalType,
  onSuccess,
  type,
  initialData,
}: AddModalContentProps) => {
  const initialState: FormState = {
    title: "",
    url: "",
    description: "",
    categoryId: null,
    isFavorite: false,
    tags: [],
  };

  const [form, setForm] = useState<FormState>(initialState);
  const [mode, setMode] = useState<"select" | "create">("select");
  const [category, setCategory] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [tagsInput, setTagsInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const firstError = errors.global || Object.values(errors).find(Boolean);
  const noCategories = category.length === 0;
  const endpoint =
    type === "edit"
      ? `http://localhost:3001/links/${initialData?.id}`
      : "http://localhost:3001/links";

  const method = type === "edit" ? "PUT" : "POST";
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/categories");
      if (!res.ok) throw new Error("Fetch failed");
      const catData = await res.json();

      setCategory(catData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (type === "edit" && initialData) {
      setForm({
        title: initialData.title,
        url: initialData.url,
        description: initialData.description ?? "",
        categoryId: initialData.categoryId,
        isFavorite: initialData.isFavorite,
        tags: initialData.tags?.map((t) => t.tag.name) || [],
      });

      setTagsInput(initialData.tags?.map((t) => t.tag.name).join(", ") || "");
    } else if (type === "add") {
      setForm(initialState);
      setTagsInput("");
    }
  }, [type, initialData]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category.length === 0) {
      setMode("create");
    } else {
      setMode("select");
    }
  }, [category]);

  useEffect(() => {
    setErrors(validate());
  }, [form, mode, newCategoryName]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) {
      newErrors.title = "Tytuł jest wymagany";
    } else if (form.title.length > 255) {
      newErrors.title = "Tytuł jest za długi";
    } else if (form.title.length < 3) {
      newErrors.title = "Tytuł jest za krótki";
    }

    if (!form.url.trim()) {
      newErrors.url = "URL jest wymagany";
    } else if (!/^https?:\/\/.+/.test(form.url)) {
      newErrors.url = "Niepoprawny format URL";
    }

    if (mode === "select" && !form.categoryId) {
      newErrors.categoryId = "Dodaj kategorię";
    }

    if (mode === "create" && !newCategoryName.trim()) {
      newErrors.categoryId = "Podaj nazwę kategorii";
    }

    if (form.description && form.description.length > 500) {
      newErrors.description = "Max 500 znaków";
    }

    if (mode === "create") {
      const name = newCategoryName.trim();

      if (!name) {
        newErrors.categoryId = "Podaj nazwę kategorii";
      } else if (name.length < 3) {
        newErrors.categoryId = "Min 3 znaki";
      } else if (name.length > 30) {
        newErrors.categoryId = "Max 30 znaków";
      } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9 -]+$/.test(name)) {
        newErrors.categoryId = "Tylko litery i cyfry";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    let categoryId = form.categoryId;

    if (mode === "create" && newCategoryName.trim() !== "") {
      if (!form.title || !form.url) return;
      const formatted = newCategoryName
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

      const finalName = formatted.charAt(0).toUpperCase() + formatted.slice(1);

      try {
        const res = await fetch("http://localhost:3001/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: finalName }),
        });

        if (!res.ok) {
          const data = await res.json();
          setErrors((prev) => ({
            ...prev,
            categoryId: data.error,
          }));
          return;
        }
        const newCategory: Category = await res.json();
        categoryId = newCategory.id;
        setCategory((prev) => [
          ...prev,
          { id: categoryId!, name: newCategoryName } as Category,
        ]);

        setMode("select");
      } catch (e) {
        console.log(e);
        return;
      }
    }
    try {
      const parsedTags = tagsInput
        .split(",")
        .map((t) => t.trim().slice(0, 10))
        .filter(Boolean)
        .slice(0, 3);

      const res = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, categoryId, tags: parsedTags }),
      });

      if (!res.ok) {
        const data = await res.json();

        const firstError =
          data?.details?.fieldErrors?.title?.[0] ||
          data?.details?.fieldErrors?.url?.[0] ||
          data?.details?.fieldErrors?.categoryId?.[0] ||
          data?.error;

        setErrors((prev) => ({
          ...prev,
          global: firstError,
        }));
        return;
      }

      setForm(initialState);
      onSuccess();
      setModalType(null);
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

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const cancelAction = () => {
    setForm(initialState);
    setModalType(null);
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
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
          {!noCategories && mode === "select" ? (
            <>
              <select
                className={style.input}
                value={form.categoryId ?? ""}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  setForm((prev) => ({
                    ...prev,
                    categoryId: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    categoryId: "",
                  }));
                }}
              >
                <option value="" disabled>
                  Wybierz kategorię
                </option>
                {category.map((el: Category) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                className="link__btn"
                onClick={() => {
                  setMode("create");
                  setForm((prev) => ({
                    ...prev,
                    categoryId: null,
                  }));
                }}
              >
                Stwórz nową kategorię:
              </button>
            </>
          ) : (
            <>
              <input
                className={style.input}
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    categoryId: "",
                  }));
                }}
                placeholder={
                  noCategories
                    ? "Podaj nazwę nowej kategorii"
                    : "Wpisz nazwę kategorii"
                }
              />
              {noCategories ? null : (
                <button
                  type="button"
                  className="link__btn"
                  onClick={() => {
                    if (category.length > 0) setMode("select");
                  }}
                >
                  Wyszukaj kategorię
                </button>
              )}
            </>
          )}
        </label>

        <label className={style.label}>
          Dodaj tagi oddzielone przecinkiem (max trzy tagi):
          <input
            name="tags"
            className={`${style.input} ${style.tag}`}
            placeholder="Max 3 tagi"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </label>
        <label className={style.labelCheckbox}>
          Dodaj do ulubionych:
          <input
            type="checkbox"
            name="favorite"
            className={style.checkbox}
            checked={form.isFavorite}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isFavorite: e.target.checked,
              }))
            }
          />
        </label>
        <div className={style.formError}>
          {submitted && firstError ? <span>{firstError}</span> : null}
        </div>
        <div className={style.buttonsWrapper}>
          <button type="submit" className="button__primary">
            {type === "add" ? "Dodaj link" : "Zapisz zmiany"}
          </button>
          <button
            type="button"
            className="button__secondary"
            onClick={cancelAction}
          >
            Anuluj
          </button>
        </div>
      </form>
    </>
  );
};

export default AddModalContent;
