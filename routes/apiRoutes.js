import { Router } from "express";
import { body } from "express-validator";
import {
  feedback,
  resultsFromAzureFunction,
  resultsFromAzureFunction2,
} from "../controllers/apiControllers.js";

const router = Router();

const validateRequest = [
  body("field1").notEmpty().withMessage("Field1 is required"),
  body("field2").isInt().withMessage("Field2 must be an integer"),
  // Add more validations as needed
];

/**
 * @swagger
 * /api/v1/feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Feedback submitted successfully
 */
router.post("/feedback", validateRequest, feedback);

/**
 * @swagger
 * /api/v1/results_from_azurefunction:
 *   post:
 *     summary: Get results from Azure function
 *     tags: [AzureFunction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Results retrieved successfully
 */
router.post("/results_from_azurefunction", validateRequest, resultsFromAzureFunction);

/**
 * @swagger
 * /api/v1/results_from_azurefunction2:
 *   post:
 *     summary: Get results from Azure function 2
 *     tags: [AzureFunction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Results retrieved successfully
 */
router.post("/results_from_azurefunction2", validateRequest, resultsFromAzureFunction2);

export default router;