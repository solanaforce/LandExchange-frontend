import { parseEther } from "viem"

export const migrate = async (migrationContract, amount) => {
  return migrationContract.write.migrate([parseEther(amount)], {})
}