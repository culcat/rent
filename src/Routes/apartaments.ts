import express, { Request, Response } from 'express';
import * as db from '../Controllers/apartaments';

const router = express.Router();
/**
 * @swagger
 * /api/apartments/create:
 *   post:
 *     summary: Create a new apartment
 *     description: Creates a new apartment with the provided details.
 *     parameters:
 *       - in: body
 *         name: apartment
 *         description: The details of the apartment to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             description:
 *               type: string
 *             phone:
 *               type: string
 *             price:
 *               type: number
 *             rooms:
 *               type: number
 *             img1:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             message:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */


/**
 * @swagger
 * /api/apartments/get:
 *   get:
 *     summary: Get a list of apartments
 *     description: Retrieves a list of all apartments.
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





router.post('/apartments/create', async (req: Request, res: Response) => {
    const { addres, description, phone, price, rooms, img1 } = req.body;

    try {
        const id = await db.createAps(addres, description, phone, price, rooms, img1);
        res.status(201).json({ id, message: 'Apartment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/apartments/get', async (req, res) => {
    try {
        const apartments = await db.getAps();
        res.status(200).json(apartments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;