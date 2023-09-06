import { CreateScheduleController } from '@modules/schedule/useCases/createSchedule/createScheduleController';
import { UploadDocumentsController } from '@modules/schedule/useCases/uploadDocuments/uploadDocumentsController';
import {Router} from 'express';

import multer from 'multer';
import uploadConfig from '@config/uploadConfig';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const schedulesRoutes = Router();
const uploadDocuments  = multer(uploadConfig.upload('./upload/schedules'));

const createScheduleController = new CreateScheduleController();
const uploadDocumentsController = new UploadDocumentsController();


// POST
schedulesRoutes.post('/', ensureAuthenticated, createScheduleController.handle);
schedulesRoutes.post('/documents/:schedule_id', ensureAuthenticated, uploadDocuments.single('document'), uploadDocumentsController.handle);


export {schedulesRoutes};