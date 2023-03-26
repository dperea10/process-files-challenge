import uploadFileMapper from "../mappers/uploadFile.mapper";
import TransactionModel from "../models/uploadFiles.model";
import StatusFileModel from "../models/statusFiles.model";
import {getInfoTrx, getCount} from "../repositories/uploadFile.repository"


const registerUpload = async (fileBuffer:any) => {

  const getUploadFile = await uploadFileMapper.processFile(fileBuffer);
  let responseItem = await StatusFileModel.create(getUploadFile);

  if(getUploadFile.length>0){
      const valuesCom = getUploadFile.map((data) =>data.data)
      if(valuesCom.length>0) {
        if (getUploadFile[0]?.errorsList?.length > 0){
          getUploadFile[0].status = 'processing'
        }
        responseItem = await StatusFileModel.create(getUploadFile);
         await TransactionModel.create(getUploadFile);
      }
    }

  return responseItem;
};

const getInfoDB = async (params:any) => {
  const { q,filter,sort,dir,skip,max, status,id} = params;
  let { page = 1, limit = 10 } = params;

  const getInfoTransaction = uploadFileMapper.getInfo(getInfoTrx);
  const data = await getInfoTransaction(q, filter, sort, dir, skip, max, page, limit, status,id);
  const total = await getCount(q, filter);

  limit = max || limit;
  page = skip ? Math.trunc(skip / limit + 1) : page;
  const pages = Math.ceil(total / limit);

  return {
    data,
    page,
    pages,
    limit,
    total,
  };

};

export { registerUpload, getInfoDB};