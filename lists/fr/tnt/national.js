import blue from "../../../sources/blue";
import sfr from "../../../sources/fr/sfr";
import samsungtvplus from "../../../sources/samsungtvplus";
import plutotv from "../../../sources/plutotv";

export default {
    blue: { fetch: blue, channels: [601, 182, 184, 185, 186, 249, 28, 653, 609, 295, 195, 43, 217, 241, 1064, 115, 2166, 2182, 199, 245, 9, 298, 353, 93] },
    sfr: { fetch: sfr, channels: [234] },
    samsungtvplus: { fetch: samsungtvplus, channels: ["fr"] },
    plutotv: { fetch: plutotv, channels: ["fr"] }
}