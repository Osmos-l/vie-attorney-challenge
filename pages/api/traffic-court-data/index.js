import dbConnect from '@/utils/dbConnect'
import TrafficCourt from '@/db-schemas/TrafficCourt';
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getTrafficCourts = async (res) => {
  const trafficCourts = await TrafficCourt.find();
    
  return responseHandler.success(200, trafficCourts, res);
}

const createTrafficCourt = async (body, res) => {
  const trafficCourt = await TrafficCourt.create(body);

  return responseHandler.success(201, trafficCourt, res);
}

const updateTrafficCourt = async (body, res) => {
  const { _id: id, ...data} = body;
  if (!id) {
    throw `Update TrafficCourt: Bad ID Given - ${id}`
  }

  const trafficCourt = await TrafficCourt.findOneAndUpdate({ _id: id }, data, { new: true });

  return responseHandler.success(200, trafficCourt, res);
}

const deleteTrafficCourt = async (body, res) => {
  const { _id: id } = body; 
  if (!id) {
    throw `Delete TrafficCourt: Bad ID Given - ${id}`
  }

  const trafficCourt = await TrafficCourt.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, trafficCourt, res);
}

export default async function handler(req, res) {
  const { method, body, params } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getTrafficCourts(res);
      case 'POST':    return await createTrafficCourt(body, res);
      case 'PUT':     return await updateTrafficCourt(body, res);
      case 'DELETE':  return await deleteTrafficCourt(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
