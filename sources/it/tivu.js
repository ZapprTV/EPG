import { DateTime } from "luxon";
import log from "../../utils/logger";

export default async function fetchEPG(channels) {
    let epg = {};
    channels.map(channel => epg[channel] = []);
    let lastEventID;

    for (const daysToAdd in [...Array(7).keys()]) {
        const startDate = DateTime.now().setZone("Europe/Rome").plus({ days: daysToAdd }).toFormat("dd-MM-yyyy");
        const endDate = DateTime.now().setZone("Europe/Rome").plus({ days: parseInt(daysToAdd) + 1 }).toFormat("dd-MM-yyyy");
        await fetch(`https://services.tivulaguida.it/api/epg/programming/events/datestart/${startDate}%2000:00:00/dateend/${endDate}%2000:00:00`)
            .then(response => response.json())
            .then(json => {
                json.channels.filter(channel => channels.includes(channel.id)).map(channel => {
                    log("generating", { source: "tivu", channel: channel.id, day: `${startDate} 00:00:00 - ${endDate} 00:00:00` });
                    channel.events.flatMap(entry => {
                        if (lastEventID != entry.id) {
                            lastEventID = entry.id;
                            const startTime = DateTime.fromFormat(entry.date_start, "dd-MM-yyyy HH:mm", { zone: "Europe/Rome" });
                            const endTime = DateTime.fromFormat(entry.date_end, "dd-MM-yyyy HH:mm", { zone: "Europe/Rome" });
                            
                            let result = {
                                name: entry.program.title,
                                startTime: {
                                    unix: startTime.ts,
                                    iso: startTime.toISO()
                                },
                                endTime: {
                                    unix: endTime.ts,
                                    iso: endTime.toISO()
                                }
                            };
                            if (entry.program.description && entry.program.description.trim()) result.description = entry.program.description.trim();

                            epg[channel.id].push(result);
                        };
                    });
                    log("generating-done", { source: "tivu", channel: channel.id, day: `${startDate} 00:00:00 - ${endDate} 00:00:00` });
                });
            })
            .catch(err => log("generating-fail", { source: "tivu", channel: channel.id, day: `${startDate} 00:00:00 - ${endDate} 00:00:00`, error: err }));
        log("spacer", { width: 93 });
    };

    return epg;
};