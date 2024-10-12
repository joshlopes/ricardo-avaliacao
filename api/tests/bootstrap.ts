import * as dotenv from 'dotenv';
import path = require("path");
import {myContainer} from "../src/Infrastructure/DependencyInjection/inversify.config";
import InMemoryLogger from "./Helper/InMemoryLogger";
import {TYPES} from "../src/Infrastructure/DependencyInjection/types";

dotenv.config({
    path: path.join(__dirname, '/../.env.test'),
    override: false,
    debug: false
})

myContainer.rebind(TYPES.Logger).toConstantValue(new InMemoryLogger())
