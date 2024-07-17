import dbConnect from '@/utils/dbConnect'
import Violation from '@/db-schemas/Violation';
import responseHandler from '@/utils/responseHandler';

// TODO: Add Pagination
const getViolations = async (res) => {
  const violations = await Violation.find();
    
  return responseHandler.success(200, violations, res);
}

const createViolation = async (body, res) => {
  const violation = await Violation.create(body);

  return responseHandler.success(201, violation, res);
}

const updateViolation = async (body, res) => {
  const { _id: id, ...data} = body;
  if (!id) {
    throw `Update Violation: Bad ID Given - ${id}`
  }

  const violation = await Violation.findOneAndUpdate({ _id: id }, data, { new: true });

  return responseHandler.success(200, violation, res);
}

const deleteViolation = async (body, res) => {
  const { _id: id } = body; 
  if (!id) {
    throw `Delete Violation: Bad ID Given - ${id}`
  }

  const violation = await Violation.findOneAndDelete({ _id: id }, { new: true });

  return responseHandler.success(200, violation, res);
}

export default async function handler(req, res) {
  const { method, body, params } = req;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':     return await getViolations(res);
      case 'POST':    return await createViolation(body, res);
      case 'PUT':     return await updateViolation(body, res);
      case 'DELETE':  return await deleteViolation(body, res);
      default:        return responseHandler.error("Method not implemented", res);
    }
  } catch (error) {
    return responseHandler.error(error, res);
  }
 
}
