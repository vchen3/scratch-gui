const classNames = require('classnames');
const React = require('react');

const OpenInScratchComponent = function (props) {
    const {
        title,
        onClick,
        ...componentProps
    } = props;
    return (
        <a
          onClick={onClick}
          {...componentProps}
        >
            {title}
        </a>
    );
};

OpenInScratchComponent.propTypes = {
    title: React.PropTypes.string,
    onClick: React.PropTypes.func
};

module.exports = OpenInScratchComponent;
