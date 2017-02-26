const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./menu-bar.css');
const scratchLogo = require('./scratch-logo.svg');
// const OpenScratch = require('../../containers/open-in-scratch.jsx');
const Save = require('../../containers/save.jsx');
const Load = require('../../containers/load.jsx');

const MenuBar = function MenuBar (props) {
    const {
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
            <Save className={styles.menuItem} vm={vm} blocks={blocks}>Save</Save>
            <Load className={styles.menuItem}></Load>
            <a className={styles.menuItem} href="#" >Open in Scratch</a>
        </Box>
    );
};

module.exports = MenuBar;
