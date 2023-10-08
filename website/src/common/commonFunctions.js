export function beautifyWallet(address) {
  let pre = "";
  let post = "";
  for (let i = 0; i < address.length; i++) {
    if (i < 5) {
      pre += address[i];
    }
    if (i > address.length - 4) {
      post += address[i];
    }
  }
  return pre + "..." + post;
}
