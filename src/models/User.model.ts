import {Table, Column, Model, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';

export interface IUsers {
    id?: number
    name: string
    email: string
}

@Table({
    tableName: "Users"
})
export default class Users extends Model implements IUsers {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number

    @Column
    name!: string

    @Column
    email!: string
}