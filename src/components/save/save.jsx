const classNames = require('classnames');
const React = require('react');

const saveIcon = require('./save.svg');
const styles = require('./save.css');

const SaveComponent = function (props) {
    const {
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <img
            className={classNames({
                [styles.save]: true,
            })}
            src={saveIcon}
            title={title}
            onClick={onClick}
            {...componentProps}
        />
    );
};

SaveComponent.propTypes = {
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};

SaveComponent.defaultProps = {
    title: 'Save'
};

module.exports = SaveComponent;
