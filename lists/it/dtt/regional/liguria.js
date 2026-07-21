import oggiintv from "../../../../sources/it/oggiintv";
import uvotv from "../../../../sources/it/uvotv";
import digitalbitrate from "../../../../sources/it/digitalbitrate";
import blue from "../../../../sources/blue";
import ètv from "../../../../sources/it/ètv";
import publirose from "../../../../sources/it/publirose";
import softwarecreation from "../../../../sources/it/softwarecreation";
import tv33 from "../../../../sources/it/tv33";
import lacplay from "../../../../sources/it/lacplay";

export default {
    oggiintv: { fetch: oggiintv, channels: ["Telepace"] },
    uvotv: { fetch: uvotv, channels: ["TELENORD_it", "TELERADIOPACE 1_it", "TELERADIOPACE 2_it", "Tele Dehon_it", "Icaro TV_it", "TELECITY_it", "eTV Rete 7.tvprofil_it", "RTTR_it", "Telemolise.tvprofil_it", "Primantenna_it", "RETE 7.tvprofil_it", "TELECOLOR.tvprofil_it"] },
    digitalbitrate: { fetch: digitalbitrate, channels: ["tlu/TLU_CH21_1008", "tro/TRO_CH27_6803", "tlu/TLU_CH21_1004"] },
    blue: { fetch: blue, channels: [2057] },
    ètv: { fetch: ètv, channels: ["Palinsesto_Marche"] },
    publirose: { fetch: publirose, channels: ["telereporter"] },
    softwarecreation: { fetch: softwarecreation, channels: ["GoldTv", "LazioTv"] },
    tv33: { fetch: tv33, channels: ["alto-adige"] },
    lacplay: { fetch: lacplay, channels: ["lac-tv"] }
};