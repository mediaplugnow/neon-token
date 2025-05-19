require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// DEBUG: Log the private key to confirm it's loaded (masking most of it for safety)
const privateKey = process.env.PRIVATE_KEY_OWNER;
if (!privateKey) {
  console.error("❌ PRIVATE_KEY_OWNER is not defined in .env file");
  process.exit(1);
}
console.log("✅ PRIVATE_KEY_OWNER loaded:", privateKey.slice(0, 6) + "...");

// Export the Hardhat configuration
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.8.28" }
    ]
  },
  networks: {
    neondevnet: {
      url: "https://devnet.neonevm.org",
      chainId: 245022926,
      accounts: [process.env.PRIVATE_KEY_OWNER],
    },
  },
};

