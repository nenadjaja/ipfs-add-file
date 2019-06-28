import web3 from './web3'
import abi from './domain/contractABI'

const address = '0x24c1ca93cdce83a3311f68d079d5dac5b46accb2'
export default web3.eth.Contract(abi, address)
