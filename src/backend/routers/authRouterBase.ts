import { Router } from "express";
import userControllerBase from "../controllers/userControllerBase.js";
import verifyUserToken from "../middleware/verifyUserToken.js";
import {
  validateLoginUserBase,
  validateRegisterUserBase,
} from "../middleware/validation/usersValidation.js";
const router = Router();

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: routes for user
 * components:
 *    schemas:
 *     registerResponse:
 *      type: object
 *      properties:
 *       status:
 *         type: string
 *         example: "success"
 *       message:
 *         type: string
 *         example: "error to..."
 *       data:
 *         type: object
 *         properties:
 *           tokens:
 *             $ref: "#/components/schemas/token"
 *           user:
 *             $ref: "#/components/schemas/getUser"             
 *     logoutResponse:
 *      type: object
 *      properties:
 *       status:
 *         type: string
 *         example: "success"
 *       message:
 *         type: string
 *         example: "error to..."
 *       data:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             example: "Logged out successful"
 *     login:
 *       type: object
 *       required:
 *         - login
 *         - email
 *         - password
 *       properties:
 *         login:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *          login: login1
 *          email: email@mail.com
 *          password: password
 *     register:
 *       type: object
 *       required:
 *         - login
 *         - email
 *         - password
 *       properties:
 *         login:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *          login: login1
 *          password: password
 *          email: email@mail.com
 *     token:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT access token
 *         refreshToken:
 *           type: string
 *           description: JWT refresh token
 *       example:
 *          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY2NjkyMzA4fQ.zvk7amVNaRGkNw0O7Q93GdcsKp-bZbkv7HQzq204zsw"
 *          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2Njk2OTcxLCJleHAiOjE2NjkyODg5NzF9.qMYAOY8kJyHv8XnILyMss-GjAN4dahDkkJ7Z_QOLLjY"
 *     password:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           description: user password
 *       example:
 *          password: "12345678"
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Returns JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       200:
 *         description: register new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/registerResponse'
 */
router.post(
  "/register",
  validateRegisterUserBase,
  userControllerBase.register
);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Returns JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/registerResponse'
 */
router.post("/login", validateLoginUserBase, userControllerBase.login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: logout user(deletes refresh token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/logoutResponse'
 *       401:
 *         description: Unathorized
 */
router.post("/logout/", verifyUserToken, userControllerBase.logout);

/**
 * @swagger
 * /api/refresh:
 *   get:
 *     summary: Refresh JWT tokens (need refreshToken in authorization)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Refresh tokens
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/refreshResponse'
 *       401:
 *         description: Unathorized
 */
router.get("/refresh/", userControllerBase.refresh);

export default router;