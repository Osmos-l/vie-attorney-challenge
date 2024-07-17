import dbConnect from '@/utils/dbConnect'
import Attorney from '@/db-schemas/Attorney'
import responseHandler from '@/utils/responseHandler';

const getAttorneys = async (params, res) => {
  try {
    const attorneys = await Attorney.find({});
    return responseHandler.success(200, attorneys, res);
  } catch (error) {
    return responseHandler.error(error, res);
  }
}

const createAttorney = async(body, res) => {
  try {
    const attorney = await Attorney.create(body);
    return responseHandler.success(201, attorney, res);
  } catch (error) {
    return responseHandler.error(error, res);
  }
}

export default async function handler(req, res) {
  const { method, body, params } = req;

  await dbConnect()

  // To be completed
  switch (method) {
    case 'GET': return getAttorneys(params, res);
    case 'POST': return createAttorney(body, res);
    default:
      res.status(400).json({ success: false });
      break
  }
}
