import { configureChains } from "../utils";
import allChains from '../constants/chains'
import { alchemyProvider } from "./alchemyProvider";
import { infuraProvider } from "./infuraProvider";
import { publicProvider } from "./publicProvider";

const { chains, getProvider } = configureChains(allChains, [
    alchemyProvider({ apiKey: "oaw7VHmDacdOW2MZpvdEld9qgvG4geP4" }),
    infuraProvider({ apiKey: "ff765d441a2649ff841f53544a479eba" }),
    publicProvider(),
]);

export { chains, getProvider };