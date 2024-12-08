export const migrationABI = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "migrate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [],
		name: "newToken",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "oldToken",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
] as const
