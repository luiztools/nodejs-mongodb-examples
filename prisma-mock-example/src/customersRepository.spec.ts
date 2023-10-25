import { addCustomer, getCustomer, getCustomers, deleteCustomer, updateCustomer } from "./customersRepository";
import { prismaMock } from './singleton'

describe('Customers Repository Tests', () => {

    const customer = {
        id: "",
        name: "LuizTools",
        age: 35
    }

    it('Should get customer', async () => {
        prismaMock.customers.findUnique.mockResolvedValue(customer);

        const result = await getCustomer("1");
        if (result) {
            expect(result.name).toEqual(customer.name);
        }
    });

    it('Should get customers', async () => {
        prismaMock.customers.findMany.mockResolvedValue([customer]);

        const result = await getCustomers();
        expect(result.length).toEqual(1);
        expect(result[0].name).toEqual(customer.name);
    });

    it('Should add customer', async () => {
        prismaMock.customers.create.mockResolvedValue(customer);

        const result = await addCustomer(customer);
        expect(result.name).toEqual(customer.name);
    });

    it('Should update customer', async () => {
        prismaMock.customers.update.mockResolvedValue(customer);

        const result = await updateCustomer("1", customer);
        expect(result.name).toEqual(customer.name);
    });

    it('Should delete customer', async () => {
        prismaMock.customers.delete.mockResolvedValue(customer);

        const result = await deleteCustomer("1");
        expect(result.name).toEqual(customer.name);
    });
});
