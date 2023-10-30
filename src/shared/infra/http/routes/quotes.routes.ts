import { CreateUserQuoteController } from "@modules/quote/useCases/createUserQuote/createUserQuoteController";
import {Router} from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import multer from "multer";
import uploadConfig from "@config/uploadConfig";
import { CreateQuoteDocumentController } from "@modules/quote/useCases/createQuoteDocument/createQuoteDocumentController";
import { FindAllUserQuotesController } from "@modules/quote/useCases/findAllUserQuotes/findAllUserQuotesController";
import { FindAllUserQuotesDocumentsController } from "@modules/quote/useCases/findAllUserQuotesDocuments/findAllUserQuotesDocumentsController";
import { FindUserQuoteByIdController } from "@modules/quote/useCases/findUserQuoteById/findUserQuoteByIdController";
import { FindUserQuoteDocumentController } from "@modules/quote/useCases/findUserQuoteDocuments/findUserQuoteDocumentController";
import { FetchDocumentController } from "@modules/quote/useCases/fetchDocument/FetchDocumentController";
import { UpdateRegularQuoteController } from "@modules/quote/useCases/updateRegularQuote/updateRegularQuoteController";
import { UpdateQuoteStatusController } from "@modules/quote/useCases/updateQuoteStatus/updateQuoteStatusController";
import { CreatePartnerDocumentController } from "@modules/quote/useCases/createPartnerDocument/createPatnerDocumentController";
import { UpdateDocumentOwnerController } from "@modules/quote/useCases/updateDocumentOwner/updateDocumentOwnerController";


const uploadDocuments = multer(uploadConfig.upload("./upload/quotes"));


const quotesRoutes = Router();

const createUserQuoteController = new CreateUserQuoteController();
const createQuoteDocumentController = new CreateQuoteDocumentController();
const findAllUserQuotesController = new FindAllUserQuotesController();
const findAllUserQuotesDocumentsController = new FindAllUserQuotesDocumentsController();
const findUserQuoteByIdController = new FindUserQuoteByIdController();
const findUserQuoteDocumentByIdController = new FindUserQuoteDocumentController();
const fetchDocumentController = new FetchDocumentController();
const updateRegularQuoteController = new UpdateRegularQuoteController();
const updateQuoteStatusController = new UpdateQuoteStatusController();
const createPartnerDocumentController = new CreatePartnerDocumentController();
const updateDocumentOwnerController = new UpdateDocumentOwnerController();




quotesRoutes.get("/:user_type", ensureAuthenticated, findAllUserQuotesController.handle);
quotesRoutes.get("/documents", ensureAuthenticated, findAllUserQuotesDocumentsController.handle);
quotesRoutes.get("/find/:quote_id", ensureAuthenticated, findUserQuoteByIdController.handle);
quotesRoutes.get("/documents/:quote_id/:hashId", ensureAuthenticated, findUserQuoteDocumentByIdController.handle);
quotesRoutes.get("/document/:document_id/:hashId", fetchDocumentController.handle);

quotesRoutes.post("/", ensureAuthenticated ,createUserQuoteController.handle);

quotesRoutes.post("/documents/:quote_id/:hashId", ensureAuthenticated, uploadDocuments.single("file"), createQuoteDocumentController.handle);

quotesRoutes.get("/legal/:quote_id/:hashId", ensureAuthenticated, findUserQuoteDocumentByIdController.handle);


quotesRoutes.post("/partner/document/:quote_id/:hashId", ensureAuthenticated, uploadDocuments.single("file"), createPartnerDocumentController.handle);

quotesRoutes.patch("/:quote_id", ensureAuthenticated, updateRegularQuoteController.handle);

quotesRoutes.put("/status/:quote_id", ensureAuthenticated, updateQuoteStatusController.handle);

quotesRoutes.put("/document/owner/:document_id/:user_id", ensureAuthenticated, updateDocumentOwnerController.handle);



export {quotesRoutes};