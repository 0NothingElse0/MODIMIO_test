export const pagginate = (req : any, excluded? : any) => {
  if (!excluded) excluded = [];

  let excludedFields = ["page", "limit", "filter", ...excluded];
  const page = +req.query.page || 1;
  const limit = req.query.limit == "all" ? null : +req.query.limit || 10;
  let query = { ...req.query };

  excludedFields.forEach((field) => delete query[field]);

  return {
    page,
    limit,
    query,
  };
};
