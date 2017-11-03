const DutchExchange = artifacts.require('./DutchExchange.sol')
const DutchExchangeFactory = artifacts.require('./DutchExchangeFactory.sol')
const Token = artifacts.require('./Token.sol')

const fs = require('fs')

const code2tokenMap = {
  ETH: 'ETHER',
  GNO: 'GNOSIS',
  REP: 'AUGUR',
  '1ST': 'FIRST BLOOD',
  OMG: 'OMISEGO',
  GNT: 'GOLEM',
}

const codeList = Object.keys(code2tokenMap)

module.exports = async function f(deployer) {
  deployer.deploy(DutchExchange)
  deployer.deploy(DutchExchangeFactory)
  deployer.deploy(Token, {})

  // console.log('New token at', (await Token.new()).address)
  // console.log('New token at', (await Token.new()).address)
  // console.log('New token at', (await Token.new()).address)x

  // deploy Token contracts to testrpc
  const promisedTokens = Array.from({ length: codeList.length }, () => Token.new())
  // wait for the transactions
  const tokenContracts = await Promise.all(promisedTokens)

  /**
   * each token gets assigned an arbitrary address
   * {
   *  ETH: '0xfds65sd767sfd6',
   *  GNO: '0xy34r34ytrg3u4r',
   *  ...
   * }
   */
  const code2AddresstMap = tokenContracts.reduce((acc, { address }, i) => {
    acc[codeList[i]] = address
    return acc
  }, {})

  // write to file to later be imported in App
  fs.writeFile('./build/code2Address.json', JSON.stringify(code2AddresstMap, null, '\n'), (err) => {
    if (err) console.error(err)
    console.log('Token addresses written to build/code2Address.json')
  })
}
