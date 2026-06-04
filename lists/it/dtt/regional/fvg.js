import tdbnet from "../../../../sources/it/tdbnet";
import uvotv from "../../../../sources/it/uvotv";
import videomedia from "../../../../sources/it/videomedia";
import softwarecreation from "../../../../sources/it/softwarecreation";

export default {
    tdbnet: { fetch: tdbnet, channels: ["T4", "TV12", "A3", "TNE"] },
    uvotv: { fetch: uvotv, channels: ["Telepadova - 7 GOLD_it", "TELECOLOR.tvprofil_it"] },
    videomedia: { fetch: videomedia, channels: ["C", "E"] },
    softwarecreation: { fetch: softwarecreation, channels: ["GoldTv", "LazioTv"] }
};