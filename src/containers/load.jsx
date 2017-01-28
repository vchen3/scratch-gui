const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const LoadComponent = require('../components/load/load.jsx');
const projectsLibraryContent = require('../lib/libraries/projects.json');

class Load extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        console.log("load project");
        this.props.vm.loadProject(JSON.stringify(projectsLibraryContent[this.props.project]));
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <LoadComponent
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

Load.propTypes = {
    vm: React.PropTypes.instanceOf(VM),
    project: React.PropTypes.string
};

module.exports = Load;
