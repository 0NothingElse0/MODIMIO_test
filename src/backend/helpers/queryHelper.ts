export const createILikeQuery = (query : any, fields : string[]) => {
  if (!fields) fields = [];
  let queryBuilder = [];
  Object.keys(query).forEach((key) => {
    if (fields.includes(key))
      return queryBuilder.push({ key, value: `%${query[key]}%` });

    queryBuilder.push({ key, value: query[key] });
  });
  return queryBuilder;
};
