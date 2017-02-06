const xhr = require('xhr');

const log = require('./log');

const Projects = require('./libraries/projects.json')

class ProjectLoader {
    constructor () {
        this.DEFAULT_PROJECT_DATA = ProjectLoader.DEFAULT_PROJECT_DATA;
    }
    load (id, callback) {
        callback = callback || (err => log.error(err));
        xhr({
            uri: `https://projects.scratch.mit.edu/internalapi/project/${id}/get/`
        }, (err, res, body) => {
            if (err) return callback(err);
            callback(null, body);
        });
    }
    loadFromProjectsFile(id) {
        if (isNaN(id)) {
            return JSON.stringify(Projects[id]);
        }
    }
    loadBlocksFromFile(id) {
        if (id && isNaN(id) && Projects[id]) {
            return Projects[id].blocksPalette;
        }
        return null;
    }
    loadEditorTypeFromFile(id) {
        if (id && isNaN(id) && Projects[id]) {
            return Projects[id].editorType;
        }
        return null;
    }
}

ProjectLoader.DEFAULT_PROJECT_DATA = require('./empty-project.json');

module.exports = new ProjectLoader();
