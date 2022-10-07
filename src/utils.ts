import { ethers } from "ethers";

export const verifyPrivateKey = (value: string) => {
    if (ethers.utils.isHexString(value)) {
        return true;
    } else {
        if (value.length === 64) {
            return ethers.utils.isHexString(`0x${value}`);
        }
        return false;
    }
};