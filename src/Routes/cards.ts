import express, { Request, Response } from 'express';
import * as db from '../Controllers/cards';

const router = express.Router();
/**
 * @swagger
 * /api/cards/create:
 *   post:
 *     summary: Создание карточки
 *     tags:
 *       - Карточки
 *     requestBody:
 *       description: Создает новую карточку с предоставленными данными.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Карточка успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 message:
 *                   type: string
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
 * /api/cards/get:
 *   get:
 *     summary: Список карточки
 *     tags:
 *      - Карточки
 *     requestBody:
 *     description: Retrieves a list of all cards.
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               // Define the properties of your apartment object here
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */





router.post('/cards/create', async (req: Request, res: Response) => {
    const {tittle,img } = req.body;

    try {
        const id = await db.createCard(tittle,img);
        res.status(201).json({ id, message: 'Apartment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/cards/get', async (req, res) => {
    try {
        const apartments = await db.getCard();
        res.status(200).json(apartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;