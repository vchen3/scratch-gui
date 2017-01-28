const classNames = require('classnames');
const React = require('react');

const loadIcon = require('./load.svg');
const styles = require('./load.css');

const LoadComponent = function (props) {
    const {
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <img
            className={classNames({
                [styles.load]: true,
            })}
            src={loadIcon}
            title={title}
            onClick={onClick}
            {...componentProps}
        />
    );
};

LoadComponent.propTypes = {
    onClick: React.PropTypes.func,
    title: React.PropTypes.string
};

LoadComponent.defaultProps = {
    title: 'Load'
};

module.exports = LoadComponent;
