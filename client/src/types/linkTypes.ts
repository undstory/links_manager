export type LinkType = {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  url: string;
  status: StatusType;
  isFavorite: boolean;
  createdAt: string;
  categoryId: number;
  category?: Category;
  tags?: Tags[];
};

export type Tags = {
  linkId: number;
  tag: Tag;
  tagId: number;
};

export type Tag = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};
export type StatusType = "TO_READ" | "READ";

export type TagType = {
  id: number;
  name: string;
};
