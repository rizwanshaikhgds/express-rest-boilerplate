import axios from "axios";
import httpErrors from "http-errors";
import { validationResult } from "express-validator";

const AZURE_FUNCTION_URL = process.env.AZURE_FUNCTION_URL;

const postToAzureFunction = async (url, data) => {
  try {
    // const response = await axios.post(url, data);
    // return response.data;
    return {"message":"testing"}; // Remove this line after testing use the above 2 lines to actually call the Azure Function
  } catch (error) {
    throw new httpErrors.InternalServerError("Error posting to Azure Function");
  }
};

export const feedback = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    return next(new httpErrors.BadRequest(errors.array()[0].msg));
  }

  try {
    const data = await postToAzureFunction(`${AZURE_FUNCTION_URL}/feedback`, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const resultsFromAzureFunction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpErrors.BadRequest("Invalid input"));
  }

  try {
    const data = await postToAzureFunction(`${AZURE_FUNCTION_URL}/results_from_azurefunction`, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const resultsFromAzureFunction2 = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new httpErrors.BadRequest("Invalid input"));
  }

  try {
    const data = await postToAzureFunction(`${AZURE_FUNCTION_URL}/results_from_azurefunction2`, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};