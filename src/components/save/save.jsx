const classNames = require('classnames');
const React = require('react');

const styles = require('./save.css');

const SaveComponent = function (props) {
    const {
        onClick,
        onChangeCheckbox,
        ...componentProps
    } = props;
    return (
        <div>
            <a
              onClick={onClick}
              {...componentProps}
            />
            <input id="autosaveCheckbox"
                   type="checkbox"
                   className={classNames({
                        [styles.autosaveCheckbox]: true
                    })}
                   defaultChecked="checked"
                   onChange={onChangeCheckbox}></input>
        </div>
    );
};

SaveComponent.propTypes = {
    onClick: React.PropTypes.func
};

module.exports = SaveComponent;
