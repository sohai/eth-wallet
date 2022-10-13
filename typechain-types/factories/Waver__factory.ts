/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Waver, WaverInterface } from "../Waver";

const _abi = [
  {
    inputs: [],
    name: "getTotalWaves",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061036b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636fe15b441461003b5780639a2cdc0814610045575b600080fd5b610043610063565b005b61004d6100bb565b60405161005a91906101a2565b60405180910390f35b600080815480929190610075906101ec565b91905055506100b96040518060400160405280600781526020017f2520776176656400000000000000000000000000000000000000000000000000815250336100c4565b565b60008054905090565b61015c82826040516024016100da929190610305565b6040516020818303038152906040527f319af333000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610160565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000819050919050565b61019c81610189565b82525050565b60006020820190506101b76000830184610193565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101f782610189565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610229576102286101bd565b5b600182019050919050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561026e578082015181840152602081019050610253565b60008484015250505050565b6000601f19601f8301169050919050565b600061029682610234565b6102a0818561023f565b93506102b0818560208601610250565b6102b98161027a565b840191505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102ef826102c4565b9050919050565b6102ff816102e4565b82525050565b6000604082019050818103600083015261031f818561028b565b905061032e60208301846102f6565b939250505056fea2646970667358221220b68018f6a3cb06867c569b24c1771b161a889dd5285c2a157ea198e1a1bfbb5564736f6c63430008110033";

type WaverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WaverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Waver__factory extends ContractFactory {
  constructor(...args: WaverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Waver> {
    return super.deploy(overrides || {}) as Promise<Waver>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Waver {
    return super.attach(address) as Waver;
  }
  override connect(signer: Signer): Waver__factory {
    return super.connect(signer) as Waver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WaverInterface {
    return new utils.Interface(_abi) as WaverInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Waver {
    return new Contract(address, _abi, signerOrProvider) as Waver;
  }
}