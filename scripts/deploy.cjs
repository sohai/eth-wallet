async function main() {
  const waveContractFactory = await ethers.getContractFactory("Waver");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Waver contract address", waveContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
