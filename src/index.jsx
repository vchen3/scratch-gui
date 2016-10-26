const React = require('react');
const ReactDOM = require('react-dom');
const VM = require('scratch-vm');

const Blocks = require('./containers/blocks.jsx');
const GUI = require('./containers/gui.jsx');
const log = require('./lib/log');
const ProjectLoader = require('./lib/project-loader');

class App extends React.Component {
    constructor (props) {
        super(props);
        this.fetchProjectId = this.fetchProjectId.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.state = {
            projectId: null,
            projectData: JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)
        };
    }
    componentDidMount () {
        window.addEventListener('hashchange', this.updateProject);
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({toolbox: this.toolbox});
        this.updateProject();
    }
    componentWillUnmount () {
        window.removeEventListener('hashchange', this.updateProject);
    }
    fetchProjectId () {
        return location.hash.substring(1);
    }
    updateProject () {
        const projectId = this.fetchProjectId();
        if (projectId !== this.state.projectId) {
            if (projectId.length < 1) {
                return this.setState({
                    projectId: projectId,
                    projectData: JSON.stringify(ProjectLoader.DEFAULT_PROJECT_DATA)
                });
            }
            ProjectLoader.load(projectId, (err, body) => {
                if (err) return log.error(err);
                this.setState({projectData: body});
            });
            this.setState({projectId: projectId});
        }
    }
    render () {
        return (
            <GUI
                basePath={this.props.basePath}
                projectData={this.state.projectData}
                vm={this.props.vm}
            >
                {/* eslint-disable react/jsx-max-props-per-line, react/jsx-sort-props */}
                <xml
                    ref={tb => (this.toolbox = tb)}
                    style={{display: 'none'}}
                >
                    <category is name="Sound" colour="#D65CD6" secondaryColour="#BD42BD">
                        <block type="sound_play">
                            <value name="SOUND_MENU">
                                <shadow type="sound_sounds_option" />
                            </value>
                        </block>
                        <block type="sound_playuntildone">
                            <value name="SOUND_MENU">
                                <shadow type="sound_sounds_option" />
                            </value>
                        </block>
                        <block type="sound_stopallsounds" />
                        <block type="sound_playdrumforbeats">
                            <value name="DRUMTYPE">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="BEATS">
                                <shadow type="math_number">
                                    <field name="NUM">0.25</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_restforbeats">
                            <value name="BEATS">
                                <shadow type="math_number">
                                    <field name="NUM">0.25</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_playnoteforbeats">
                            <value name="NOTE">
                                <shadow type="math_number">
                                    <field name="NUM">60</field>
                                </shadow>
                            </value>
                            <value name="BEATS">
                                <shadow type="math_number">
                                    <field name="NUM">0.5</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_setinstrumentto">
                            <value name="INSTRUMENT">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_playthereminforbeats">
                            <value name="NOTE">
                                <shadow type="math_number">
                                    <field name="NUM">60</field>
                                </shadow>
                            </value>
                            <value name="BEATS">
                                <shadow type="math_number">
                                    <field name="NUM">0.5</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_seteffectto">
                            <value name="EFFECT">
                                <shadow type="sound_effects_menu" />
                            </value>
                            <value name="VALUE">
                                <shadow type="math_number">
                                    <field name="NUM">100</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_changeeffectby">
                            <value name="EFFECT">
                                <shadow type="sound_effects_menu" />
                            </value>
                            <value name="VALUE">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_cleareffects" />
                        <block type="sound_changevolumeby">
                            <value name="VOLUME">
                                <shadow type="math_number">
                                    <field name="NUM">-10</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_setvolumeto">
                            <value name="VOLUME">
                                <shadow type="math_number">
                                    <field name="NUM">100</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_volume" />
                        <block type="sound_changetempoby">
                            <value name="TEMPO">
                                <shadow type="math_number">
                                    <field name="NUM">20</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_settempotobpm">
                            <value name="TEMPO">
                                <shadow type="math_number">
                                    <field name="NUM">60</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="sound_tempo" />
                    </category>

                    <category is name="Events" colour="#FFD500" secondaryColour="#CC9900">

                        <block type="event_whenflagclicked" />
                        <block type="event_whenkeypressed" />

                        <block type="control_wait">
                            <value name="DURATION">
                                <shadow type="math_positive_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="control_repeat">
                            <value name="TIMES">
                                <shadow type="math_whole_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="control_forever" />
                        <block type="control_if" />
                        <block type="control_if_else" />
                        <block type="control_wait_until" />
                        <block type="control_repeat_until" />
                        <block type="control_stop" />
                    </category>

                    <category is name="Sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
                        <block type="sensing_keypressed">
                            <value name="KEY_OPTION">
                                <shadow type="sensing_keyoptions" />
                            </value>
                        </block>
                        <block type="sensing_mousedown" />
                        <block type="sensing_mousex" />
                        <block type="sensing_mousey" />
                        <block type="sensing_timer" />
                        <block type="sensing_resettimer" />
                        <block type="sensing_dayssince2000" />
                    </category>

                    <category is name="Operators" colour="#40BF4A" secondaryColour="#389438">
                        <block type="operator_add">
                            <value name="NUM1">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                            <value name="NUM2">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_subtract">
                            <value name="NUM1">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                            <value name="NUM2">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_multiply">
                            <value name="NUM1">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                            <value name="NUM2">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_divide">
                            <value name="NUM1">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                            <value name="NUM2">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_random">
                            <value name="FROM">
                                <shadow type="math_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="TO">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_lt">
                            <value name="OPERAND1">
                                <shadow type="text">
                                    <field name="TEXT" />
                                </shadow>
                            </value>
                            <value name="OPERAND2">
                                <shadow type="text">
                                    <field name="TEXT" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_equals">
                            <value name="OPERAND1">
                                <shadow type="text">
                                    <field name="TEXT" />
                                </shadow>
                            </value>
                            <value name="OPERAND2">
                                <shadow type="text">
                                    <field name="TEXT" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_gt">
                            <value name="OPERAND1">
                                <shadow type="text">
                                    <field name="TEXT" />
                                </shadow>
                            </value>
                            <value name="OPERAND2">
                                <shadow type="text">
                                    <field name="TEXT" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_and" />
                        <block type="operator_or" />
                        <block type="operator_not" />
                        <block type="operator_join">
                            <value name="STRING1">
                                <shadow type="text">
                                    <field name="TEXT">hello</field>
                                </shadow>
                            </value>
                            <value name="STRING2">
                                <shadow type="text">
                                    <field name="TEXT">world</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_letter_of">
                            <value name="LETTER">
                                <shadow type="math_whole_number">
                                    <field name="NUM">1</field>
                                </shadow>
                            </value>
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">world</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_length">
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">world</field>
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_mod">
                            <value name="NUM1">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                            <value name="NUM2">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_round">
                            <value name="NUM">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                        </block>
                        <block type="operator_mathop">
                            <value name="OPERATOR">
                                <shadow type="operator_mathop_menu" />
                            </value>
                            <value name="NUM">
                                <shadow type="math_number">
                                    <field name="NUM" />
                                </shadow>
                            </value>
                        </block>
                    </category>
                </xml>
                {/* eslint-enable react/jsx-max-props-per-line, react/jsx-sort-props */}
                {this.state.toolbox ?
                    <Blocks
                        options={{
                            media: `${this.props.basePath}static/blocks-media/`,
                            toolbox: this.state.toolbox
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }}
                        vm={this.props.vm}
                    /> :
                    null
                }
            </GUI>
        );
    }
}

App.propTypes = {
    basePath: React.PropTypes.string,
    vm: React.PropTypes.instanceOf(VM)
};

App.defaultProps = {
    vm: new VM()
};

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<App basePath={process.env.BASE_PATH} />, appTarget);
