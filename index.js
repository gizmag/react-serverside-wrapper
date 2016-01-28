var React = require('react');
var ReactDOM = require('react-dom');

var ServersideWrapper = React.createClass({

    propTypes: {
        element: React.PropTypes.string.isRequired,
        properties: React.PropTypes.object.isRequired
    },

    render: function() {
        var json = JSON.stringify(this.props.properties);

        return React.createElement('script', { type: 'application/json',
            id: this.props.element + '_props',
            dangerouslySetInnerHTML: { __html: json }
        });
    }
});

// This method is used to create the initial dom node that react attaches itself to
ServersideWrapper.createDomElement = function(opts) {
    if (typeof window !== 'undefined' && document.getElementById(opts.domElement + '_props') !== null) {
        var componentProperties = JSON.parse(
            document.getElementById(opts.domElement + '_props').innerHTML
        );
        ReactDOM.render(React.createElement(opts.component, componentProperties),
            document.getElementById(opts.domElement));
    }
};

module.exports = ServersideWrapper;
