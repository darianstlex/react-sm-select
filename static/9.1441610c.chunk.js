webpackJsonp([9],{806:function(e,n,t){var l=t(8),a=t(45),o=t(297).PageRenderer;o.__esModule&&(o=o.default);var u=a({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:t(820)}},componentWillMount:function(){},render:function(){return l.createElement(o,Object.assign({},this.props,{content:this.state.content}))}});u.__catalog_loader__=!0,e.exports=u},820:function(e,n){e.exports="### Basic Usage\n\n```react\nstate: {\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\n<MultiSelect\n  id=\"some-id\"\n  options={state.options}\n  onChange={value => setState({ value })}\n/>\n```\n\n### With Select All\n\n```react\nstate: {\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\n<MultiSelect\n  id=\"some-id\"\n  hasSelectAll\n  options={state.options}\n  onChange={value => setState({ value })}\n/>\n```\n\n### Disabled\n\n```react\nstate: {\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\n<MultiSelect\n  disabled\n  options={state.options}\n  onChange={value => setState({ value })}\n/>\n```\n"}});
//# sourceMappingURL=9.1441610c.chunk.js.map