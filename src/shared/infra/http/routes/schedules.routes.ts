import { CreateScheduleController } from '@modules/schedule/useCases/createSchedule/createScheduleController';
import { UploadDocumentsController } from '@modules/schedule/useCases/uploadDocuments/uploadDocumentsController';
import {Router} from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploadConfig';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { FetchSchedulesController } from '@modules/schedule/useCases/fetchSchedules/fetchSchedulesController';
import { FetchScheduleByIdController } from '@modules/schedule/useCases/fetchScheduleById/fetchScheduleByIdController';
import { FetchFilesController } from '@modules/schedule/useCases/fetchFiles/FetchFilesController';
import { UpdateScheduleController } from '@modules/schedule/useCases/updateSchedule/updateScheduleController';
import { FetchLocationSchedulesController } from '@modules/schedule/useCases/fetchLocationSchedules/fetchLocationSchedulesController';
import { FetchAllUserSchedulesController } from '@modules/schedule/useCases/fetchAllUsersSchedules/fetchAllUserSchedulesController';


const schedulesRoutes = Router();
const uploadDocuments  = multer(uploadConfig.upload('./upload/schedules'));

const createScheduleController = new CreateScheduleController();
const uploadDocumentsController = new UploadDocumentsController();
const fetchSchedulesController = new FetchSchedulesController();
const fetchScheduleByIdController = new FetchScheduleByIdController();
const fetchFilesController = new FetchFilesController();
const updateScheduleController = new UpdateScheduleController();
const fetchLocationSchedulesController = new FetchLocationSchedulesController();
const fetchAllUserSchedulesController = new FetchAllUserSchedulesController();

// GET
schedulesRoutes.get('/:user_type', ensureAuthenticated, fetchSchedulesController.handle);
schedulesRoutes.get('/find/:scheduleId', ensureAuthenticated, fetchScheduleByIdController.handle);
schedulesRoutes.get('/documents/:schedule_id/:file_url',  fetchFilesController.handle);

schedulesRoutes.get('/location/:location_id', ensureAuthenticated, fetchLocationSchedulesController.handle)
schedulesRoutes.get('/location/user/:location_id', ensureAuthenticated, fetchAllUserSchedulesController.handle);


// POST
schedulesRoutes.post('/', ensureAuthenticated, createScheduleController.handle);
schedulesRoutes.post('/documents/:schedule_id', ensureAuthenticated, uploadDocuments.single('document'), uploadDocumentsController.handle);

// PUT
schedulesRoutes.put('/:schedule_id', ensureAuthenticated, updateScheduleController.handle);



export {schedulesRoutes};