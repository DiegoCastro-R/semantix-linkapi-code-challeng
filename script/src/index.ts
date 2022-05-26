require("dotenv").config()

import './infra/database/mongo/connection'

import { ConversionAutomation } from './modules/ConversionAutomation'

const main = async () => {
    const conversionAutomation = new ConversionAutomation()
    const run = await conversionAutomation.execute()
    if (run.success) {
        console.info("Conversion Automation finished successfully")
        process.exit(1)
    }
}

main()