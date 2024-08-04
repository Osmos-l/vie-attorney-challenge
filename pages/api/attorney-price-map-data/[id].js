import dbConnect from '@/utils/dbConnect'
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import responseHandler from '@/utils/responseHandler';

const updateAttorneyPriceMap = async (id, body, res) => {
  if (!id) {
    throw `Update AttorneyPriceMap: Bad ID Given - ${id}`
  }

  const attorneyPriceMap = await AttorneyPriceMap.findOneAndUpdate({ _id: id }, body, { new: true });

  return responseHandler.success(200, attorneyPriceMap, res);
}

const deleteAttorneyPriceMap = async (id, res) => { 
  if (!id) {
    throw `Delete AttorneyPriceMap: Bad ID Given - ${id}`
  }

  const attorneyPriceMap = await AttorneyPriceMap.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, attorneyPriceMap, res);
}

export default async function handler(req, res) {
  const { method, body, params, query } = req;

  await dbConnect();

  console.log(query);
  const { id } = query;

  try {
    switch (method) {
      case 'PUT':     return await updateAttorneyPriceMap(id, body, res);
      case 'DELETE':  return await deleteAttorneyPriceMap(id, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
