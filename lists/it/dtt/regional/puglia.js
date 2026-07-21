import norba from "../../../../sources/it/norba";
import blue from "../../../../sources/blue";
import sky from "../../../../sources/it/sky";
import uvotv from "../../../../sources/it/uvotv";
import digitalbitrate from "../../../../sources/it/digitalbitrate";
import oggiintv from "../../../../sources/it/oggiintv";

export default {
    norba: { fetch: norba, channels: [11313512, 13292552] },
    blue: { fetch: blue, channels: [1499] },
    sky: { fetch: sky, channels: [9013] },
    uvotv: { fetch: uvotv, channels: ["Icaro TV_it", "TELERADIOPACE 1_it", "Tele Dehon_it"] },
    digitalbitrate: { fetch: digitalbitrate, channels: ["tni/TNI_RAI-1B_1"] },
    oggiintv: { fetch: oggiintv, channels: ["Telepace"] }
};