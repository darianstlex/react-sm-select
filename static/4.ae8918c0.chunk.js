webpackJsonp([4],{811:function(n,e,a){var t=a(8),l=a(45),o=a(297).PageRenderer;o.__esModule&&(o=o.default);var u=l({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:a(825)}},componentWillMount:function(){},render:function(){return t.createElement(o,Object.assign({},this.props,{content:this.state.content}))}});u.__catalog_loader__=!0,n.exports=u},825:function(n,e){n.exports="### Loading Indicator\n\n```react\nstate: {\n value: ['red', 'blue'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\n<MultiSelect\n  isLoading\n  options={state.options}\n  value={state.value}\n  onChange={() => {}}\n/>\n```\n\n### Custom Loading Indicator\n\n```react\nstate: {\n value: ['red', 'blue'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\nconst Loading = () => 'Loading ...';\n\n<MultiSelect\n  isLoading\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n  Loading={Loading}\n/>\n```\n"}});
//# sourceMappingURL=4.ae8918c0.chunk.js.map