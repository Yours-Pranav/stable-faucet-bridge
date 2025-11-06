// Helper function to convert Ethereum address to 32-byte format
export function addrTo32Bytes(addr: string): Buffer {
  const hex20 = ethers.utils.getAddress(addr).slice(2);
  const padded = hex20.padStart(64, "0");
  return Buffer.from(padded, "hex");
}

async function main() {
  const [owner] = await ethers.getSigners();

  // Contract addresses - DO NOT EDIT THESE
  const SEPOLIA_USDT0 = "0xc4DCC311c028e341fd8602D8eB89c5de94625927";
  const SEPOLIA_USDT0_OAPP = "0xc099cD946d5efCC35A99D64E808c1430cEf08126"
  const RECEIVER_EID = 40374; // Stable testnet endpoint ID

  // Approve USDT spending - DO NOT EDIT
  const usdt0 = await ethers.getContractAt("ERC20", SEPOLIA_USDT0);
  await usdt0.approve(SEPOLIA_USDT0_OAPP, ethers.utils.parseEther("1"));

  // LayerZero options - DO NOT EDIT
  const options = Options.newOptions().addExecutorLzReceiveOption(0, 0).toBytes();
  
  // ⚠️ EDIT THIS: Change "1" to the amount of USDT you want to bridge
  // Example: ethers.utils.parseEther("10") for 10 USDT
  const amount = ethers.utils.parseEther("1");
  
  const OFTAdapter = await ethers.getContractAt("OFTAdapter", SEPOLIA_USDT0_OAPP);

  const sendParams = {
    dstEid: RECEIVER_EID,
    // ⚠️ EDIT THIS: Replace owner.address with your Stable wallet address
    // Example: to: addrTo32Bytes("0xYourStableWalletAddressHere"),
    to: addrTo32Bytes(owner.address),
    amountLD: amount,
    minAmountLD: amount,
    extraOptions: options,
    composeMsg: Buffer.from(""),
    oftCmd: Buffer.from(""),
  };
  
  const fee = await OFTAdapter.quoteSend(sendParams, false);
  await OFTAdapter.send(
    sendParams,
    fee,
    owner.address,
    {
      value: fee.nativeFee,
    }
  )
}
