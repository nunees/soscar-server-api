import { ICreateQuoteDTO } from "@modules/quote/dtos/ICreateQuoteDTO";
import { ICreateQuoteDocumentDTO } from "@modules/quote/dtos/ICreateQuoteDocumentDTO";
import { Quote } from "@modules/quote/entities/Quote";
import { IQuotesRepository } from "@modules/quote/repositories/IQuotesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateUserQuoteUseCase{
  constructor(
    @inject("QuotesRepository")
    private quotesRepository: IQuotesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository,
  ){}

  async execute(quote: ICreateQuoteDTO): Promise<Quote>{
    try{

      const userExists = await this.usersRepository.findById(quote.user_id);

    if(!userExists){
      throw new Error("Usuario não existe");
    }

    if(userExists.isPartner){
      throw new Error("Usuarios parceiro não podem criar orçamentos");
    }

    const vehicleExists = await this.vehiclesRepository.findById(quote.vehicle_id);

    if(!vehicleExists){
      throw new Error("Veiculo informado não existe");
    }

    const createdQuote = await this.quotesRepository.create(quote);

    return createdQuote;
    }catch(error){
      throw new AppError("Erro ao criar arquivos do orçamento");
    }
  }
}