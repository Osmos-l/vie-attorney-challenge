import dbConnect from '@/utils/dbConnect'
import Attorney from '@/db-schemas/Attorney'
import responseHandler from '@/utils/responseHandler';

const updateAttorney = async (id, body, res) => {
  if (!id) {
    throw `Update Attorney: Bad ID Given - ${id}`
  }

  const attorney = await Attorney.findOneAndUpdate({ _id: id }, body, { new: true });

  return responseHandler.success(200, attorney, res);
}

const deleteAttorney = async (id, res) => {
  if (!id) {
    throw `Delete Attorney: Bad ID Given - ${id}`
  }

  const attorney = await Attorney.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, attorney, res);
}

export default async function handler(req, res) {
  const { method, body, params, query } = req;

  await dbConnect();

  const { id } = query;

  try {
    switch (method) {
      case 'PUT':     return await updateAttorney(id, body, res);
      case 'DELETE':  return await deleteAttorney(id, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
