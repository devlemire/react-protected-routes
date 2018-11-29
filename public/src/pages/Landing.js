import React from 'react'
import { connect } from 'react-redux'

class Landing extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <section id="Landing-section">
        <h1>I am Landing</h1>
        <button>Login</button>
      </section>
    )
  }
}

export default connect(
  state => state,
  {}
)(Landing)
