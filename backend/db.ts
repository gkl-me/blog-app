import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

globalThis as any as {
    prisma?: PrismaClient
}

export const getPrimsa = (c:Context)  => {
    return new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
}