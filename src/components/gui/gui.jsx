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


const GUIComponent = props => {
    const {
        basePath,
        children,
        vm,
        editorType,
        blocks,
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
                        toolbox: blocks
                    }}
                    vm={vm}
                />

            },
            vm: vm
        }
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
                    <Save vm={vm} blocks={blocks}/>
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
    editorType: React.PropTypes.number,
    blocks: React.PropTypes.string
};
GUIComponent.defaultProps = {
    basePath: '/',
    vm: new VM(),
    editorType: 0
};
module.exports = GUIComponent;
