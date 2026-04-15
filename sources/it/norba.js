import { DateTime } from "luxon";
import log from "../../utils/logger";
import { last, merge } from "lodash";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function fetchEPG(channels) {
    let epg = {};

    for (const channel in channels) {
        let existingCache = {};
        try {
            const data = await fs.readFile(path.join(__dirname, "../../.epg-cache.json"), "utf-8");
            existingCache = JSON.parse(data);
        } catch { };
        
        if (existingCache && existingCache["norba"] && existingCache["norba"][channels[channel]]) {
            log("generating", { source: "norba", channel: channels[channel], day: "N/A - Cachato" });
            epg[channels[channel]] = existingCache["norba"][channels[channel]];
            log("generating-done", { source: "norba", channel: channels[channel], day: "N/A - Cachato" });
        } else {
            epg[channels[channel]] = [];

            log("generating", { source: "norba", channel: channels[channel], day: "N/A" });
            await fetch(`https://api.xdevel.com/radioplayer/mobileview/schedule-json-read/${channels[channel]}?clientId=21ebd41ea06f196db27c1c8060b2409133e2d832&showAll=true`)
                .then(response => response.json())
                .then(async json => {
                    const weekday = DateTime.now().setLocale("it").localWeekday - 1;
                    epg[channels[channel]] = [...epg[channels[channel]], ...Object.keys(json.result.days).filter((el, index) => index >= weekday).concat(Object.keys(json.result.days).filter((el, index) => index < weekday)).flatMap(el => json.result.days[el]).flatMap(entry => {
                        let startTime = DateTime.fromFormat(`${entry.date} ${entry.hour_start}`, "yyyy-MM-dd HH:mm", { zone: "Europe/Rome" });
                        let endTime = DateTime.fromFormat(`${entry.date} ${entry.hour_end}`, "yyyy-MM-dd HH:mm", { zone: "Europe/Rome" });
                        if (endTime.hour === 23 && endTime.minute === 59) endTime = DateTime.fromFormat(entry.date, "yyyy-MM-dd").setZone("Europe/Rome").startOf("day").plus({ days: 1 });

                        let name;
                        if (entry.title === entry.title.toUpperCase()) {
                            name = entry.title.split(" ").map(el => el.slice(0, 1) + el.slice(1).toLowerCase()).join(" ");
                        } else name = entry.title;

                        let result = {
                            name: name,
                            startTime: {
                                unix: startTime.ts,
                                iso: startTime.toISO()
                            },
                            endTime: {
                                unix: endTime.ts,
                                iso: endTime.toISO()
                            }
                        };
                        if (entry.short_description && entry.short_description.trim()) result.description = entry.short_description.trim();
                        if (entry.image && entry.image.trim()) result.image = entry.image.trim();

                        return result;
                    })];
                    log("generating-done", { source: "norba", channel: channels[channel], day: "N/A" });
                    await fs.writeFile(
                        path.join(__dirname, "../../.epg-cache.json"),
                        JSON.stringify(merge({}, existingCache, {
                            norba: epg
                        }), null, 4)
                    );
                })
                .catch(err => log("generating-fail", { source: "norba", channel: channels[channel], day: "N/A", error: err }));
        };
    };
    log("spacer", { width: 60 });

    return epg;
};