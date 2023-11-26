import { ICreateAssistanceStatusDTO } from "@modules/assistance/dtos/ICreateAssistanceStatusDTO";
import { IReturnAssistanceStatusDTO } from "@modules/assistance/dtos/IReturnAssistanceStatusDTO";
import { IUpdateAssistanceStatusDTO } from "@modules/assistance/dtos/IUpdateAssistanceStatusDTO";
import { AssistanceStatus } from "@modules/assistance/entities/AssistanceStatus";
import { IAssistanceStatusRepository } from "@modules/assistance/repositories/IAssistanceStatusRepository"
import { PrismaClient } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class AssistanceStatusRepository implements IAssistanceStatusRepository{
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient
    ){}

    async updateLocation(busy: boolean, latitude: string, longitude: string, user_id: string, status: number): Promise<void> {

        try{
            await this.prisma.assistanceStatus.update({
                where: {
                    id: user_id
                },
                data: {
                    status,
                    busy: busy ?? false,
                    latitude,
                    longitude
                }
            })
        }catch(error){

            throw new AppError("Erro ao atualizar localização")
        }
    }


    async findById(id: string): Promise<AssistanceStatus | null> {
        try {
            const result = await this.prisma.assistanceStatus.findUnique({
                where: {
                    id
                }
            })

            if(result){
                return result as AssistanceStatus;
            }

            return null;
        } catch (error) {
            throw new AppError("Erro ao buscar ordem de assistência")
        }
    }


    async find(user_id: string): Promise<AssistanceStatus> {
        try{
            const result = await this.prisma.assistanceStatus.findUnique({
                where: {
                    user_id
                },

            })

            if(!result){
                return {} as AssistanceStatus;
            }

            return result as AssistanceStatus;
        }catch(error){
            throw new AppError("Erro ao buscar ordem de assistência")
        }
    }

    async update(data: IUpdateAssistanceStatusDTO): Promise<void> {
        try {
            const order = await this.prisma.assistanceStatus.findUnique({
                where: {
                    id: data.id
                }
            })


            if(!order){
                throw new AppError("Ordem não encontrada")
            }

            await this.prisma.assistanceStatus.update({
                where: {
                    id: data.id
                },
                data: {
                    service_id: data.service_id ?? order.service_id,
                    milesFee: data.milesFee ?? order.milesFee,
                    price: data.price ?? order.price,
                    busy: data.busy ?? order.busy,
                    latitude: data.latitude ?? order.latitude,
                    longitude: data.longitude ?? order.longitude,
                    updated_at: new Date()
                }
            })
        } catch (error) {

            throw new AppError("Erro ao atualizar ordem de assistência")
        }
    }

    async findAvailablePartners(service_id: number): Promise<IReturnAssistanceStatusDTO[]> {
        try{
            const result = await this.prisma.assistanceStatus.findMany({
                where: {
                    service_id,
                    AND: {
                        status: 2,
                        busy: false,

                    }
                },
                include: {
                    users: {
                        select: {
                            name: true,
                            last_name: true,
                            email: true,
                            mobile_phone: true,
                            avatar: true,
                        }
                    }
                }
            })

            if(result){
                return result as AssistanceStatus[];
            }

            return [];
        }catch(error){
            throw new AppError("Não há parceiros disponíveis")
        }
    }

    async findByUserId(user_id: string): Promise<AssistanceStatus | null> {
        try{
           const result = await this.prisma.assistanceStatus.findUnique({
                where: {
                    user_id
                }
           })

           if(result){
            return result as AssistanceStatus;
           }

           return null;
        }catch(err){
            throw new AppError("Você não possui nenhuma ordem de assistência")
        }
    }

    async create(data: ICreateAssistanceStatusDTO): Promise<void> {
        await this.prisma.assistanceStatus.create({
            data: {
                ...data
            }
        })
    }
}