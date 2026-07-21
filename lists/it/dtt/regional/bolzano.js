import uvotv from "../../../../sources/it/uvotv";
import videomedia from "../../../../sources/it/videomedia";
import blue from "../../../../sources/blue";
import tv33 from "../../../../sources/it/tv33";
import ètv from "../../../../sources/it/ètv";
import softwarecreation from "../../../../sources/it/softwarecreation";

export default {
    uvotv: { fetch: uvotv, channels: ["TRENTINO_it", "Radio BRUNO.tvprofile_it", "RTTR_it", "TELECOLOR.tvprofil_it", "eTV Rete 7.tvprofil_it"] },
    videomedia: { fetch: videomedia, channels: ["C", "E"] },
    blue: { fetch: blue, channels: [381, 25, 55, 205, 256, 286, 342, 1502, 414, 654, 147, 28, 228, 6, 26, 417, 307, 142, 656, 659, 658, 303, 302, 1222, 399, 401, 369, 367, 356, 357] },
    tv33: { fetch: tv33, channels: ["trentino", "alto-adige"] },
    ètv: { fetch: ètv, channels: ["Palinsesto_Marche"] },
    softwarecreation: { fetch: softwarecreation, channels: ["GoldTv", "LazioTv"] }
};