const { network } = require("hardhat")

const BASE_FEE = "250000000000000000" // 0.25 is the premium / coordinator flat fee. It cost 0.25 link per request
const GAS_PRICE_LINK = 1e9 // link per gas.calculated value based on the gas price of the chain

// Eth price sky rocketed up to $ 1e9 dollars
// Chainlink nodes pay the gas fees to give us randomness and do execution
// So the price of requests change based on the price of gas

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("local network detected! Deploying mocks...")
        // deply a mock vrfCoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        })

        log("Mocks Deployed!!")
        log("===================================")
    }
}

module.exports.tags = ["all", "mocks"]
