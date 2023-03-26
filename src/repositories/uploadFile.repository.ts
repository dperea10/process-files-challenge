import TransactionModel from '../models/uploadFiles.model'

const addFilter = (filter:any, q:any) => {
  if (filter) {
    const rgx = (pattern:any) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(filter);
    return {
      ...q,
      $or: [
        { name: { $regex: searchRgx, $options: 'i' } },
        { cuit: { $regex: searchRgx, $options: 'i' } },
      ],
    };
  }
  return q;
};

export const getInfoTrx = async (q = {}, filter = '', sort:any, dir:any, skip:any, max:any, page:any = 1, limit = 10) => {
  skip = skip || (page - 1) * limit;
  limit = max || limit;
  const sortObj = sort && dir ? ({ [sort]: dir }) : {};

  q = addFilter(filter, q);

  return TransactionModel.find(q).skip(skip).limit(limit).sort(sortObj);
};

export const getCount = async (q = {}, filter = '') => TransactionModel.find(addFilter(filter, q)).countDocuments();

