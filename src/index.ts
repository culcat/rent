import express,{Request,Response} from "express";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';
import userRouter from './Routes/users'
const app = express()
const port = 3030
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./src/Routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use(bodyParser.json());
app.use('/api',userRouter)
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/', (req: Request, res: Response) => {
    res.send('Привет, мир!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});