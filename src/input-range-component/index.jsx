import React from 'react'
import ReactDOM from 'react-dom'

export default class InpuRangeComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      inputRangeValue: 0,
      scaleType: '',
    }
  }

  componentWillMount() {
    if (this.props.transformType === 'scale') {
      this.setState({
        scaleType: this.props.scaleType
      })
    }
  }

  componentDidMount() {
    // const el = ReactDOM.findDOMNode(this)
    if (this.props.transformType === 'rotate') {
      this.refs.cubeRange.min = this.props.range.min
      this.refs.cubeRange.max = this.props.range.max
      this.refs.cubeRange.step = this.props.range.step
    }
    this.refs.cubeRange.addEventListener('change', function (event) {
      this.setState({
        inputRangeValue: event.target.value
      })
      if (this.props.transformType === 'scale') {
        this.props.handleRangeChange(event.target.value, this.state.scaleType)
      } else {
        this.props.handleRotateChange(event.target.value)
      }
    }.bind(this))
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        {this.props.transformType === 'scale' ? this.state.scaleType : 'rotate'}
        <input
          className="cube-range"
          ref="cubeRange"
          id="cube-range"
          type="range"
          min="1"
          max="3"
          step="0.1"
          defaultValue="1"/>
      </div>
    )
  }
}