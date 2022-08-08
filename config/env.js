import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT,
  sandboxKey: process.env.SANDBOX_PARTNER_PRIVATE_KEY,
  productionKey: process.env.PRODUCTION_PARTNER_PRIVATE_KEY,
  whitelistedContracts: process.env.WHITELISTED_CONTRACTS
};

export default env
