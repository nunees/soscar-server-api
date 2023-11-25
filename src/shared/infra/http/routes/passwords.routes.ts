import { ResetPasswordUserController } from "@modules/users/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { VerifyResetCodeController } from "@modules/users/useCases/verifyResetCode/verifyResetCodeController";
import { Router } from "express";



const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();
const verifyResetCodeController = new VerifyResetCodeController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);
passwordRoutes.post("/verify/:email", verifyResetCodeController.handle);

export { passwordRoutes };