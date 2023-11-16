import { ethers } from 'ethers';
import {
  MyToken__factory,
  TokenizedBallot,
  TokenizedBallot__factory,
} from '../typechain-types';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ENDPOINT_URL ?? ''
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);

  // todo: address of deployed tonkenized ballot contract
  const tokenizedBallotContractAddress =
    '0x94c8383F5CC86889D57873410ADf1D92fD04546A';
  const tokenizedBallotFactory = new TokenizedBallot__factory(wallet);
  const tokenizedBallotContract = tokenizedBallotFactory.attach(
    tokenizedBallotContractAddress
  ) as TokenizedBallot;

  const winningProposal = await tokenizedBallotContract.winningProposal();

  console.log(`The winning proposal is ${winningProposal}!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
