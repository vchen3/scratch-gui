const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const SaveComponent = require('../components/save/save.jsx');
const Blocks = require('./blocks.jsx');
const date = new Date();

class Save extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        var projectJson = this.props.vm.saveProjectSb3();

        var project = JSON.parse(projectJson);

        // Write palette blocks to JSON
        if (this.props.blocks) {
            var blocksString = this.props.blocks.replace(/\"/g, "\\\"");
            // Not using JSON strinfigy to prevent escaping issues.
            projectJson = projectJson.slice(0, -1) + ", \"blocksPalette\" : \"" + blocksString + "\"}"
        }

        // Write names of blocks that are in the workspace
        if (project.targets.length > 1 && project.targets[1].blocks && project.targets[1].blocks.length > 0) {
            projectJson = projectJson.slice(0, -1) + ", \"workspaceBlocks\": [";
            var workspaceBlocks = project.targets[1].blocks;
            for(var key in workspaceBlocks) {
                var block = workspaceBlocks[key];
                projectJson += "\"" + block.opcode +"\", ";
            }
            projectJson = projectJson.slice(0, -2) + "]}";
        }

        // Download project data into a file - create link element,
        // simulate click on it, and then remove it.
        var saveLink = document.createElement("a");
        document.body.appendChild(saveLink);

        var data = new Blob([projectJson], {type: 'text'});
        var url = window.URL.createObjectURL(data);
        saveLink.href = url;
        // File name: project-DATE-TIME
        saveLink.download = "project-" + date.toLocaleDateString() + 
                            "-"+ date.toLocaleTimeString() +".json";
        saveLink.click();
        window.URL.revokeObjectURL(url);

        document.body.removeChild(saveLink);
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            blocks, // eslint-disable-line no-unused-vars
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
    vm: React.PropTypes.instanceOf(VM),
    blocks: React.PropTypes.string
};

module.exports = Save;
