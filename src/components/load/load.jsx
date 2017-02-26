const classNames = require('classnames');
const React = require('react');

const LoadComponent = function (props) {
    const {
        ...componentProps
    } = props;
    return (
        <label htmlFor="files"
          {...componentProps}>
            Load
            <input type="file" id="files" name="files"
                style={{width : '0.1px', height: '0.1px', opacity: 0,overflow: 'hidden',position: 'absolute',zindex:  -1}} />
        </label>
    );
};

module.exports = LoadComponent;
