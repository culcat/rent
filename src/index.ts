import express,{Request,Response} from "express";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';
import userRouter from './Routes/users'
import apsRouter from './Routes/apartaments'
import feedbackRouter from "./Routes/feedback";
import reviewRouter from './Routes/review'
import cardRouter from './Routes/cards'
import cors from 'cors'
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
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use('/api', cardRouter)
app.use('/api',reviewRouter)
app.use('/api',userRouter)
app.use('/api',feedbackRouter)
app.use('/api',apsRouter)
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/', (req: Request, res: Response) => {
    res.send('Привет, мир!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}/documentation`);
});