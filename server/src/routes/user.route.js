import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * paths:
 *   /users:
 *     get:
 *       tags:
 *         - users
 *       summary: Get a list of users
 *       description: Get all users.
 *       operationId: getAllUser
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
 *           description: A list of users.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.get('', userController.getAllUser);

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     get:
 *       tags:
 *         - users
 *       summary: Get a user
 *       description: Get a user by id.
 *       operationId: getUserById
 *       parameters:
 *         - name: id
 *           in: path
 *           description: id of the user
 *           required: true
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 1
 *       responses:
 *         200:
 *           description: A user.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           description: Not found User with Id
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * paths:
 *   /users:
 *     post:
 *       tags:
 *         - users
 *       summary: Create a user.
 *       description: Create a user with the given data.
 *       operationId: createUser
 *       parameters:
 *       requestBody:
 *         description: The user data to create
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         201:
 *           description: A user.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.post('', userController.createUser);

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     put:
 *       tags:
 *         - users
 *       summary: Update a existing user
 *       description: Update a existing user by id.
 *       operationId: updateUser
 *       requestBody:
 *         description: The user data to update
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       parameters:
 *         - name: id
 *           in: path
 *           description: id of the user
 *           required: true
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 1
 *       responses:
 *         200:
 *           description: User deleted successfully.
 *         404:
 *           description: Not found User with Id
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     delete:
 *       tags:
 *         - users
 *       summary: Delete a existing user
 *       description: Delete a existing user by id.
 *       operationId: deleteUser
 *       parameters:
 *         - name: id
 *           in: path
 *           description: id of the user
 *           required: true
 *           explored: true
 *           schema:
 *             type: integer
 *             default: 1
 *       responses:
 *         200:
 *           description: A user.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           description: Not found User with Id
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * paths:
 *   /users/signup:
 *     post:
 *       tags:
 *         - users
 *       summary: Register a user.
 *       description: Register a user with the given data.
 *       operationId: signUp
 *       requestBody:
 *         description: The user data to create
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       parameters:
 *       responses:
 *         201:
 *           description: A user.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         400:
 *           description: Bad request
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.post('/signup', userController.signUp);

/**
 * @swagger
 * paths:
 *   /users/signin:
 *     post:
 *       tags:
 *         - users
 *       summary: Login
 *       description: Login a user with the given data.
 *       operationId: signIn
 *       requestBody:
 *         description: The user data
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       parameters:
 *       responses:
 *         200:
 *           description: A user.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *         400:
 *           description: Bad request
 *         500:
 *           description: Oops! Something wrong from server!
 *       security:
 *         - bearerAuth:
 *             - bearerFormat: JWT
 *             - scheme: bearer
 *             - type: http
 */
router.post('/signin', userController.signIn);

export default router;
