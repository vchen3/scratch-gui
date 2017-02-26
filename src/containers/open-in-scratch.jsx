const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const OpenInScratchComponent = require('../components/open-in-scratch/open-in-scratch.jsx');
const Blocks = require('./blocks.jsx');
const date = new Date();

class OpenInScratch extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        this.props.updateToDefaultToolbox();
    }
    render () {
        const {
            updateToDefaultToolbox,
            vm, // eslint-disable-line no-unused-vars
            blocks, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <OpenInScratchComponent
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

OpenInScratch.propTypes = {
    vm: React.PropTypes.instanceOf(VM),
    blocks: React.PropTypes.string
};

module.exports = OpenInScratch;
