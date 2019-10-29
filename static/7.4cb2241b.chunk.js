webpackJsonp([7],{808:function(n,e,l){var a=l(8),t=l(45),o=l(297).PageRenderer;o.__esModule&&(o=o.default);var u=t({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:l(822)}},componentWillMount:function(){},render:function(){return a.createElement(o,Object.assign({},this.props,{content:this.state.content}))}});u.__catalog_loader__=!0,n.exports=u},822:function(n,e){n.exports="### Loading Indicator\n\n```react\nstate: {\n value: ['red', 'blue'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\nconst Loading  = () => 'Loading ...';\n\n<MultiSelect\n  isLoading\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n  Loading={Loading}\n/>\n```\n\n### Value\n\n```react\nstate: {\n value: ['red', 'blue', 'black'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\nconst Value = ({value, options}) => {\n  if(!value.length) return 'Colors';\n  return `Colors {> ${!!value.length && value.length === options.length ? 'All' : value.length} <}`;\n};\n\n<MultiSelect\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n  Value={Value}\n/>\n```\n\n\n### DropDown Arrow\n\n```react\nstate: {\n value: ['red', 'blue'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\nconst Arrow = ({expanded}) => {\n  return expanded ? String.fromCharCode(0x027F0) : String.fromCharCode(0x027F1);\n};\n\n<MultiSelect\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n  Arrow={Arrow}\n/>\n```\n\n### Option\n\n```react\nstate: {\n value: ['red', 'blue'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\nconst Option = ({checked, option, isSingle}) => (\n  <div className=\"Option__renderer\">\n    {!isSingle && <input\n      type=\"checkbox\"\n      defaultChecked={checked}\n      tabIndex=\"-1\"\n    />}\n    <span className=\"Option__label\">\n      {option.label}\n    </span>\n  </div>\n);\n\n<MultiSelect\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n  Option={Option}\n/>\n```\n\n### Option Custom Icon\n\n```react\nstate: {\n value: ['red', 'blue'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\nconst Option = ({checked, option, isSingle}) => (\n  <div className=\"Option__renderer\">\n    {checked ? '\\u263A' : '\\u263B'}\n    <span className=\"Option__label\">\n      {option.label}\n    </span>\n  </div>\n);\n\n<MultiSelect\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n  Option={Option}\n/>\n```\n"}});
//# sourceMappingURL=7.4cb2241b.chunk.js.map