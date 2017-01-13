const bindAll = require('lodash.bindall');
const defaultsDeep = require('lodash.defaultsdeep');
const React = require('react');
const ScratchBlocks = require('scratch-blocks');
const VM = require('scratch-vm');

const BlocksComponent = require('../components/blocks/blocks.jsx');

class Blocks extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'attachVM',
            'detachVM',
            'onScriptGlowOn',
            'onScriptGlowOff',
            'onBlockGlowOn',
            'onBlockGlowOff',
            'onVisualReport',
            'onWorkspaceUpdate',
            'setBlocks'
        ]);
    }
    componentDidMount () {
        const workspaceConfig = defaultsDeep({}, Blocks.defaultOptions, this.props.options);
        this.workspace = ScratchBlocks.inject(this.blocks, workspaceConfig);
        this.attachVM();
    }
    componentWillUnmount () {
        this.detachVM();
        this.workspace.dispose();
    }
    attachVM () {
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.workspace
            .getFlyout()
            .getWorkspace()
            .addChangeListener(this.props.vm.flyoutBlockListener);
        this.props.vm.on('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.on('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.on('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.on('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.on('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.on('workspaceUpdate', this.onWorkspaceUpdate);
    }
    detachVM () {
        this.props.vm.off('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.off('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.off('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.off('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.off('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.off('workspaceUpdate', this.onWorkspaceUpdate);
    }
    onScriptGlowOn (data) {
        this.workspace.glowStack(data.id, true);
    }
    onScriptGlowOff (data) {
        this.workspace.glowStack(data.id, false);
    }
    onBlockGlowOn (data) {
        this.workspace.glowBlock(data.id, true);
    }
    onBlockGlowOff (data) {
        this.workspace.glowBlock(data.id, false);
    }
    onVisualReport (data) {
        this.workspace.reportValue(data.id, data.value);
    }
    onWorkspaceUpdate (data) {
        ScratchBlocks.Events.disable();
        this.workspace.clear();
        const dom = ScratchBlocks.Xml.textToDom(data.xml);
        ScratchBlocks.Xml.domToWorkspace(dom, this.workspace);
        ScratchBlocks.Events.enable();
    }
    setBlocks (blocks) {
        this.blocks = blocks;
    }
    render () {
        const {
            options, // eslint-disable-line no-unused-vars
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <BlocksComponent
                componentRef={this.setBlocks}
                {...props}
            />
        );
    }
}

Blocks.propTypes = {
    options: React.PropTypes.shape({
        showScaffoldingCategories: React.PropTypes.number,
        toolbox: React.PropTypes.string,
        media: React.PropTypes.string,
        zoom: React.PropTypes.shape({
            controls: React.PropTypes.boolean,
            wheel: React.PropTypes.boolean,
            startScale: React.PropTypes.number
        }),
        colours: React.PropTypes.shape({
            workspace: React.PropTypes.string,
            flyout: React.PropTypes.string,
            scrollbar: React.PropTypes.string,
            scrollbarHover: React.PropTypes.string,
            insertionMarker: React.PropTypes.string,
            insertionMarkerOpacity: React.PropTypes.number,
            fieldShadow: React.PropTypes.string,
            dragShadowOpacity: React.PropTypes.number
        })
    }),
    vm: React.PropTypes.instanceOf(VM)
};

//TODO(morant): Move these to their own file!
var firstStepBlocks =
  '<block type="event_whenkeypressed">'+
  '</block>'+
  '<block type="sound_play">'+
    '<value name="SOUND_MENU">'+
      '<shadow type="sound_sounds_menu"></shadow>'+
    '</value>'+
  '</block>'+
  '<block type="control_wait">'+
    '<value name="DURATION">'+
      '<shadow type="math_positive_number">'+
        '<field name="NUM">1</field>'+
      '</shadow>'+
    '</value>'+
  '</block>';
var secondStepBlocks =
  '<block type="motion_movesteps">'+
    '<value name="STEPS">'+
      '<shadow type="math_number">'+
        '<field name="NUM">10</field>'+
      '</shadow>'+
    '</value>'+
  '</block>'+
  '<block type="motion_turnright">'+
    '<value name="DEGREES">'+
      '<shadow type="math_number">'+
        '<field name="NUM">90</field>'+
      '</shadow>'+
    '</value>'+
  '</block>'+
  '<block type="control_repeat">'+
    '<value name="TIMES">'+
      '<shadow type="math_whole_number">'+
        '<field name="NUM">10</field>'+
      '</shadow>'+
    '</value>'+
  '</block>';
var thirdStepBlocks =
  '<block type="looks_sayforsecs">'+
    '<value name="MESSAGE">'+
      '<shadow type="text">'+
        '<field name="TEXT">Hello!</field>'+
      '</shadow>'+
    '</value>'+
    '<value name="SECS">'+
      '<shadow type="math_number">'+
        '<field name="NUM">2</field>'+
      '</shadow>'+
    '</value>'+
  '</block>'+
  '<block type="looks_changesizeby">'+
   '<value name="CHANGE">'+
    '<shadow type="math_number">'+
         '<field name="NUM">10</field>'+
       '</shadow>'+
     '</value>'+
   '</block>';

var defaultToolboxNoCategories = '<xml id="toolbox-categories" style="display: none">'+
  '<category name="more Blocks" colour="#4C97FF" secondaryColour="#3373CC">'+
    firstStepBlocks +
  '</category>'+
  '<category name="less Blocks" colour="#4C97FF" secondaryColour="#3373CC">'+
    firstStepBlocks +
    secondStepBlocks +
  '</category>'+
  '<category name="third" colour="#4C97FF" secondaryColour="#3373CC">'+
    firstStepBlocks +
    secondStepBlocks +
    thirdStepBlocks +
  '</category>'+
  '</xml>';

var defaultToolboxWithCategories = '<xml id="toolbox-categories" style="display: none">'+
  '<category name="move" colour="#4C97FF" secondaryColour="#3373CC">'+
    '<block type="motion_turnright">'+
      '<value name="DEGREES">'+
        '<shadow type="math_number">'+
          '<field name="NUM">90</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="motion_movesteps">'+
      '<value name="STEPS">'+
        '<shadow type="math_number">'+
          '<field name="NUM">10</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="motion_glidesecstoxy">'+
      '<value name="SECS">'+
        '<shadow type="math_number">'+
          '<field name="NUM">1</field>'+
        '</shadow>'+
      '</value>'+
      '<value name="X">'+
        '<shadow type="math_number">'+
          '<field name="NUM">0</field>'+
        '</shadow>'+
      '</value>'+
      '<value name="Y">'+
        '<shadow type="math_number">'+
          '<field name="NUM">0</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="control_wait">'+
      '<value name="DURATION">'+
        '<shadow type="math_positive_number">'+
          '<field name="NUM">1</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="control_repeat">'+
      '<value name="TIMES">'+
        '<shadow type="math_whole_number">'+
          '<field name="NUM">10</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="event_whenkeypressed">'+
    '</block>'+
  '</category>'+
  '<category name="change" colour="#9966FF" secondaryColour="#774DCB">'+
    '<block type="looks_switchcostumeto">'+
      '<value name="COSTUME">'+
        '<shadow type="looks_costume"></shadow>'+
      '</value>'+
    '</block>'+
    '<block type="looks_nextcostume"></block>'+
    '<block type="control_wait">'+
      '<value name="DURATION">'+
        '<shadow type="math_positive_number">'+
          '<field name="NUM">1</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="control_repeat">'+
      '<value name="TIMES">'+
        '<shadow type="math_whole_number">'+
          '<field name="NUM">10</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="event_whenkeypressed">'+
    '</block>'+
  '</category>'+
  '<category name="talk" colour="#9966FF" secondaryColour="#774DCB">'+
    '<block type="looks_say">'+
      '<value name="MESSAGE">'+
        '<shadow type="text">'+
          '<field name="TEXT">Hello!</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="looks_thinkforsecs">'+
      '<value name="MESSAGE">'+
        '<shadow type="text">'+
          '<field name="TEXT">Hmm...</field>'+
        '</shadow>'+
      '</value>'+
      '<value name="SECS">'+
        '<shadow type="math_number">'+
          '<field name="NUM">2</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="looks_think">'+
      '<value name="MESSAGE">'+
        '<shadow type="text">'+
          '<field name="TEXT">Hmm...</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="control_wait">'+
      '<value name="DURATION">'+
        '<shadow type="math_positive_number">'+
          '<field name="NUM">1</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="control_repeat">'+
      '<value name="TIMES">'+
        '<shadow type="math_whole_number">'+
          '<field name="NUM">10</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="event_whenkeypressed">'+
    '</block>'+
  '</category>'+
  '<category name="make music" colour="#D65CD6" secondaryColour="#BD42BD">'+
    '<block type="sound_play">'+
      '<value name="SOUND_MENU">'+
        '<shadow type="sound_sounds_menu"></shadow>'+
      '</value>'+
    '</block>'+
    '<block type="sound_playuntildone">'+
      '<value name="SOUND_MENU">'+
        '<shadow type="sound_sounds_menu"></shadow>'+
      '</value>'+
    '</block>'+
    '<block type="control_wait">'+
      '<value name="DURATION">'+
        '<shadow type="math_positive_number">'+
          '<field name="NUM">1</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="control_repeat">'+
      '<value name="TIMES">'+
        '<shadow type="math_whole_number">'+
          '<field name="NUM">10</field>'+
        '</shadow>'+
      '</value>'+
    '</block>'+
    '<block type="event_whenkeypressed">'+
    '</block>'+
  '</category>'+
  '</xml>';

Blocks.defaultOptions = {
    // // "Show More"
    // showScaffoldingCategories: 1,
    // toolbox: defaultToolboxNoCategories,

    // // "Goal Oriented"
    // showScaffoldingCategories: 2,
    // toolbox: defaultToolboxWithCategories,

    // // Default
    showScaffoldingCategories: 0,

    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75
    },
    colours: {
        workspace: '#334771',
        flyout: '#283856',
        scrollbar: '#24324D',
        scrollbarHover: '#0C111A',
        insertionMarker: '#FFFFFF',
        insertionMarkerOpacity: 0.3,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    }
};

Blocks.defaultProps = {
    options: Blocks.defaultOptions,
    vm: new VM()
};

module.exports = Blocks;
