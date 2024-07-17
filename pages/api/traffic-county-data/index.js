import dbConnect from '@/utils/dbConnect'
import TrafficCounty from '@/db-schemas/TrafficCounty';
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getTrafficCountys = async (res) => {
  const trafficCountys = await TrafficCounty.find();
    
  return responseHandler.success(200, trafficCountys, res);
}

const createTrafficCounty = async (body, res) => {
  const trafficCounty = await TrafficCounty.create(body);

  return responseHandler.success(201, trafficCounty, res);
}

const updateTrafficCounty = async (body, res) => {
  const { _id: id, ...data} = body;
  if (!id) {
    throw `Update TrafficCounty: Bad ID Given - ${id}`
  }

  const trafficCounty = await TrafficCounty.findOneAndUpdate({ _id: id }, data, { new: true });

  return responseHandler.success(200, trafficCounty, res);
}

const deleteTrafficCounty = async (body, res) => {
  const { _id: id } = body; 
  if (!id) {
    throw `Delete TrafficCounty: Bad ID Given - ${id}`
  }

  const trafficCounty = await TrafficCounty.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, trafficCounty, res);
}

export default async function handler(req, res) {
  const { method, body, params } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getTrafficCountys(res);
      case 'POST':    return await createTrafficCounty(body, res);
      case 'PUT':     return await updateTrafficCounty(body, res);
      case 'DELETE':  return await deleteTrafficCounty(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
