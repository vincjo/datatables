import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  const searchParams = url.searchParams;
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")) || 10;

  const limit = pageSize;
  const skip = (page - 1) * pageSize;
  const response = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  const dataset = await response.json();
  // console.log("dataset", dataset);
  return {
    rows: dataset.users,
    count: dataset.total,
  };
}) satisfies PageServerLoad;
