const React = require('react');

const LoadComponent = require('../components/load/load.jsx');

class Load extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {
            ...props
        } = this.props;
        return (
            <LoadComponent
                {...props}
            />
        );
    }
}

Load.propTypes = {
};

module.exports = Load;
