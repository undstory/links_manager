import type { StatusType } from "../types/linkTypes";

export const updateStatus = async (id: number, status: StatusType) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/links/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  } catch (e: unknown) {
    console.log(e);
  }
};
