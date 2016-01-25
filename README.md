# React serverside wrapper
For server-side react rendering.  Passes properties set on the server to the
client and binds your React component javascript to the DOM


## Why do I need this?

React components are fed an initial set of properties (props).  There are many
different ways to set these properties for your base component, they could be
passed via the DOM, hardcoded in your javascript app etc.

This becomes a more complicated problem when server-side rendering is involved.
You'd ideally want your initial properties to come from your server-side code
and be fed directly into your component for render.  Projects like
[python-react](https://github.com/markfinger/python-react) do a great job of
this, you can feed data from your python app directly into your server rendered
react components.

The only problem with this approach is syncing the props set on the server-side
render with the props set for the initial client side render.  This is what
react-serverside-wrapper will take care of.

## How it works

react-serverside-wrapper outputs a script tag to your page containing all of
the initial properties of the component as set in your server-side render.
This script tag will appear in your page source so that when your component
js runs, it can find the matching script tag and grab the initial props.


```html
<script type="application/json" id="my-component_props">
    {
        "property1":"something",
        "property2": true
    }
</script>
```


## Install

npm install --save react-serverside-wrapper


## How to use

Note that the server-side renderer and this example are using ES6.  If you
can't support ES6 in your environment this should be very straightforward
to rewrite in ES5.

This code assumes that there is a div on the page with the id 'my-component'
eg: `<div id="my-component"></div>`.  Your server-side render should be building
the component within this div.

```js
import ServersideWrapper from 'react-serverside-wrapper';

class MyComponent extends React.Component {

    render() {
        return (
            <div>
                ...
                <ServersideWrapper
                    properties={this.props}
                    element="my-component"
                />
            </div>
		);
    }
}

ServersideWrapper.createDomElement({
    component: MyComponent,
    domElement: 'my-component'
});

export default MyComponent;
```


## Inspiration

The inspiration for this project came from this [great article](http://www.crmarsh.com/react-ssr/).  This is a really good read
if you are new to react server-side rendering
