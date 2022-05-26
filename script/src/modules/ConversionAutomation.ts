import { getUserAddress, getUserContact, getUsers } from '../services/users'
import { goFileCreateFolder, goFileUploadFile } from '../services/goFile'

import FormData from 'form-data'
import { addUser } from '../repository'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const csvWriter = require('csv-writer')
const fileId = randomUUID();
interface User {
    fullName: string,
    email: string,
    address: string,
    addressNumber: string,
    phoneNumber: string,
}

export class ConversionAutomation {

    private async sendToGoFile(): Promise<void> {
        await goFileCreateFolder("Users Report");
        const data = new FormData();

        data.append('file', fs.createReadStream(`${__dirname}/users_${fileId}.csv`));
        data.append('folderName', 'Users Report')
        const fileUpload = await goFileUploadFile(data)
        console.info(fileUpload.data)
        fs.unlinkSync(`${__dirname}/users_${fileId}.csv`);
        return;
    }

    private async generateUsersCSV(arrUsers: Array<User>): Promise<void> {
        const writer = csvWriter.createObjectCsvWriter({
            path: path.resolve(__dirname, `users_${fileId}.csv`),
            header: [
                { id: 'id', title: 'id' },
                { id: 'fullName', title: 'fullName' },
                { id: 'email', title: 'email' },
            ]
        })
        writer.writeRecords(arrUsers).then(() => {
            console.info('CSV Created')
        })
        return;
    }

    private async pushUsersToMongoDB(arrUsers: Array<User>): Promise<void> {
        for await (const user of arrUsers) {
            await addUser(user)
        }
        console.info('Users added to MongoDB')
        return;
    }
    public async execute() {
        const limit = "10"
        const arrUsers: Array<{
            fullName: string,
            email: string,
            address: string,
            addressNumber: string,
            phoneNumber: string,
        }> = [];
        for (let page = 0; page < 1; page++) {
            console.info({ currentPage: page + 1 })
            const users = await getUsers(limit, String(page + 1));
            if (users.error) {
                console.error(users.message)
                continue;
            }
            const usersArray = users.data;
            for await (const users of usersArray.usersList) {
                for await (const user of users.item) {
                    const address = await getUserAddress(user.id[0]);
                    if (address.error) {
                        console.error(`skiping user error: ${address.message}`)
                        continue;
                    }
                    const userAddress = address.data.item;
                    const contact = await getUserContact(user.id[0]);
                    if (contact.error) {
                        console.error(`skiping user error: ${contact.message}`)
                        continue;
                    }
                    const userContact = contact.data.item;
                    let addressStreet;
                    let addressNumber;
                    let phoneNumber;
                    if (userAddress && userAddress.length > 0) {
                        addressStreet = userAddress[0].street[0] ? userAddress[0].street[0] : "";
                        addressNumber = userAddress[0].number[0]._ ? userAddress[0].number[0]._ : "";
                    }
                    if (userContact && userContact.length > 0) {
                        phoneNumber = userContact[0].phoneNumber[0] ? userContact[0].phoneNumber[0] : "";
                    }
                    const userObj = {
                        id: user.id[0],
                        fullName: user.firstName[0] + ' ' + user.lastName[0],
                        email: user.email[0],
                        address: addressStreet ? addressStreet : "",
                        addressNumber: addressNumber ? addressNumber : "",
                        phoneNumber: phoneNumber ? phoneNumber : "",
                    }
                    console.info({ user: userObj })
                    arrUsers.push(userObj)
                }
            }
        }
        await this.pushUsersToMongoDB(arrUsers);
        await this.generateUsersCSV(arrUsers);
        await this.sendToGoFile();

        return { success: true }
    }
}

