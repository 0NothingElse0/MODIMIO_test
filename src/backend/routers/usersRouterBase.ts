import { Router } from "express";
import userControllerBase from "../controllers/userControllerBase.js";
import verifyUserToken from "../middleware/verifyUserToken.js";

const router = Router();

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: routes for working with users 
 * components:
 *    schemas:
 *     authResponse:
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
 *           user:
 *             $ref: "#/components/schemas/getUser"
 *     getUser:
 *       type: object
 *       example:
 *          id: 1
 *          login: login1
 *          email: email
 *          role: user
 *          isActivate: true
 */

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Получение информации о текущем юзере
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: gets the UserDto from token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/authResponse'
 *       401:
 *         description: Unathorized
 */
router.get("/current", verifyUserToken, userControllerBase.getUser);

export default router;
