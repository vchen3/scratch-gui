const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const SaveComponent = require('../components/save/save.jsx');
const Blocks = require('./blocks.jsx');

const autoSaveIntervalSec = 0;

class Save extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'saveToFile',
            'toggleAutoSave'
        ]);
    }
    handleClick (e) {
        e.preventDefault();
        this.saveToFile(false);
    }
    saveToFile(isAutoSave = true) {
        var projectJson = this.props.vm.saveProjectSb3();

        var project = JSON.parse(projectJson);

        // Write palette blocks to JSON
        if (this.props.blocks) {
            var blocksString = this.props.blocks.replace(/\"/g, "\\\"");
            // Not using JSON strinfigy to prevent escaping issues.
            projectJson = projectJson.slice(0, -1) + ", \"blocksPalette\" : \"" + blocksString + "\"}"
        }

        if (this.props.editorType) {
            projectJson = projectJson.slice(0, -1) + ", \"editorType\" : \""+ this.props.editorType + "\"}"
        }

        // Write names of UNIQUE blocks that are in the workspace for each target (stage or sprite)
        var workspaceBlocksStr = new Set();
        for (i in project.targets) {
            var target = project.targets[i]
            if (target.blocks && Object.keys(target.blocks).length > 0) {
                var workspaceBlocks = target.blocks;
                for(var key in workspaceBlocks) {
                    var block = workspaceBlocks[key];
                    workspaceBlocksStr.add(block.opcode);
                }
            }
        }
        if (workspaceBlocksStr.size > 0) {
            projectJson = projectJson.slice(0, -1) + ", \"workspaceBlocks\": [" ;
            for (let command of workspaceBlocksStr) {
                projectJson += "\"" + command +"\", ";
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
        var date = new Date();
        var filenameinit = isAutoSave ? "auto-" : "project-";
        saveLink.download = filenameinit + date.toLocaleDateString() +
                            "-"+ date.toLocaleTimeString() +".json";
        saveLink.click();
        window.URL.revokeObjectURL(url);

        document.body.removeChild(saveLink);
    }
    toggleAutoSave() {
        // Checked is true by deafault
        var checked = document.getElementById("autosaveCheckbox") ? 
            document.getElementById("autosaveCheckbox").checked : true;
        if (checked) {
            if (autoSaveIntervalSec && !this.saveIntervalId) {
                console.log("Starting auto save");
                this.saveIntervalId =setInterval(this.saveToFile, autoSaveIntervalSec*1000);
            }
        } else if (this.saveIntervalId) {
            console.log("Ending auto save");
            clearInterval(this.saveIntervalId);
            this.saveIntervalId = null;
        }
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            blocks, // eslint-disable-line no-unused-vars
            editorType,
            ...props
        } = this.props;
        this.toggleAutoSave();
        return (
            <SaveComponent
                onClick={this.handleClick}
                onChangeCheckbox={this.toggleAutoSave}
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
