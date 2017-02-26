const classNames = require('classnames');
const React = require('react');

const OpenInScratchComponent = function (props) {
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

OpenInScratchComponent.propTypes = {
    onClick: React.PropTypes.func
};

module.exports = OpenInScratchComponent;
