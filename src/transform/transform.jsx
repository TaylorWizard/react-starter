import React from 'react'
import ReactDOM from 'react-dom'
import InputRangeComponent from '../input-range-component/index'
import './style.scss'

export default class Transform extends React.Component {
  constructor() {
    super()
    this.state = {
      scaleX: 1,
      scaleY: 1,
      rotateAngle: 0,
      skewAngle: 0
    }
  }

  changeScale(scale, scaleType) {
    scaleType === 'X' ? this.setState({scaleX: scale}) : this.setState({scaleY: scale})
    this.refs.cubeOne.style.transform = `scale(${this.state.scaleX}, ${this.state.scaleY})`
  }

  changeRotate(rotate) {
    this.setState({rotateAngle: rotate})
    this.refs.cubeOne.style.transform = `rotate(${this.state.rotateAngle}deg)`
  }

  changeSkew(angle) {
    this.setState({skewAngle: angle})
    this.refs.cubeOne.style.transform = `skew(${this.state.skewAngle})`
  }

  render() {
    let range = {'min': '-100', 'max': '100', 'step': '10'}
    return (
      <div>
        <div className="transform">
          <span ref="cubeOne" className="cube cube-1"></span>
          {/*<span className="cube cube-2">cube-2</span>*/}
        </div>
        {/*transformType is the type of transform for call corresponding change function in 'input range component'*/}
        {/*scaleType is the type of transform scale , like scaleX or scaleY*/}
        {/*rotateType is the type of transform rotate , like rotateX or rotateY*/}
        <InputRangeComponent
          transformType='scale'
          scaleType='X'
          handleRangeChange={this.changeScale.bind(this)}/>
        <InputRangeComponent
          transformType='scale'
          scaleType='Y'
          handleRangeChange={this.changeScale.bind(this)}/>
        <InputRangeComponent
          range={range}
          transformType='rotate'
          rotateType='X'
          handleRotateChange={this.changeRotate.bind(this)}/>
      </div>
    )
  }
}