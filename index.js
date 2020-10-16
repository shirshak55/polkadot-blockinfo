let { ApiPromise, WsProvider } = require("@polkadot/api")
let inquirer = require("inquirer")

//
// Written by Shirshak
//
// Usage.
// $ node index.js
// Select the network

// Example
// ➜  polkadot_api_usage node index.js
// ? Network to use Kusama
// Block Info
//  {"block":{"header":{"parentHash":"0x37ce1f154fd90b73d01849b857ce41031971c275d712cff9e8e45648f3f2d6b0","number":4504517,"stateRoot":"0xd12899a807f0e97f617099f7f258a29065f09e3114e0ac1414acbefbb4a335b6","extrinsicsRoot":"0x8f54a6f34803abd656709fcda68622e64244908115856d1ac465960b0603f324","digest":{"logs":[{"PreRuntime":[1161969986,"0x02c10100008755ec0f00000000"]},{"Seal":[1161969986,"0x9254c544f59bbae8d263147cbc5e12e82487652968d39d8485d8eddeb4838b576fe8099dcc78920368cf22d643b08bc0b43df9f379f6b8d316d29ce33d9c0a8b"]}]}},"extrinsics":["0x280402000b108c14337501","0x1c0409000aef1201"]},"justification":"0x"}

async function main() {
  let questions = await inquirer.prompt([
    {
      type: "list",
      name: "network",
      message: "Network to use",
      choices: ["Polkadot", "Kusama"],
      default: "Polkadot",
    },
    {
      type: "input",
      name: "network",
      message: "Block number",
      default: "0",
    },
  ])

  let api = null

  if (questions.network === "Polkadot") {
    let polkadot_api = "wss://rpc.polkadot.io"

    let provider = new WsProvider(polkadot_api)
    api = await ApiPromise.create({ provider })
  }

  if (questions.network === "Kusama") {
    let kusama_api = "wss://kusama-rpc.polkadot.io"
    let provider = new WsProvider(kusama_api)
    api = await ApiPromise.create({ provider })
  }

  if (api === null) {
    throw "Select proper network"
  }

  let header = await api.rpc.chain.getBlock()
  console.log(`Block Info \n ${header}`)
}

main().catch((e) => {
  console.log("Error", e)
})
