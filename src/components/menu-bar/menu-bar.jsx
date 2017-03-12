const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./menu-bar.css');
const scratchLogo = require('./scratch-logo.svg');
const OpenInScratch = require('../../containers/open-in-scratch.jsx');
const Save = require('../../containers/save.jsx');
const Load = require('../../containers/load.jsx');

const homepageHref = "http://microworlds.media.mit.edu:8333/microworlds/new";

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
            <a className={classNames(styles.logoWrapper, styles.menuItem)} href={homepageHref}>
                <img
                    className={classNames(styles.scratchLogo)}
                    src={scratchLogo}
                />
            </a>
            <Save className={styles.menuItem} 
                  vm={vm}
                  blocks={blocks}
                  editorType={editorType}>
                Save
            </Save>
            <Load className={styles.menuItem}></Load>
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
