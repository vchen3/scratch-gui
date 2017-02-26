const classNames = require('classnames');
const React = require('react');

const SaveComponent = function (props) {
    const {
        onClick,
        ...componentProps
    } = props;
    return (
        <a
          onClick={onClick}
          {...componentProps}
        />
    );
};

SaveComponent.propTypes = {
    onClick: React.PropTypes.func
};

module.exports = SaveComponent;
