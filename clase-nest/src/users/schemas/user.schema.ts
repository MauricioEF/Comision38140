import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose"; 

@Schema()
class User {
    @Prop({required:true, unique:true})
    email: string

    @Prop()
    age:number;

    @Prop()
    password:string;

}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<User>;
