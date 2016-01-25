const React = require('react');
const ReactDOM = require('react-dom');

class ServersideWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const json = JSON.stringify(this.props.properties);

        return React.createElement('script', { type: 'application/json',
            id: this.props.element + '_props',
            dangerouslySetInnerHTML: { __html: json }
        });
    }
}

ServersideWrapper.propTypes = {
    element: React.PropTypes.string.isRequired,
    properties: React.PropTypes.object.isRequired
};

// This method is used to create the initial dom node that react attaches itself to
ServersideWrapper.createDomElement = function(opts) {
    if (typeof window !== 'undefined' && document.getElementById(opts.domElement + '_props') !== null) {
        const componentProperties = JSON.parse(
            document.getElementById(opts.domElement + '_props').innerHTML
        );
        ReactDOM.render(React.createElement(opts.component, componentProperties),
            document.getElementById(opts.domElement));
    }
};

module.exports = ServersideWrapper;
