import dbConnect from '@/utils/dbConnect'
import TrafficState from '@/db-schemas/TrafficState';
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getTrafficStates = async (res) => {
  const trafficStates = await TrafficState.find();
    
  return responseHandler.success(200, trafficStates, res);
}

const createTrafficState = async (body, res) => {
  const trafficState = await TrafficState.create(body);

  return responseHandler.success(201, trafficState, res);
}

const updateTrafficState = async (body, res) => {
  const { _id: id, ...data} = body;
  if (!id) {
    throw `Update TrafficState: Bad ID Given - ${id}`
  }

  const trafficState = await TrafficState.findOneAndUpdate({ _id: id }, data, { new: true });

  return responseHandler.success(200, trafficState, res);
}

const deleteTrafficState = async (body, res) => {
  const { _id: id } = body; 
  if (!id) {
    throw `Delete TrafficState: Bad ID Given - ${id}`
  }

  const trafficState = await TrafficState.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, trafficState, res);
}

export default async function handler(req, res) {
  const { method, body, params } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getTrafficStates(res);
      case 'POST':    return await createTrafficState(body, res);
      case 'PUT':     return await updateTrafficState(body, res);
      case 'DELETE':  return await deleteTrafficState(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
