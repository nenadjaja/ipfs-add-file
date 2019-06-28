import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css'
import web3 from './web3'
import contract from './contract'
import ipfs from './ipfs'

class App extends Component {
  state = {
    ipfsHash: null,
    buffer: '',
    ethAddress: '',
    blockNumber: '',
    transactionHash: '',
    gasUsed: '',
    txReceipt: ''
  }

  handleFileUpload = async e => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result)
      this.setState({ buffer })
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    // get Metamask account
    const accounts = await web3.eth.getAccounts()
    console.log('Sending from metamask account: ', accounts[0])

    // get contract address
    const ethAddress = contract.options.address
    await this.setState({ ethAddress })

    //save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, async (err, res) => {
      if (err) console.error('Error saving doc to IPFS: ', err)
      if (res) {
        console.log('IPFS response: ', res)
        await this.setState({ ipfsHash: res[0].hash })
      }
    })

    // send IPFS hash to ethereum contract
    setTimeout(() => {
      contract.methods.sendHash(this.state.ipfsHash).send(
        {
          from: accounts[0]
        },
        (err, transactionHash) => {
          if (err) console.error('Error sending IPFS hash to contract: ', err)
          if (transactionHash) {
            console.log('transactionHash: ', transactionHash)
            this.setState({ transactionHash })
          }
        }
      )
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Upload files to IPFS</p>
          <Form onSubmit={this.handleSubmit}>
            <input type="file" onChange={this.handleFileUpload} />
            <Button variant="primary" type="submit">
              Send file
            </Button>
          </Form>
        </header>
      </div>
    )
  }
}

export default App
