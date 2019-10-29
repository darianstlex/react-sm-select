webpackJsonp([2],{813:function(e,n,l){var a=l(8),t=l(45),u=l(297).PageRenderer;u.__esModule&&(u=u.default);var r=t({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:l(827)}},componentWillMount:function(){},render:function(){return a.createElement(u,Object.assign({},this.props,{content:this.state.content}))}});r.__catalog_loader__=!0,e.exports=r},827:function(e,n){e.exports="### Search\n\n```react\nstate: {\n value: [],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n   {value: 'red2', label: 'Red 2'},\n   {value: 'green2', label: 'Green 2'},\n   {value: 'blue2', label: 'Blue 2'},\n   {value: 'brown2', label: 'Brown 2'},\n   {value: 'red3', label: 'Red 3'},\n   {value: 'green3', label: 'Green 3'},\n   {value: 'blue3', label: 'Blue 3'},\n   {value: 'brown3', label: 'Brown 3'},\n   {value: 'red4', label: 'Red 4'},\n   {value: 'green4', label: 'Green 4'},\n   {value: 'blue4', label: 'Blue 4'},\n   {value: 'brown4', label: 'Brown 4'},\n ],\n}\n---\n<MultiSelect\n  enableSearch\n  resetable\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n/>\n```\n\n\n### Search with max display Options\n\n```react\nstate: {\n value: ['red2', 'blue3'],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n   {value: 'red2', label: 'Red 2'},\n   {value: 'green2', label: 'Green 2'},\n   {value: 'blue2', label: 'Blue 2'},\n   {value: 'brown2', label: 'Brown 2'},\n   {value: 'red3', label: 'Red 3'},\n   {value: 'green3', label: 'Green 3'},\n   {value: 'blue3', label: 'Blue 3'},\n   {value: 'brown3', label: 'Brown 3'},\n ],\n}\n---\n<MultiSelect\n  resetable\n  enableSearch\n  maxOptionsToRender={5}\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n/>\n```\n\n### Search with custom Select All Label\n\n```react\nstate: {\n value: [],\n options: [\n   {value: 'red', label: 'Red'},\n   {value: 'green', label: 'Green'},\n   {value: 'blue', label: 'Blue'},\n   {value: 'brown', label: 'Brown'},\n ],\n}\n---\n<MultiSelect\n  resetable\n  enableSearch\n  hasSelectAll\n  selectAllLabel=\"All Options\"\n  options={state.options}\n  value={state.value}\n  onChange={value => setState({ value })}\n/>\n```\n"}});
//# sourceMappingURL=2.26c1a21e.chunk.js.map