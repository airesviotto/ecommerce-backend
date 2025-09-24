import { compare } from "bcryptjs";
import { prisma } from "../libs/prisma"
import { v4 } from "uuid";


export const authUser = async(email:string, password:string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!user) {
        return null;
    }

    const validatePassword = await compare(password, user.password);
    if(!validatePassword) {
        return null;
    }

    const token = v4();
    await.prisma.user.update({
        where:{
            id: user.id
        },
        data: {token}
    })
    return token;
}