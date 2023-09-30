import { ICreateAssistanceStatusDTO } from "@modules/assistance/dtos/ICreateAssistanceStatusDTO";
import { AssistanceStatus } from "@modules/assistance/entities/AssistanceStatus";
import { IAssistanceStatus } from "@modules/assistance/repositories/IAssistanceStatus";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class AssistanceStatusRepository implements IAssistanceStatus{
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient
    ){}

    async create(data: ICreateAssistanceStatusDTO): Promise<void> {
        await this.prisma.assistanceStatus.create({
            data: data
        })
    }
}