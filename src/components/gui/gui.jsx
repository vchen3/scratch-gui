const React = require('react');
const VM = require('scratch-vm');

const Blocks = require('../../containers/blocks.jsx');
const GreenFlag = require('../../containers/green-flag.jsx');
const TargetPane = require('../../containers/target-pane.jsx');
const Stage = require('../../containers/stage.jsx');
const StopAll = require('../../containers/stop-all.jsx');
const Save = require('../../containers/save.jsx');
const Load = require('../../containers/load.jsx');
const MenuBar = require('../menu-bar/menu-bar.jsx');

const Box = require('../box/box.jsx');
const styles = require('./gui.css');


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
            className={styles.pageWrapper}
            {...componentProps}
        >
            <MenuBar />
            <Box className={styles.bodyWrapper}>
                <Box className={styles.flexWrapper}>
                    <Box className={styles.blocksWrapper}>
                <Blocks
                    grow={1}
                    options={{
                        media: `${basePath}static/blocks-media/`,
                        editorType: editorType,
                        toolbox: blocks
                    }}
                    vm={vm}
                        />
                    </Box>

                    <Box className={styles.stageAndTargetWrapper} >
                        <Box className={styles.stageMenuWrapper} >
                            <GreenFlag vm={vm} />
                            <StopAll vm={vm} />
                            <Save vm={vm} blocks={blocks}/>
                            <Load />
                        </Box>
                        <Box className={styles.stageWrapper} >
                            <Stage
                                shrink={0}
                                vm={vm}
                            />
                        </Box>

                        <Box className={styles.targetWrapper} >
                            <TargetPane
                                vm={vm}
                            />
                        </Box>
                    </Box>
                </Box>
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
