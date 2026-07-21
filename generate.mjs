import log from "./utils/logger";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const generate = async (list, language = "it") => {
    const nationalSources = await import(`./lists/${list}/national`);
    const nationalEPG = {};
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    for (const source of Object.keys(nationalSources.default)) {
        try {
            const { fetch, channels } = nationalSources.default[source];
            nationalEPG[source] = await fetch(channels);
        } catch (e) {
            console.error(`Failed fetching EPG from ${source}: ${e.stack}`);
            nationalEPG[source] = [];
        };
    };

    log("writing", { language: language });
    await fs.writeFile(path.join(__dirname, `output/${list}/national.json`), JSON.stringify(nationalEPG, null, 4));
    log("writing-done", { language: language });
    console.log("");
    log("spacer");
    console.log("");

    const regionalSources = (await fs.readdir(path.join(__dirname, `lists/${list}/regional`))).filter(file => file.endsWith(".js"));

    for (const source of regionalSources) {
        const region = path.basename(source, ".js");
        const regionSources = await import(path.join(__dirname, `lists/${list}/regional`, source));
        const regionEPG = {};
        for (const source of Object.keys(regionSources.default)) {
            try {
                const { fetch, channels } = regionSources.default[source];
                regionEPG[source] = await fetch(channels);
            } catch (e) {
                console.error(`Failed fetching EPG from ${source} (for ${region}): ${e.message}`);
                regionEPG[source] = [];
            };
        };
        log("writing", { region: region, language: language });
        await fs.writeFile(path.join(__dirname, `output/${list}/regional/${region}.json`), JSON.stringify(regionEPG, null, 4));
        log("writing-done", { region: region, language: language });
        console.log("");
        log("spacer");
        console.log("");
    };

    try {
        await fs.rm(path.join(__dirname, ".epg-cache.json"));
    } catch { };
};

await generate("it/dtt");
await generate("fr/tnt");