const bindAll = require('lodash.bindall');
const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const ReactGA = require('react-ga');
const {createStore, applyMiddleware} = require('redux');
const throttle = require('redux-throttle').default;

const GUI = require('./containers/gui.jsx');
const log = require('./lib/log');
const ProjectLoader = require('./lib/project-loader');
const reducer = require('./reducers/gui');

const styles = require('./index.css');

class App extends React.Component {
    constructor (props) {
        super(props);
        ReactGA.initialize('UA-92330139-1');
        bindAll(this, [
            'fetchProjectId',
            'updateProject',
            'updateToDefaultToolbox',
            'updateProjectFromLoadButton',
            'returnToMicroworld'
        ]);

        this.fileLoader = new FileReader();
        this.fileLoader.onload = this.fileLoaderOnLoad.bind(this);
        this.fileInputField = null;

        var projectId = this.fetchProjectId();

        this.state = {
            projectId: null,
            projectData: JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA),
            editorType: this.fetchEditorType(projectId),
            blocks: ProjectLoader.loadBlocksFromFile(projectId)
        };
    }
    componentDidMount () {
        window.addEventListener('hashchange', this.updateProject);

        var loader = document.getElementById("files");
        if (loader) {
            this.fileInputField = loader;
            this.fileInputField.addEventListener('change', this.updateProjectFromLoadButton, false);
        } else {
            console.log("no file loader");
        }

        this.updateProject();
    }
    componentWillUnmount () {
        window.removeEventListener('hashchange', this.updateProject);
        if (this.fileLoader) {
            this.fileLoader.removeEventListener('change', this.updateProjectFromLoadButton);
        }
    }
    fetchProjectId () {
        var hashString = window.location.hash.substring(1).split(',');
        console.log(hashString);
        for (var i=0; i < hashString.length; i++) {
            if (hashString[i].substring(0,2) != 'e=') {
                return hashString[i];
            }
        }
    }
    fetchEditorType (projectId) {
        var hashString = window.location.hash.substring(1).split(',');
        for (var i=0; i < hashString.length; i++) {
            if (hashString[i].substring(0,2) == 'e=') {
                return parseInt(hashString[i].substring(2));
            }
        }
        var fromFile = ProjectLoader.loadEditorTypeFromFile(projectId);
        return fromFile ? fromFile : 0;
    }
    updateProject () {
        ReactGA.pageview(window.location.pathname + window.location.hash);
        console.log('logged: ' + window.location.pathname + window.location.hash);
        const projectId = this.fetchProjectId();
        if (projectId !== this.state.projectId && projectId) {
            if (projectId.length < 1) {
                return this.setState({
                    projectId: projectId,
                    projectData: JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)
                });
            } else if (isNaN(projectId)) {
                var projectData = ProjectLoader.loadFromProjectsFile(projectId);
                var projectBlocks = ProjectLoader.loadBlocksFromFile(projectId);
                var editorType = ProjectLoader.loadEditorTypeFromFile(projectId);

                return this.setState({
                    projectId: projectId,
                    projectData: projectData ? projectData : JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA),
                    blocks: projectBlocks,
                    editorType: editorType,
                    lastMicroworldBlocks: (projectBlocks) ? projectBlocks : this.state.lastMicroworldBlocks,
                    lastMicroworldEditorType: (editorType) ? editorType : thiis.state.lastMicroworldEditorType
                })
            }
            ProjectLoader.load(projectId, (err, body) => {
                if (err) return log.error(err);
                this.setState({projectData: body});
            });
            this.setState({projectId: projectId});
        }
    }
    // Function for uploading from a local file.
    updateProjectFromLoadButton (e) {
        ReactGA.pageview(window.location.pathname + window.location.hash + "_load");
        console.log('logged: ' + window.location.pathname + window.location.hash + "_load");
        this.fileLoader.readAsText(e.target.files[0]);
    }
    fileLoaderOnLoad() {
      console.log("in onload");
      var projectAllData = this.fileLoader.result;
      var projectData = JSON.parse(projectAllData);
      if (!projectData) {
        return;
      }
      var projectBlocks = projectData.blocksPalette;
      var projectEditorType = parseInt(projectData.editorType);
      this.setState({projectId: this.fileLoader.name,
                     projectData: projectAllData ? projectAllData : JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA),
                    })
      if (projectBlocks && projectEditorType) {
        this.setState({blocks: projectBlocks,
                       editorType: projectEditorType,
                       lastMicroworldBlocks: projectBlocks,
                       lastMicroworldEditorType: projectEditorType
                      })
      }
    }
    updateToDefaultToolbox() {
        this.setState({
            blocks: "DEFAULT",
            editorType: 3
        })
    }
    returnToMicroworld() {
        this.setState({
            blocks: (this.state.lastMicroworldBlocks) ? this.state.lastMicroworldBlocks : this.state.blocks,
            editorType: (this.state.lastMicroworldEditorType) ? this.state.lastMicroworldEditorType : this.state.editorType
        })
    }
    render () {
        return (
            <GUI
                basePath={this.props.basePath}
                projectData={this.state.projectData}
                editorType={this.state.editorType}
                blocks={this.state.blocks}
                updateToDefaultToolbox = {this.updateToDefaultToolbox}
                returnToMicroworld = {this.returnToMicroworld}
            />
        );
    }
}

App.propTypes = {
    basePath: React.PropTypes.string
};

const appTarget = document.createElement('div');
appTarget.className = styles.app;
document.body.appendChild(appTarget);
const store = applyMiddleware(
    throttle(300, {leading: true, trailing: true})
)(createStore)(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render((
    <Provider store={store}>
        <App basePath={process.env.BASE_PATH} />
    </Provider>
), appTarget);
