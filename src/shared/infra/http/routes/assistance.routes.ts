import { CreateAssistanceStatusController } from "@modules/assistance/useCases/createAssistanceStatus/createAssistanceStatusController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { FindAvailableServiceController } from "@modules/assistance/useCases/findAvailableService/findAvailableServiceController";
import { CreateAssistanceOrderController } from "@modules/assistance/useCases/createAssistanceOrder/createAssistanceOrderController";
import { FindAllAssistanceStatusController } from "@modules/assistance/useCases/findAllAssistanceStatus/findAllAssistanceStatusController";
import { FindAssistanceOrderByIdController } from "@modules/assistance/useCases/findAssistanceOrderById/findAssistanceOrderByIdController";
import { UpdateAssistanceOrderController } from "@modules/assistance/useCases/updateAssistanceOrder/updateAssistanceOrderController";
import { UpdateAssistanceStatusController } from "@modules/assistance/useCases/updateAssistanceStatus/updateAssistanceStatusController";
import { FindAssistanceStatusByIdController } from "@modules/assistance/useCases/findAssistanceStatusById/findAssistanceStatusByIdController";
import { UpdateLocationController } from "@modules/assistance/useCases/updateLocation/updateLocationController";
import { FindPendingOrdersController } from "@modules/assistance/useCases/findPendingOrders/findPendingOrdersController";
import { FindAssistanceOrdersController } from "@modules/assistance/useCases/findAssistanceOrders/findAssistanceOrdersController";
import { CancelOrderController } from "@modules/assistance/useCases/cancelOrder/cancelOrderController";
import { AcceptOrderController } from "@modules/assistance/useCases/acceptOrder/acceptOrderController";


const assistanceRoutes = Router();

const createAssistanceStatusController = new CreateAssistanceStatusController();
const createAssistanceOrderController = new CreateAssistanceOrderController();

const findAssistanceOrdersController = new FindAssistanceOrdersController();
const findAllAssistanceStatusController = new FindAllAssistanceStatusController();

const findAssistanceOrderByIdController = new FindAssistanceOrderByIdController();
const findAssistanceStatusByIdController = new FindAssistanceStatusByIdController();

const findAvailableServiceController = new FindAvailableServiceController();
const findPendingOrdersController = new FindPendingOrdersController();

const updateAssistanceOrderController = new UpdateAssistanceOrderController();
const updateAssistanceStatusController = new UpdateAssistanceStatusController();
const updateLocationController = new UpdateLocationController();

const cancelOrderController = new CancelOrderController();
const acceptOrderController = new AcceptOrderController();


assistanceRoutes.get('/available/:service_id', ensureAuthenticated,findAvailableServiceController.handle);
assistanceRoutes.get('/order/pending/:assistance_status_id', ensureAuthenticated,findAssistanceOrdersController.handle);
assistanceRoutes.get('/status/all', ensureAuthenticated,findAllAssistanceStatusController.handle);
assistanceRoutes.get('/order/:id', ensureAuthenticated,findAssistanceOrderByIdController.handle);
assistanceRoutes.get('/status/:id', ensureAuthenticated,findAssistanceStatusByIdController.handle);

assistanceRoutes.get('/order/pending', ensureAuthenticated,findPendingOrdersController.handle);

assistanceRoutes.patch('/order/update/:id', ensureAuthenticated,updateAssistanceOrderController.handle);
assistanceRoutes.put('/status/update/:id', ensureAuthenticated,updateAssistanceStatusController.handle);
assistanceRoutes.put('/heartbeat/update/:id', ensureAuthenticated,updateLocationController.handle);

assistanceRoutes.post('/order', ensureAuthenticated,createAssistanceOrderController.handle);
assistanceRoutes.post('/status/:service_id', ensureAuthenticated,createAssistanceStatusController.handle);

assistanceRoutes.patch('/order/cancel/:order_id', ensureAuthenticated,cancelOrderController.handle);
assistanceRoutes.patch('/order/accept/new/:order_id', ensureAuthenticated,acceptOrderController.handle);

export { assistanceRoutes };