import { Router } from "express";

import { CreateLegalQuoteController } from "@modules/quote/useCases/createLegalQuote/CreateLegalQuoteController";
import { CreateLegalDocumentController } from "@modules/quote/useCases/createLegalDocument/CreateLegalDocumentController";
import { FindAllUseLegalQuotesController } from "@modules/quote/useCases/findAllUserLegalQuotes/FindAllUserLegalQuotesController";
import { FindAllByLocationController } from "@modules/quote/useCases/findAllByLocation/FindAllByLocationController";
import { FindAllPartnerLegalQuotesController } from "@modules/quote/useCases/findAllPartnerLegalQuotes/FindAllPartnerLegalQuotesController";
import { FindLegalQuoteByHashIdController } from "@modules/quote/useCases/findLegalQuoteByHashId/findLegalQuoteByHashIdController";
import { UpdateQuoteStatusController } from "@modules/quote/useCases/updateQuoteStatus/updateQuoteStatusController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import multer from "multer";
import uploadConfig from "@config/uploadConfig";
import { FindUserQuoteByIdController } from "@modules/quote/useCases/findUserQuoteById/findUserQuoteByIdController";
import { FindUserQuoteDocumentController } from "@modules/quote/useCases/findUserQuoteDocuments/findUserQuoteDocumentController";
import { FindLegalQuoteByIdController } from "@modules/quote/useCases/findLegalQuoteById/FindLegalQuoteByIdController";
import { UpdateLegalQuoteStatusController } from "@modules/quote/useCases/updateLegalQuoteStatus/UpdateLegalQuoteStatusController";
import { FindLegalQuoteDocumentsController } from "@modules/quote/useCases/findLegalQuoteDocuments/findLegalQuoteDocumentsController";
import { FetchLegalDocumentController } from "@modules/quote/useCases/fetchLegalDocument/fetchLegalDocumentController";
import { UpdateLegalDocumentOwnerController } from "@modules/quote/useCases/updateLegalDocumentOwner/updateLegalDocumentOwnerController";
import { UpdateLegalQuoteController } from "@modules/quote/useCases/updateLegalQuote/UpdateLegalQuoteController";

//Legal quotes
const createLegalQuoteController = new CreateLegalQuoteController();
const createLegalQuoteDocumentController = new CreateLegalDocumentController();
const findAllUserLegalQuotesController = new FindAllUseLegalQuotesController();
const findAllLegalQuotesController = new FindAllUseLegalQuotesController();
const findAllByLocationController = new FindAllByLocationController();
const findAllPartnerLegalQuotesController = new FindAllPartnerLegalQuotesController();
const updateLegalQuoteStatusController = new UpdateLegalQuoteStatusController();
const findLegalQuoteByHashIdController = new FindLegalQuoteByHashIdController();
const findUserQuoteDocumentByIdController = new FindUserQuoteDocumentController ();
const findLegalQuoteByIdController = new FindLegalQuoteByIdController();
const findLegalQuoteDocumentsController = new FindLegalQuoteDocumentsController()
const fetchLegalDocumentController = new FetchLegalDocumentController();
const updateLegalDocumentOwnerController = new UpdateLegalDocumentOwnerController();
const updateLegalQuoteController = new UpdateLegalQuoteController();


const uploadDocuments = multer(uploadConfig.upload("./upload/quotes"));
const legalRoutes = Router();

// Legal Paths
legalRoutes.get("/:user_id", ensureAuthenticated, findAllUserLegalQuotesController.handle);
legalRoutes.get("/", ensureAuthenticated, findAllLegalQuotesController.handle)

legalRoutes.get("/location/:location_id", ensureAuthenticated, findAllByLocationController.handle)
legalRoutes.get("/partner/:user_id", ensureAuthenticated, findAllPartnerLegalQuotesController.handle)

legalRoutes.get("/document/:quote_id/:hashId", ensureAuthenticated, findUserQuoteDocumentByIdController.handle);

legalRoutes.get("/hash/:hashId", ensureAuthenticated, findLegalQuoteByHashIdController.handle);

legalRoutes.get("/get/:quote_id", ensureAuthenticated, findLegalQuoteByIdController.handle);

legalRoutes.get("/documents/:hashId", ensureAuthenticated, findLegalQuoteDocumentsController.handle)

legalRoutes.get("/documents/get/:document_id/:hashId", fetchLegalDocumentController.handle);


legalRoutes.post("/", ensureAuthenticated, createLegalQuoteController.handle)


legalRoutes.post("/document/:hashId", ensureAuthenticated, uploadDocuments.single("document"), createLegalQuoteDocumentController.handle);


legalRoutes.patch("/status/:quote_id", ensureAuthenticated, updateLegalQuoteStatusController.handle);

legalRoutes.put("/document/owner/:document", ensureAuthenticated, updateLegalDocumentOwnerController.handle);

legalRoutes.patch("/update/:quote_id", ensureAuthenticated, updateLegalQuoteController.handle);

export { legalRoutes}