import React, {Component} from 'react'
import client from 'soundoftext-js'
import Select from 'react-select'
import {langData} from '../../../Config/translateLang'

class AudioWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ttslang: '',
      ttsText: ''
    }
  }

  getSoundUrl = () => {
    client.sounds.create({text: this.state.ttsText, voice: this.state.ttslang})
      .then(soundUrl => {
        this.props.insertTTSAudio(soundUrl)
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <div>
        <input placeholder={"text"}
          onChange = {(e) => this.setState({ttsText: e.target.value})}
        />
        <Select onChange = {(e) => this.setState({ttslang: e.value})}
          options = {langData}
        />
        <button onClick={() => this.getSoundUrl()}>
          Insert Audio
        </button>
      </div>
    );
  }
}

export default AudioWorker
