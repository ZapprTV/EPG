import { DateTime } from "luxon";
import log from "../../utils/logger";

export default async function fetchEPG(channels) {
    let epg = {};

    for (const channel in channels) {
        epg[channels[channel]] = [];
        for (const daysToAdd in [...Array(8).keys()]) {
            const date = DateTime.now().setZone("Europe/Rome").plus({ days: daysToAdd - 1 }).toFormat("dd-MM-yyyy");
            log("generating", { source: "raiplaysound", channel: channels[channel], day: date });
            await fetch(`https://www.raiplaysound.it/palinsesto/app/${channels[channel]}/${date}.json`)
                .then(response => response.json())
                .then(json => {
                    epg[channels[channel]] = [...epg[channels[channel]], ...json.events.flatMap(entry => {
                        const startTime = DateTime.fromFormat(`${entry.date} ${entry.hour}`, "dd/MM/yyyy HH:mm", { zone: "Europe/Rome" });
                        const endTime = startTime.plus({ hours: entry.duration.trim().split(":")[0], minutes: entry.duration.trim().split(":")[1], seconds: entry.duration.trim().split(":")[2] });
                        const today = DateTime.now().setZone("Europe/Rome").startOf("day");
                        if (today.ts <= endTime.ts) {
                            let result = {
                                name: entry.title.trim(),
                                startTime: {
                                    unix: startTime.ts,
                                    iso: startTime.toISO()
                                },
                                endTime: {
                                    unix: endTime.ts,
                                    iso: endTime.toISO()
                                }
                            };
                            if (entry.description && entry.description.trim()) result.description = entry.description.trim();
                            if (entry.image && entry.image.trim()) result.image = `https://www.raiplaysound.it${entry.image.trim()}`;
                            if (entry.weblink && entry.weblink.trim()) result.link = `https://www.raiplaysound.it${entry.weblink.trim()}`;
                            if (entry.parental_control) {
                                result.rating = {
                                    background: entry.parental_control.color.trim(),
                                    label: entry.parental_control.label_extended.trim(),
                                    text: ["#ffce2d"].includes(entry.parental_control.color.trim()) ? "#000" : "#fff"
                                };
                            };
    
                            return result;
                        } else return [];
                    })];
                    log("generating-done", { source: "raiplaysound", channel: channels[channel], day: date });
                })
                .catch(err => log("generating-fail", { source: "raiplaysound", channel: channels[channel], day: date, error: err }));
        };
        log("spacer", { width: 90 });
    };

    return epg;
};