import React, { Component } from 'react'

class InstructionList extends Component {
    render() {
        return(
            <div className="instructions">
                <h2 className="instruction-header">Instructions:</h2>
                <ol className="instruction-list">
                    <li>Steps listed here...</li>
                </ol>
            </div>
        )
    }
}

export default InstructionList