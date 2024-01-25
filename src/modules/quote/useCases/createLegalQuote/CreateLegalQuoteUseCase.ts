import { ILocationsRepository } from '@modules/locations/repositories/ILocationsRepository';
import { ILegalQuoteRepository } from '@modules/quote/repositories/ILegalQuoteRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IVehiclesRepository } from '@modules/vehicles/repositories/IVehiclesRepository';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  user_id: string;
  hashId: string;
  vehicle_id: string;
  insurance_company_id: number;
  service_type_id: number;
  user_notes: string;
  locations: string[];
};

@injectable()
export class CreateLegalQuoteUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('LegalQuotesRepository')
    private legalQuotesRepository: ILegalQuoteRepository,
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  async execute(quote: IRequest) {

    const user = await this.usersRepository.findById(quote.user_id);
    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    const vehicle = await this.vehiclesRepository.findById(quote.vehicle_id);
    if (!vehicle) {
      throw new Error('Veiculo não encontrado');
    }


    quote.locations.map(async (location) => {
      try{
        await this.legalQuotesRepository.create({
          user_id: String(user.id),
          hashId: quote.hashId,
          vehicle_id: quote.vehicle_id,
          insurance_company_id: quote.insurance_company_id,
          service_type_id: quote.service_type_id,
          user_notes: quote.user_notes,
          location_id: location,
          insurance_type_id: 1,
        });
      }catch(error){
        throw new Error('Localizacao não encontrada');
      }
      return
    });
  }
}
