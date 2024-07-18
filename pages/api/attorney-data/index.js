import dbConnect from '@/utils/dbConnect'
import Attorney from '@/db-schemas/Attorney'
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getAttorneys = async (query, res) => {
  const { name } = query;
  query = name ? { name: new RegExp(name, 'i') } : {};

  const attorneys = await Attorney.find(query);

  return responseHandler.success(200, attorneys, res);
}

const createAttorney = async (body, res) => {
  const attorney = await Attorney.create(body);

  return responseHandler.success(201, attorney, res);
}

export default async function handler(req, res) {
  const { method, body, params, query } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getAttorneys(query, res);
      case 'POST':    return await createAttorney(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
