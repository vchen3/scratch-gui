const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./sprite-info.css');

const xIcon = require('./icon--x.svg');
const yIcon = require('./icon--y.svg');
const showIcon = require('./icon--show.svg');
const hideIcon = require('./icon--hide.svg');
const draggableIcon = require('./icon--draggable.svg');
const notDraggableIcon = require('./icon--not-draggable.svg');

const ROTATION_STYLES = ['left-right', 'don\'t rotate', 'all around'];

class SpriteInfo extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            this.props.disabled !== nextProps.disabled ||
            this.props.draggable !== nextProps.draggable ||
            this.props.name !== nextProps.name ||
            this.props.rotationStyle !== nextProps.rotationStyle ||
            this.props.visible !== nextProps.visible ||
            this.props.x !== nextProps.x ||
            this.props.y !== nextProps.y
        );
    }
    render () {
        return (
            <Box
                className={styles.spriteInfo}
            >
                <div className={styles.row}>
                    <div className={styles.group}>
                        <span className={styles.inputLabel}>Sprite</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormSpriteName)}
                            disabled={this.props.disabled}
                            placeholder="Name"
                            type="text"
                            value={this.props.disabled ? '' : this.props.name}
                            onChange={this.props.onChangeName}
                        />
                    </div>

                    <div className={styles.group}>
                        <img
                            className={classNames(styles.xIcon, styles.icon)}
                            src={xIcon}
                        />
                        <span className={styles.inputLabel}>x</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormX)}
                            disabled={this.props.disabled}
                            placeholder="x"
                            type="text"
                            value={this.props.disabled ? '' : this.props.x}
                            onChange={this.props.onChangeX}
                        />
                    </div>

                    <div className={styles.group}>
                        <img
                            className={classNames(styles.yIcon, styles.icon)}
                            src={yIcon}
                        />
                        <span className={styles.inputLabel}>y</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormY)}
                            disabled={this.props.disabled}
                            placeholder="y"
                            type="text"
                            value={this.props.disabled ? '' : this.props.y}
                            onChange={this.props.onChangeY}
                        />
                    </div>
                </div>
            </Box>
        );
    }
}

SpriteInfo.propTypes = {
    disabled: React.PropTypes.bool,
    draggable: React.PropTypes.bool,
    name: React.PropTypes.string,
    onChangeName: React.PropTypes.func,
    onChangeRotationStyle: React.PropTypes.func,
    onChangeX: React.PropTypes.func,
    onChangeY: React.PropTypes.func,
    onClickDraggable: React.PropTypes.func,
    onClickNotDraggable: React.PropTypes.func,
    onClickNotVisible: React.PropTypes.func,
    onClickVisible: React.PropTypes.func,
    rotationStyle: React.PropTypes.oneOf(ROTATION_STYLES),
    visible: React.PropTypes.bool,
    x: React.PropTypes.number,
    y: React.PropTypes.number
};

module.exports = SpriteInfo;
