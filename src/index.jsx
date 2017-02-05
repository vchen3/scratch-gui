const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {createStore} = require('redux');

const GUI = require('./containers/gui.jsx');
const log = require('./lib/log');
const ProjectLoader = require('./lib/project-loader');
const reducer = require('./reducers/gui');

const styles = require('./index.css');

class App extends React.Component {
    constructor (props) {
        super(props);
        this.fetchProjectId = this.fetchProjectId.bind(this);
        this.updateProject = this.updateProject.bind(this);

        // Update from file loading
        this.updateProjectFromLoadButton = this.updateProjectFromLoadButton.bind(this);
        this.fileLoader = new FileReader();
        this.fileLoader.onload = this.fileLoaderOnLoad.bind(this);
        this.fileInputField = null;

        this.state = {
            projectId: null,
            projectData: JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA),
            editorType: this.fetchEditorType(),
            blocks: ProjectLoader.loadBlocksFromFile(this.fetchProjectId())
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
    fetchEditorType () {
        var hashString = window.location.hash.substring(1).split(',');
        for (var i=0; i < hashString.length; i++) {
            if (hashString[i].substring(0,2) == 'e=') {
                return parseInt(hashString[i].substring(2));
            }
        }
        return 0;
    }
    updateProject () {
        const projectId = this.fetchProjectId();
        if (projectId !== this.state.projectId && projectId) {
            if (projectId.length < 1) {
                return this.setState({
                    projectId: projectId,
                    projectData: JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)
                });
            } else if (isNaN(projectId)) {
                var projectData = ProjectLoader.loadFromProjectsFile(projectId);
                return this.setState({
                    projectId: projectId,
                    projectData: projectData ? projectData : JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)
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
        this.fileLoader.readAsText(e.target.files[0]);
    }
    fileLoaderOnLoad() {
      console.log("in onload");
      var projectData = this.fileLoader.result;
      console.log(projectData);
      this.setState({projectId: this.fileLoader.name,
                   projectData: projectData ? projectData : JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)})
    }
    render () {
        return (
            <GUI
                basePath={this.props.basePath}
                projectData={this.state.projectData}
                editorType={this.state.editorType}
                blocks={this.state.blocks}
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
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render((
    <Provider store={store}>
        <App basePath={process.env.BASE_PATH} />
    </Provider>
), appTarget);
