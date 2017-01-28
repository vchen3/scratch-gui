const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const SaveComponent = require('../components/save/save.jsx');

class Save extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        // TODO(morant): Actually save a project. For now, just outputs it
        // to console log.
        var projectJson = this.props.vm.saveProjectSb3();
        console.log("Can't save projects yet, but here's the JSON for it:");
        console.log(projectJson);
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <SaveComponent
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

Save.propTypes = {
    vm: React.PropTypes.instanceOf(VM)
};

module.exports = Save;
