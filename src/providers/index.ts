import { configureChains } from "../utils";
import allChains from '../constants/chains'
import { alchemyProvider } from "./alchemyProvider";
import { infuraProvider } from "./infuraProvider";
import { publicProvider } from "./publicProvider";

const { ALCHEMY_API_KEY, INFURA_API_KEY } = process.env;

const { chains, getProvider } = configureChains(allChains, [
    alchemyProvider({
        apiKey: ALCHEMY_API_KEY
    }),
    infuraProvider({ apiKey: INFURA_API_KEY }),
    publicProvider(),
]);

export { chains, getProvider };