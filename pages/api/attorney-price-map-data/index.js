import dbConnect from '@/utils/dbConnect'
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import TrafficCourt from '@/db-schemas/TrafficCourt';
import TrafficCounty from '@/db-schemas/TrafficCounty';
import Violation from '@/db-schemas/Violation';
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getAttorneyPriceMaps = async (query, res) => {
  const { attorneyId } = query;
  query = attorneyId ? { attorney: attorneyId } : {};

  const attorneyPriceMaps = await AttorneyPriceMap.find(query)
                                    .populate('county')
                                    .populate('court')
                                    .populate('violation');

  return responseHandler.success(200, attorneyPriceMaps, res);
}

const createAttorneyPriceMap = async (body, res) => {
  const attorneyPriceMap = await AttorneyPriceMap.create(body);

  return responseHandler.success(201, attorneyPriceMap, res);
}

export default async function handler(req, res) {
  const { method, body, params, query } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getAttorneyPriceMaps(query, res);
      case 'POST':    return await createAttorneyPriceMap(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
