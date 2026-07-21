import digitalbitrate from "../../../../sources/it/digitalbitrate";
import blue from "../../../../sources/blue";
import lacplay from "../../../../sources/it/lacplay";
import uvotv from "../../../../sources/it/uvotv";
import publirose from "../../../../sources/it/publirose";

export default {
    digitalbitrate: { fetch: digitalbitrate, channels: ["tlu/TLU_CH21_1008", "tro/TRO_CH27_6803", "tlu/TLU_CH21_1004"] },
    blue: { fetch: blue, channels: [2057, 1667] },
    lacplay: { fetch: lacplay, channels: ["lac-tv"] },
    uvotv: { fetch: uvotv, channels: ["RTTR_it", "Telemolise.tvprofil_it", "Primantenna_it", "Radio BRUNO.tvprofile_it"] },
    publirose: { fetch: publirose, channels: ["telereporter"] }
};