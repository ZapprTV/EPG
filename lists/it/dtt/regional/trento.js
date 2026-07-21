import uvotv from "../../../../sources/it/uvotv";
import blue from "../../../../sources/blue";
import tdbnet from "../../../../sources/it/tdbnet";
import tv33 from "../../../../sources/it/tv33";
import ètv from "../../../../sources/it/ètv";
import softwarecreation from "../../../../sources/it/softwarecreation";
import videomedia from "../../../../sources/it/videomedia";

export default {
    uvotv: { fetch: uvotv, channels: ["TRENTINO_it", "Radio BRUNO.tvprofile_it", "RTTR_it", "Telepace Trento.tvprofil_it", "Telepadova - 7 GOLD_it", "eTV Rete 7.tvprofil_it", "TELECOLOR.tvprofil_it"] },
    blue: { fetch: blue, channels: [2057, 303, 302, 1222] },
    tdbnet: { fetch: tdbnet, channels: ["A3"] },
    tv33: { fetch: tv33, channels: ["trentino", "alto-adige"] },
    ètv: { fetch: ètv, channels: ["Palinsesto_Marche"] },
    softwarecreation: { fetch: softwarecreation, channels: ["GoldTv", "LazioTv"] },
    videomedia: { fetch: videomedia, channels: ["C", "E"] }
};