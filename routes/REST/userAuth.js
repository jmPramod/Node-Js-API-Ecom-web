const express = require('express');
// const {Router}=express;
const {
  signUpController,
  loginController,
  putResetPasswordFromGmail,
  getResetPasswordFromGmail,
  resetPasswordController,
  profileUpdateController,
  addNewKeyValue
} = require('../../controller/REST_Controller/REST.controller');
const { verifyUser, verifyAdmin } = require('../../utils/verifyToken');


const authRoute = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email id for login
 *         password:
 *           type: string
 *           description: The password of your email
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name id for registration
 *         secondName:
 *           type: string
 *           description: The secondName id for registration
 *         email:
 *           type: string
 *           description: The email for registration
 *         phone:
 *           type: string
 *           description: The phone id for registration
 *         password:
 *           type: string
 *           description: The password for registration
*     ForgetPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email for resetting password
*/

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication APIs
 * /api/login:
 *   post:
 *     summary: User Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: User login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUp'
 *       500:
 *         description: Some server error
 * /api/register:
 *   post:
 *     summary: User Registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Some server error
 * /api/update-profile/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user profile to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'  
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Some server error
 * /api/forget-password:
 *   post:
 *     summary: forget password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPassword'
 *     responses:
 *       200:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgetPassword'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/reset-password/{id}/{token}:
 *   post:
 *     summary: Reset Password
 *     tags: [Authentication]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         schema:
 *           type: string
 *       - name: token
 *         in: path
 *         description: The token for password reset
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - enterPassword
 *             properties:
 *               enterPassword:
 *                 type: string
 *                 description: The new password entered by the user
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgetPassword'
 *       400:
 *         description: Invalid request format or missing required fields.
 *       401:
 *         description: Unauthorized - User not authenticated or invalid token.
 *       404:
 *         description: User or token not found.
 *       500:
 *         description: Internal server error.
 */

authRoute.post('/api/login', loginController);
authRoute.post('/api/register', signUpController);
authRoute.put('/api/update-profile/:id', verifyUser, profileUpdateController);

authRoute.get('/api/reset-password/:id/:token', getResetPasswordFromGmail);

authRoute.post('/api/reset-password/:id/:token', putResetPasswordFromGmail);

authRoute.post('/api/forgot-password', resetPasswordController);


// authRoute.post('/new-key', addNewKeyValue);
module.exports = { authRoute };
