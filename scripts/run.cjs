async function main() {
  const waveContractFactory = await hre.ethers.getContractFactory("Waver");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Contract address:", waveContract.address);

  let count = await waveContract.getTotalWaves();
  console.log(count.toNumber());

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  count = await waveContract.getTotalWaves();
  console.log(count.toNumber());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
