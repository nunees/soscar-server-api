import { CreateNotificationController } from "@modules/notifications/useCases/createNotification/createNotificationController";
import { DeleteNotificationController } from "@modules/notifications/useCases/deleteNotification/deleteNotificationController";
import { FindNotificationByIdController } from "@modules/notifications/useCases/findNotificationById/findNotificationByIdController";
import { FindNotificationByUserIdController } from "@modules/notifications/useCases/findNotificationByUserId/findNotificationByUserIdController";
import { MarkNotificationAsReadController } from "@modules/notifications/useCases/markNotificationAsRead/markNotificationAsReadController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindAllNotificationsController } from "@modules/notifications/useCases/findAllNotifications/findAllNotificationsController";



const createNotificationController = new CreateNotificationController();
const deleteNotificationController = new DeleteNotificationController();
const findNotificationByIdController = new FindNotificationByIdController();
const findNotificationByUserIdController = new FindNotificationByUserIdController();
const markNotificationAsReadController = new MarkNotificationAsReadController();
const findAllNotificationsController = new FindAllNotificationsController();

const notificationsRouter = Router();

notificationsRouter.get('/', ensureAuthenticated, findAllNotificationsController.handle);
notificationsRouter.get('/:notification_id',ensureAuthenticated, findNotificationByIdController.handle);
notificationsRouter.get('/user/:user_id',ensureAuthenticated, findNotificationByUserIdController.handle);

notificationsRouter.post('/',ensureAuthenticated, createNotificationController.handle);
notificationsRouter.patch('/:notification_id',ensureAuthenticated, markNotificationAsReadController.handle);

notificationsRouter.delete('/all/:user_id',ensureAuthenticated, deleteNotificationController.handle);
notificationsRouter.delete('/:notification_id',ensureAuthenticated, deleteNotificationController.handle);


export { notificationsRouter };