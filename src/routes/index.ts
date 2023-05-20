import { Router } from 'express';
import user from './user.router';
import message from './message.router';


const router = Router();

router.use('/',user, message);


export default router;