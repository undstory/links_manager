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
};

export type StatusType = "TO_READ" | "READ";
