const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const OpenInScratchComponent = require('../components/open-in-scratch/open-in-scratch.jsx');
const Blocks = require('./blocks.jsx');
const date = new Date();

class OpenInScratch extends React.Component {
    constructor (props) {
        const {
            editorType,
            updateToDefaultToolbox,
            returnToMicroworld,
            blocks,
            vm,
            ...componentProps
        } = props;
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        if (this.props.editorType >=3) {
            this.props.returnToMicroworld()
        } else {
            this.props.updateToDefaultToolbox();
        }
    }
    render () {
        const {
            updateToDefaultToolbox,
            returnToMicroworld,
            editorType,
            vm, // eslint-disable-line no-unused-vars
            blocks, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        title = (this.props.editorType) ? (this.props.editorType >= 3 ? "Return to Microworld" : "Open in Scratch") : "";
        return (
            <OpenInScratchComponent
                onClick={this.handleClick}
                title={title}
                {...props}
            />
        );
    }
}

OpenInScratch.propTypes = {
    vm: React.PropTypes.instanceOf(VM),
    blocks: React.PropTypes.string,
    editorType: React.PropTypes.number
};

module.exports = OpenInScratch;
