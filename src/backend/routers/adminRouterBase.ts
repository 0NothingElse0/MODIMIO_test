import { Router } from "express";
import adminControllerBase from "../controllers/adminControllerBase.js";
import verifyUserToken from "../middleware/verifyUserToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = Router();

/**
 * @swagger
 *  tags:
 *    name: Admin
 *    description: routes only for admin
 * components:
 *    schemas:
 *     getUsersResponse:
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
 *           users:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/UserDto"
 *           totalCount:
 *             type: integer
 *             example: 100
 *           currentCount:
 *             type: integer
 *             example: 50
 *           limit:
 *             type: integer
 *             example: 10
 *           page:
 *             type: integer
 *             example: 2
 *     UserDto:
 *       type: object
 *       required:
 *          - id
 *          - login
 *          - email
 *       properties:
 *         id:
 *           type: integer
 *         login:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         isActivate:
 *           type: boolean
 *       example:
 *          id: 1
 *          login: login1
 *          email: email
 *          role: user
 *          isActivate: true
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: page number
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: false
 *        description: items per page
 *      - in: query
 *        name: id
 *        schema:
 *          type: integer
 *        required: false
 *        description: user id
 *      - in: query
 *        name: login
 *        schema:
 *          type: string
 *        required: false
 *        description: user login
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        required: false
 *        description: user email
 *      - in: query
 *        name: role
 *        schema:
 *          type: string
 *          enum: [admin, user]
 *        required: false
 *        description: user type
 *     summary: Получение юзеров с пагинацией
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: successful got UserDto list
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/getUsersResponse'
 *       401:
 *         description: Unathorized
 */
router.get(
  "/users",
  verifyUserToken,
  verifyAdmin,
  adminControllerBase.getAllUsers
);

export default router;
