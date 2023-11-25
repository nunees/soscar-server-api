import { CreateNotificationController } from "@modules/notifications/useCases/createNotification/createNotificationController";
import { DeleteNotificationController } from "@modules/notifications/useCases/deleteNotification/deleteNotificationController";
import { FindNotificationByIdController } from "@modules/notifications/useCases/findNotificationById/findNotificationByIdController";
import { FindNotificationByUserIdController } from "@modules/notifications/useCases/findNotificationByUserId/findNotificationByUserIdController";
import { MarkNotificationAsReadController } from "@modules/notifications/useCases/markNotificationAsRead/markNotificationAsReadController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindAllNotificationsController } from "@modules/notifications/useCases/findAllNotifications/findAllNotificationsController";
import { DeleteAllNotificationsController } from "@modules/notifications/useCases/deleteAllNotifications/deleteAllNotificationsController";
import { FindNotReadNotificationController } from "@modules/notifications/useCases/findNotReadNotification/findNotReadNotificationController";



const createNotificationController = new CreateNotificationController();
const deleteNotificationController = new DeleteNotificationController();
const deleteAllNotificationsController = new DeleteAllNotificationsController();
const findNotificationByIdController = new FindNotificationByIdController();
const findNotificationByUserIdController = new FindNotificationByUserIdController();
const markNotificationAsReadController = new MarkNotificationAsReadController();
const findAllNotificationsController = new FindAllNotificationsController();
const findNotReadNotificationController = new FindNotReadNotificationController();

const notificationsRouter = Router();

notificationsRouter.get('/', ensureAuthenticated, findAllNotificationsController.handle);
notificationsRouter.get('/all/new',ensureAuthenticated, findNotificationByUserIdController.handle);
notificationsRouter.get('/all/:user_id',ensureAuthenticated, findNotificationByUserIdController.handle);
notificationsRouter.get('/all/fresh',ensureAuthenticated, findNotReadNotificationController.handle);

notificationsRouter.post('/',ensureAuthenticated, createNotificationController.handle);
notificationsRouter.patch('/:notification_id',ensureAuthenticated, markNotificationAsReadController.handle);

notificationsRouter.delete('/all/:user_id',ensureAuthenticated, deleteAllNotificationsController.handle);
notificationsRouter.delete('/:notification_id',ensureAuthenticated, deleteNotificationController.handle);


export { notificationsRouter };