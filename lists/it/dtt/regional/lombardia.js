import blue from "../../../../sources/blue";
import digitalbitrate from "../../../../sources/it/digitalbitrate";
import uvotv from "../../../../sources/it/uvotv";
import tv33 from "../../../../sources/it/tv33";
import ètv from "../../../../sources/it/ètv";
import softwarecreation from "../../../../sources/it/softwarecreation";
import cr1 from "../../../../sources/it/cr1";
import publirose from "../../../../sources/it/publirose";

export default {
    blue: { fetch: blue, channels: [592, 1380, 1667, 1645, 593, 2113] },
    digitalbitrate: { fetch: digitalbitrate, channels: ["tlu/TLU_CH22_2003", "tlu/TLU_CH22_2005", "tlu/TLU_CH34_31", "tlu/TLU_CH34_30", "tlu/TLU_CH22_2014"] },
    uvotv: { fetch: uvotv, channels: ["TELECOLOR.tvprofil_it", "eTV Rete 7.tvprofil_it", "Radio BRUNO.tvprofile_it"] },
    tv33: { fetch: tv33, channels: ["alto-adige"] },
    ètv: { fetch: ètv, channels: ["Palinsesto_Marche"] },
    softwarecreation: { fetch: softwarecreation, channels: ["GoldTv", "LazioTv"] },
    cr1: { fetch: cr1, channels: ["cr1"] },
    publirose: { fetch: publirose, channels: ["telereporter"] }
};