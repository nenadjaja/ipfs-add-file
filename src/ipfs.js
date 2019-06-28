import ipfsClient from 'ipfs-http-client'

const ipfs = new ipfsClient('localhost', '5001', { protocol: 'http' })

export default ipfs
