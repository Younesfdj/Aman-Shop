import { client } from "@/sanity/lib/client"
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
export async function seedOrdersData(order) {
  const transaction = client.transaction()
    const clientOrder = {
      _type: "client",
      _id:uuidv4(),
      firstName:order.firstname,
      lastName:order.lastname,
      email:order.email,
      address:order.address,
      phone:order.phone,
      orders:order.orders
    }
    console.log(clientOrder);
    
    transaction.createOrReplace(clientOrder)
  await transaction.commit()
}

