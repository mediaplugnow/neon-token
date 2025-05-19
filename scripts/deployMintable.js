const { ethers } = require("hardhat");

async function main() {
  // ✅ Correct factory address with checksum
  const FACTORY_ADDRESS = "0xfc292e12e2dfe2763cbc5f0cf5ddfa44c0c7af08";

  // ✅ ABI for the factory contract
  const factoryABI = [
    "function createERC20ForSplMintable(string name, string symbol, uint8 decimals, address mintAuthority) external returns (address)"
  ];

  // ✅ Get signer (your wallet)
  const [deployer] = await ethers.getSigners();
  console.log("✅ Deployer Address:", deployer.address);

  // ✅ Attach to the factory contract
  const factory = new ethers.Contract(FACTORY_ADDRESS, factoryABI, deployer);
  console.log("✅ Factory attached at:", factory.address);

  // ✅ Create token with unique name
  const name = "devBOOTCAMP TOKEN " + Date.now().toString();
  const symbol = "DBT";
  const decimals = 9;
  const mintAuthority = deployer.address;

  console.log("🚀 Creating token with parameters:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Decimals:", decimals);
  console.log("   Mint Authority:", mintAuthority);

  try {
    const tx = await factory.createERC20ForSplMintable(name, symbol, decimals, mintAuthority);
    console.log("📤 Transaction sent. Hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("✅ Token deployed!");
    console.log("📜 Receipt:", receipt);
  } catch (error) {
    console.error("❌ Deployment failed:");
    console.error(error);
  }
}

// Run the script
main().catch((err) => {
  console.error("❌ Script error:", err);
  process.exitCode = 1;
});
