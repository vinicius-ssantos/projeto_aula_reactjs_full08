import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { AbstractRepository } from "src/abstractions/abstract.repository"
import { AbstractService } from "src/abstractions/abstract.service"

import { Role } from "./role.entity"
import { RoleRepository } from "./role.repository"
import { User } from "../user/user.entity";

@Injectable()
export class RoleService extends AbstractService<Role> {

    constructor(
        private readonly repository: RoleRepository
    ) {
        super()
    }

    getRepository() {
        return this.repository
    }


    public async getById(id: number) {
        const result = await super.getById(id)
        if (result) return result
        else return null
    }

    public async getList() {
        return (await super.getList()).map(user => {
            return user
        })
    }

    public async getByDescription(description: string) {
        return await this.repository.findByDescription(description)
    }

    public async create(record: Role) {
        const result = await super.create(record)
        if (result) return result
        else return null
    }

    public async update(id: number, record: Role) {
        const result = await super.update(id, record)
        if (result) return result
        else null
    }
}