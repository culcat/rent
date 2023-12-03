import express, { Request, Response } from 'express';
import * as db from '../Controllers/feedback';


const router = express.Router();
/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Create a new apartment
 *     description: Creates a new apartment with the provided details.
 *     parameters:
 *       - in: body
 *         name: feedback
 *         description: The details of the apartment to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *             id_apart:
 *               type: number
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
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





router.post('/feedback', async (req:Request, res:Response) => {
    try {
        const { phone, id_apart } = req.body;
        console.log(req.body);
        const feedbackId = await db.feedback(phone, id_apart);
        res.status(201).json({ id: feedbackId, message: 'Feedback created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.get('/apartments/get', async (req, res) => {
//     try {
//         const apartments = await db.getAps();
//         res.status(200).json(apartments);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



export default router;