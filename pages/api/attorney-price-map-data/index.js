import dbConnect from '@/utils/dbConnect'
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getAttorneyPriceMaps = async (res) => {
  const attorneyPriceMaps = await AttorneyPriceMap.find();
    
  return responseHandler.success(200, attorneyPriceMaps, res);
}

const createAttorneyPriceMap = async (body, res) => {
  const attorneyPriceMap = await AttorneyPriceMap.create(body);

  return responseHandler.success(201, attorneyPriceMap, res);
}

const updateAttorneyPriceMap = async (body, res) => {
  const { _id: id, ...data} = body;
  if (!id) {
    throw `Update AttorneyPriceMap: Bad ID Given - ${id}`
  }

  const attorneyPriceMap = await AttorneyPriceMap.findOneAndUpdate({ _id: id }, data, { new: true });

  return responseHandler.success(200, attorneyPriceMap, res);
}

const deleteAttorneyPriceMap = async (body, res) => {
  const { _id: id } = body; 
  if (!id) {
    throw `Delete AttorneyPriceMap: Bad ID Given - ${id}`
  }

  const attorneyPriceMap = await AttorneyPriceMap.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, attorneyPriceMap, res);
}

export default async function handler(req, res) {
  const { method, body, params } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getAttorneyPriceMaps(res);
      case 'POST':    return await createAttorneyPriceMap(body, res);
      case 'PUT':     return await updateAttorneyPriceMap(body, res);
      case 'DELETE':  return await deleteAttorneyPriceMap(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
