import { addCustomer, updateCustomer, getCustomers, getCustomer, deleteCustomer } from "./customersRepository";

async function start() {
    //exemplo de insert
    const result = await addCustomer({
        name: "Pedro",
        age: 9
    })

    //exemplo de update
    // const result = await updateCustomer(
    //     "64ff254a1caa015e877e1c15",
    //     {
    //         name: "Pedro da Rosa Duarte"
    //     })

    //exemplo de find all
    //const result = await getCustomers();

    //exemplo de find one
    //const result = await getCustomer("64ff20622a3a4847a1d86aea");

    //exemplo de delete
    //const result = await deleteCustomer("64ff254a1caa015e877e1c15");
    console.log(result);
}

start();