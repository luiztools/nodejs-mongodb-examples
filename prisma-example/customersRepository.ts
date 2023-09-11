import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function connect() {
    await prisma.$connect();
}

connect();

export function getCustomers() {
    return prisma.customers.findMany();
}

export function getCustomer(id: string) {
    return prisma.customers.findUnique({
        where: { id }
    })
}

export function addCustomer(newCustomer: any) {
    return prisma.customers.create({
        data: newCustomer
    });
}

export function updateCustomer(id: string, newData: any) {
    return prisma.customers.update({
        where: { id },
        data: newData
    })
}

export async function deleteCustomer(id: string) {
    return prisma.customers.delete({
        where: { id }
    })
}
