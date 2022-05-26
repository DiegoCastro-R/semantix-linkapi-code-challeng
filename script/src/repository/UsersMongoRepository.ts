import { Users } from '../infra/database/mongo/models'

interface User {
    fullName: string,
    email: string,
    address: string,
    addressNumber: string,
    phoneNumber: string,
}

const addUser = async (user: User): Promise<User> => {
    const created = await Users.create(user)
    return created;
}

export { addUser }