import dbConnect from '@/utils/dbConnect'
import Attorney from '@/db-schemas/Attorney'
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getAttorneys = async (res) => {
  const attorneys = await Attorney.find();
    
  return responseHandler.success(200, attorneys, res);
}

const createAttorney = async (body, res) => {
  const attorney = await Attorney.create(body);

  return responseHandler.success(201, attorney, res);
}

const updateAttorney = async (body, res) => {
  const { _id: id, ...data} = body;
  if (!id) {
    throw `Update Attorney: Bad ID Given - ${id}`
  }

  const attorney = await Attorney.findOneAndUpdate({ _id: id }, data, { new: true });

  return responseHandler.success(200, attorney, res);
}

const deleteAttorney = async (body, res) => {
  const { _id: id } = body; 
  if (!id) {
    throw `Delete Attorney: Bad ID Given - ${id}`
  }

  const attorney = await Attorney.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, attorney, res);
}

export default async function handler(req, res) {
  const { method, body, params } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getAttorneys(res);
      case 'POST':    return await createAttorney(body, res);
      case 'PUT':     return await updateAttorney(body, res);
      case 'DELETE':  return await deleteAttorney(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
