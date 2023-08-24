import express from 'express';
import tourController from '../controllers/tour.controller.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * paths:
 *   /tours:
 *     get:
 *       tags:
 *         - tours
 *       summary: Get a list of tours
 *       description: Get all tours.
 *       operationId: getAllTour
 *       parameters:
 *         - name: page
 *           in: query
 *           description: page value that need to be considered for pagination
 *           required: false
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 1
 *         - name: limit
 *           in: query
 *           description: limit value that need to be considered for pagination
 *           required: false
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 10
 *       responses:
 *         200:
 *           description: A list of tours.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/tour'
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.get('', tourController.getAllTour);

/**
 * @swagger
 * paths:
 *   /tours/{id}:
 *     get:
 *       tags:
 *         - tours
 *       summary: Get a tour
 *       description: Get a tour by id.
 *       operationId: getTourById
 *       parameters:
 *         - name: id
 *           in: path
 *           description: id of the tour
 *           required: true
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 1
 *       responses:
 *         200:
 *           description: A tour.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/tour'
 *         404:
 *           description: Not found tour with Id
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.get('/:id', tourController.getTourById);

/**
 * @swagger
 * paths:
 *   /tours:
 *     post:
 *       tags:
 *         - tours
 *       summary: Create a tour.
 *       description: Create a tour with the given data.
 *       operationId: createTour
 *       parameters:
 *       requestBody:
 *         description: The tour data to create
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tour'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/tour'
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: '#/components/schemas/tour'
 *       responses:
 *         201:
 *           description: A tour.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/tour'
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.post('', tourController.createTour);

/**
 * @swagger
 * paths:
 *   /tours/{id}:
 *     put:
 *       tags:
 *         - tours
 *       summary: Update a existing tour
 *       description: Update a existing tour by id.
 *       operationId: updateTour
 *       requestBody:
 *         description: The tour data to update
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tour'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/tour'
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: '#/components/schemas/tour'
 *       parameters:
 *         - name: id
 *           in: path
 *           description: id of the tour
 *           required: true
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 1
 *       responses:
 *         200:
 *           description: tour deleted successfully.
 *         404:
 *           description: Not found tour with Id
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.put('/:id', tourController.updateTour);

/**
 * @swagger
 * paths:
 *   /tours/{id}:
 *     delete:
 *       tags:
 *         - tours
 *       summary: Delete a existing tour
 *       description: Delete a existing tour by id.
 *       operationId: deleteTour
 *       parameters:
 *         - name: id
 *           in: path
 *           description: id of the tour
 *           required: true
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 1
 *       responses:
 *         200:
 *           description: A tour.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/tour'
 *         404:
 *           description: Not found tour with Id
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.delete('/:id', tourController.deleteTour);

export default router;
