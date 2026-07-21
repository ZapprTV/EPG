import { DateTime } from "luxon";
import log from "../utils/logger";
import { parseHTML } from "linkedom";

export default async function fetchEPG(channels) {
    let epg = {};

    await fetch(`https://raw.githubusercontent.com/matthuisman/i.mjh.nz/refs/heads/master/SamsungTVPlus/${channels[0]}.xml`)
        .then(response => response.text())
        .then(text => {
            const { document } = parseHTML(text);
            channels = [...new Set(Array.from(document.querySelectorAll("programme")).map(el => el.getAttribute("channel")))];
            
            for (const channel in channels) {
                epg[channels[channel]] = [];
                log("generating", { source: "samsungtvplus", channel: channels[channel], day: "N/A" });
                epg[channels[channel]] = [...epg[channels[channel]], ...Array.from(document.querySelectorAll(`programme[channel="${channels[channel]}"]`)).map(entry => {
                    const startTime = DateTime.fromFormat(entry.getAttribute("start"), "yyyyMMddHHmmss +0000").setZone("Europe/Rome");
                    const endTime = DateTime.fromFormat(entry.getAttribute("stop"), "yyyyMMddHHmmss +0000").setZone("Europe/Rome");
                    
                    let result = {
                        name: entry.querySelector("title").textContent.trim(),
                        startTime: {
                            unix: startTime.ts,
                            iso: startTime.toISO()
                        },
                        endTime: {
                            unix: endTime.ts,
                            iso: endTime.toISO()
                        }
                    };
                    if (entry.querySelector("sub-title") && entry.querySelector("sub-title").textContent && entry.querySelector("sub-title").textContent.trim()) result.subtitle = entry.querySelector("sub-title").textContent.trim();
                    if (entry.querySelector("desc") && entry.querySelector("desc").textContent && entry.querySelector("desc").textContent.trim()) result.description = entry.querySelector("desc").textContent.trim();
                    if (entry.querySelector("icon") && entry.querySelector("icon").getAttribute("src") && entry.querySelector("icon").getAttribute("src").trim()) result.image = entry.querySelector("icon").getAttribute("src").trim();

                    return result;
                })];
                log("generating-done", { source: "samsungtvplus", channel: channels[channel], day: "N/A" });
            };
        })
        .catch(err => log("generating-fail", { source: "samsungtvplus", channel: "N/A", day: "N/A", error: err }));

    log("spacer", { width: 70 });

    return epg;
};