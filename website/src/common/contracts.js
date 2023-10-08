export const abis = {
  register: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "forEvent",
          type: "address",
        },
      ],
      name: "Dropped",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "forEvent",
          type: "address",
        },
      ],
      name: "Registered",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "event_",
          type: "address",
        },
      ],
      name: "drop",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "event_",
          type: "address",
        },
      ],
      name: "registerFor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "registry",
          type: "address",
        },
        {
          internalType: "address",
          name: "executor",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
};

export const addresses = {
  register: "0x3E0367E7c7456eB5902802568edE91C140312088",
};

/*
const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, address);
  useEffect(() => {
    const data = "0x1234567890";
    contract.methods
      .propagate(data)
      .send({
        from: account,
      })
      .then((res) => console.log(res));
  }, []);
  */
