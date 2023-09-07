import { Router } from 'express';

import  {createOffice}  from "../controllers/office.js";
import  auth  from '../middleware/auth.js';

const officeRouter = Router();

officeRouter.post('/', auth, createOffice)

export default officeRouter;