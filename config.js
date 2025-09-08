import dotenv from "dotenv";
dotenv.config();

function toBool(value, defaultValue = false) {
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === "true";
}


export default {
    OWNER: process.env.OWNER || "234",
    IMG: process.env.IMG || "http://cdn-haki.zone.id/files/H4Ouln.jpg",
    BOT: process.env.BOT || "2348146505741",
    LOGGER: toBool(process.env.LOGGER, true),
    MODS: (process.env.MODS || "2347045035241").split(","),
    PREFIX: process.env.PREFIX || "*",
    SESSION_ID: process.env.SESSION_ID || "https://cdn-haki.zone.id/files/XDMcx8.json",
    MODE: process.env.MODE || "private"
};
