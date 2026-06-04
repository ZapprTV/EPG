import tdbnet from "../../../../sources/it/tdbnet";
import uvotv from "../../../../sources/it/uvotv";
import blue from "../../../../sources/it/blue";
import videomedia from "../../../../sources/it/videomedia";
import softwarecreation from "../../../../sources/it/softwarecreation";
import oggiintv from "../../../../sources/it/oggiintv";
import publirose from "../../../../sources/it/publirose";

export default {
    tdbnet: { fetch: tdbnet, channels: ["A3", "RV", "TNE"] },
    uvotv: { fetch: uvotv, channels: ["Telepadova - 7 GOLD_it", "TELECOLOR.tvprofil_it"] },
    blue: { fetch: blue, channels: [2057] },
    videomedia: { fetch: videomedia, channels: ["C", "E"] },
    softwarecreation: { fetch: softwarecreation, channels: ["GoldTv", "LazioTv"] },
    oggiintv: { fetch: oggiintv, channels: ["Telepace"] },
    publirose: { fetch: publirose, channels: ["telereporter"] }
};