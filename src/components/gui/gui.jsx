const React = require('react');
const VM = require('scratch-vm');

const Blocks = require('../../containers/blocks.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');
const Save = require('../../containers/save.jsx');
const Load = require('../../containers/load.jsx');

const Box = require('../box/box.jsx');

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

const GUIComponent = props => {
    const {
        basePath,
        children,
        vm,
        editorType,
        ...componentProps
    } = props;
    if (children) {
        return (
            <Box {...componentProps}>
                {children}
            </Box>
        );
    }
    return (
        <Box
            grow={1}
            height="100%"
            style={{overflow: 'hidden'}}
            {...componentProps}
        >
            <Box
                direction="column"
                grow={1}
                shrink={0}
                width={600}
            >
                <Box
                    height={32}
                    style={{
                        marginTop: 8
                    }}
                />
                <Blocks
                    grow={1}
                    options={{
                        media: `${basePath}static/blocks-media/`,
                        showScaffoldingCategories: editorType,
                        // TODO(morant): Find a better way to determine blocks from the hash string.
                        toolbox: editorType == 1 ? defaultToolboxNoCategories
                                                 : (editorType == 2 ? defaultToolboxWithCategories : null)
                    }}
                    vm={vm}
                />
            </Box>
            <Box
                direction="column"
                shrink={0}
                width={480}
            >
                <Box
                    alignItems="center"
                    height={32}
                    shrink={0}
                    style={{
                        marginTop: 8
                    }}
                >
                    <GreenFlag vm={vm} />
                    <StopAll vm={vm} />
                    <Save vm={vm} />
                    <Load />
                </Box>
                <Stage
                    shrink={0}
                    vm={vm}
                />
                <TargetPane
                    grow={1}
                    vm={vm}
                />
            </Box>
        </Box>
    );
};
GUIComponent.propTypes = {
    basePath: React.PropTypes.string,
    children: React.PropTypes.node,
    vm: React.PropTypes.instanceOf(VM),
    editorType: React.PropTypes.number
};
GUIComponent.defaultProps = {
    basePath: '/',
    vm: new VM(),
    editorType: 0
};
module.exports = GUIComponent;
