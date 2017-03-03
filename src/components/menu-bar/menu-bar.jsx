const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./menu-bar.css');
const scratchLogo = require('./scratch-logo.svg');
const OpenInScratch = require('../../containers/open-in-scratch.jsx');
const Save = require('../../containers/save.jsx');
const Load = require('../../containers/load.jsx');

const MenuBar = function MenuBar (props) {
    const {
        editorType,
        updateToDefaultToolbox,
        blocks,
        vm,
        ...componentProps
    } = props;
    return (
        <Box
            className={classNames({
                [styles.menuBar]: true
            })}
        >
            <div className={classNames(styles.logoWrapper, styles.menuItem)}>
                <img
                    className={classNames(styles.scratchLogo)}
                    src={scratchLogo}
                />
            </div>
            <Save className={styles.menuItem} 
                  vm={vm}
                  blocks={blocks}
                  editorType={editorType}>
                Save
            </Save>
            <OpenInScratch className={styles.menuItem}
                           vm={vm}
                           blocks={blocks}
                           updateToDefaultToolbox={updateToDefaultToolbox}>
                Open in Scratch
            </OpenInScratch>
        </Box>
    );
};

module.exports = MenuBar;
