import { DateTime } from "luxon";
import log from "../../utils/logger";

export default async function fetchEPG(channels) {
    let epg = {};
    channels.map(channel => epg[channel] = []);
    let lastEventID;

    for (const daysToAdd in [...Array(7).keys()]) {
        const startDate = DateTime.now().setZone("Europe/Rome").plus({ days: daysToAdd }).toFormat("yyyyMMdd");
        await fetch(`https://static-cdn.tv.sfr.net/data/epg/gen8/guide_web_${startDate}.json`)
            .then(response => response.json())
            .then(json => {
                Object.keys(json.epg).filter(channel => channels.includes(parseInt(channel))).map(channel => {
                    log("generating", { source: "sfr", channel: channel, day: startDate });
                    json.epg[channel].flatMap(entry => {
                        if (lastEventID != entry.id) {
                            lastEventID = entry.id;
                            const startTime = DateTime.fromMillis(entry.startDate, { zone: "Europe/Rome" });
                            const endTime = DateTime.fromMillis(entry.endDate, { zone: "Europe/Rome" });
                            
                            let result = {
                                name: entry.title,
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
                            if (entry.longSynopsis && entry.longSynopsis.trim()) result.description = entry.longSynopsis.trim();
                            if (entry.seasonNumber) result.season = entry.seasonNumber;
                            if (entry.episodeNumber) result.episode = entry.episodeNumber;
                            if (entry.images) {
                                if (entry.images.length === 1) result.image = entry.images[0].url;
                                else {
                                    if (entry.images.filter(image => image.type === "landscape" && image.withTitle === true).length > 0) result.image = entry.images.filter(image => image.type === "landscape" && image.withTitle === true)[0].url;
                                    else {
                                        if (entry.images.filter(image => image.type === "landscape").length > 0) result.image = entry.images.filter(image => image.type === "landscape")[0].url;
                                        else result.image = entry.images[0].url;
                                    };
                                };
                                result.image = result.image.replace("http://", "https://");
                            };

                            epg[channel].push(result);
                        };
                    });
                    log("generating-done", { source: "sfr", channel: channel, day: startDate });
                });
            })
            .catch(err => log("generating-fail", { source: "sfr", channel: "N/A", day: startDate, error: err }));
        log("spacer", { width: 93 });
    };

    return epg;
};