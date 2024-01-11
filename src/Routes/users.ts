import express, { Request, Response } from 'express';
import * as db from '../Controllers/users';
import * as crypto from 'crypto';
import jwt, { TokenExpiredError, verify } from 'jsonwebtoken';
import * as dbFeed from '../Controllers/review'
const router = express.Router();
/**
 /**
 * @openapi
 * /api/login:
 *   get:
 *     summary: Вход
 *     tags:
 *       - Пользователи
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя пользователя
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         description: Пароль пользователя
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT токен
 *       '401':
 *         description: Неверное имя пользователя или пароль
 *       '500':
 *         description: Внутренняя ошибка сервера
 */
/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Регистрация
 *     tags:
 *       - Пользователи
 *     requestBody:
 *       description: JSON object containing user registration information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *               firstname:
 *                 type: string
 *                 description: The first name of the user.
 *               lastname:
 *                 type: string
 *                 description: The last name of the user.
 *               thirdname:
 *                 type: string
 *                 description: The third name of the user.
 *               position:
 *                 type: string
 *                 description: The position or role of the user.
 *               img:
 *                 type: string
 *                 description: The username for the new user.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '201':
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: number
 *                   description: The unique identifier for the newly created user.
 *                 username:
 *                   type: string
 *                   description: The username of the newly created user.
 *                 token:
 *                   type: string
 *                   description: Authentication token for the newly registered user.
 *       '400':
 *         description: Bad Request. Missing required fields or user with the same username already exists.
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */

/**
 * @openapi
 * /api/verify:
 *   get:
 *     summary: Вход
 *     tags:
 *       - Пользователи
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя пользователя
 *
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT токен
 *       '401':
 *         description: Invalid token
 *       '500':
 *         description: Внутренняя ошибка сервера
 */
/**
 * @swagger
 * /api/all:
 *   get:
 *     summary: Список пользователей
 *     tags:
 *       - Пользователи
 *     responses:
 *       '200':
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // Define the properties of your apartment object here
 *       '500':
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Удаление пользователя
 *     tags:
 *       - Пользователи
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: Имя пользователя, которого необходимо удалить
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       '500':
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

function generateSecretKey():string{
    const secretKey = crypto.randomBytes(64).toString('hex');
    return secretKey;
}
const secretkey = generateSecretKey()
console.log(secretkey);


router.get('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.query;

        const user = await db.getUserByUsername(username as string);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        const token = jwt.sign({ username }, secretkey, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/verify', async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        console.log('Received Token:', token);

        if (!token) {
            return res.status(401).json({ error: 'Token is required' });
        }

        const decoded = jwt.verify(token as string, secretkey) as jwt.JwtPayload;
        console.log('Decoded Payload:', decoded);

        if (!decoded.username) {
            return res.status(401).json({ error: 'Invalid token structure' });
        }

        const userFeedback = await dbFeed.getReviewByUsername(decoded.username)
        const userInfo = await db.getUserByUsername(decoded.username);

        // Return user information in the response
        res.status(200).json({userInfo,userFeedback});
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ error: 'Token has expired' });
        }

        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});




router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password,firstname,lastname,thirdname,position,img } = req.body;

        if (!username || !password ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await db.getUserByUsername(username);

        if (existingUser) {
            return res.status(400).json({ error: 'User with this username already exists' });
        }

        const userId = await db.createUser(username, password,firstname,lastname,thirdname,position,img);

        // Generate a token for the newly registered user
        const token = jwt.sign({ username }, secretkey, { expiresIn: '1h' });

        res.status(201).json({  userId, username, password,token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/all', async(req:Request,res:Response)=>{
    try{
        const users  = await db.getAllUsers()
        res.status(200).json({users:users})
    }catch (e) {
        console.error('error:',e)
        res.status(500).json({error:'Iternal server Error'})
    }
})

router.delete('/users/delete',async(req:Request,res:Response)=>{
    try{
    const {username} = req.query
    const user = await db.deleteUser(String(username))
    res.status(200).json({user:user})
    }catch (e) {
        console.error('error:',e)
        res.status(500).json({error:'Iternal server Error'})
    }
})


export default router;