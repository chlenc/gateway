const tx  = {
  "senderPublicKey": "FBKnPqkZVMc23HvTe7NPkjzuxKi6tN9FPCgMVJRCEVUZ",
  "fee": 5000000,
  "type": 16,
  "version": 1,
  "call": {
    "function": "buyBack",
    "args": []
  },
  "trace": [
    {
      "dApp": "3FjvHCTfkkkEhBoVzDD7N6s6YuyC7gmVVnw",
      "function": "buyBack",
      "args": [],
      "result": {
        "data": [
          {
            "key": "start_of_3Fa9yiFToNbD953d4jE1Zj5ZAgGzJra5sb4",
            "value": "0"
          },
          {
            "key": "end_of_freeze_of_3Fa9yiFToNbD953d4jE1Zj5ZAgGzJra5sb4",
            "value": "0"
          },
          {
            "key": "rate_of_3Fa9yiFToNbD953d4jE1Zj5ZAgGzJra5sb4",
            "value": "0"
          },
          {
            "key": "deposit_of_3Fa9yiFToNbD953d4jE1Zj5ZAgGzJra5sb4",
            "value": "0"
          },
          {
            "key": "lend_of_3Fa9yiFToNbD953d4jE1Zj5ZAgGzJra5sb4",
            "value": "0"
          }
        ],
        "transfers": [
          {
            "address": "3Fa9yiFToNbD953d4jE1Zj5ZAgGzJra5sb4",
            "amount": 1000000000,
            "assetId": null
          },
          {
            "address": "3FhR61vPGAdJauyEUmHpS6rHBcsV6HmQYeo",
            "amount": 0,
            "assetId": null
          }
        ]
      }
    }
  ],
  "dApp": "3FjvHCTfkkkEhBoVzDD7N6s6YuyC7gmVVnw",
  "sender": "3Fa9yiFToNbD953d4jE1Zj5ZAgGzJra5sb4",
  "feeAssetId": null,
  "proofs": [
    "2ER662e6tNAZ4bks6AVdbjBNYimyRWtTvYDVcivRXKXtvKKxo1YmuJdAtdiuFC88iNktMqZjY6M1gQrDAHoV4n4A"
  ],
  "payment": [
    {
      "amount": 100000,
      "assetId": "7LZvLr9A1e4YJCZJMGEGpFu9ZoHfuJ9iNj9iqXqXd93r"
    }
  ],
  "id": "GSUeeV5z5PMXscyVvRHUout59gnT9Hu7UHKjDXop9mpn",
  "timestamp": 1559824380839
}

console.log(tx.trace.length)
console.log( tx.trace[tx.trace.length - 1].result.data)
