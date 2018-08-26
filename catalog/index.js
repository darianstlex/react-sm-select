import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog, pageLoader, ReactSpecimen} from 'catalog';
import {Controller} from './playground/controller';
import logo from "./static/r-logo.svg";
import {MultiSelect} from '../src';
import {MultiselectWrapper} from './playground/multiselect-wrapper';
import 'bulma/css/bulma.min.css';
import 'bulma-switch/dist/css/bulma-switch.min.css';
import './catalog.css';
import '../src/styles.css';

const markdownLoader = page => pageLoader(() => import(`./${page}.md`));

const pages = [
  {
    path: '/',
    title: 'Installation',
    content: markdownLoader('install'),
  },
  {
    title: 'Props',
    path: 'props',
    content: markdownLoader('props'),
  },
  {
    title: "Specimens",
    pages: [
      {
        imports: {MultiSelect},
        path: "spec/basic",
        title: "Basic",
        content: markdownLoader("spec/basic")
      },
      {
        imports: {MultiSelect},
        path: "spec/initialized",
        title: "Initial Value",
        content: markdownLoader("spec/initialized")
      },
      {
        imports: {MultiSelect},
        path: "spec/reset",
        title: "Reset Value",
        content: markdownLoader("spec/reset")
      },
      {
        imports: {MultiSelect},
        path: "spec/search",
        title: "Search",
        content: markdownLoader("spec/search")
      },
      {
        imports: {MultiSelect},
        path: "spec/hover",
        title: "Hover",
        content: markdownLoader("spec/hover")
      },
      {
        imports: {MultiSelect},
        path: "spec/loading",
        title: "Loading",
        content: markdownLoader("spec/loading")
      },
      {
        imports: {MultiSelect},
        path: "spec/custom",
        title: "Customization",
        content: markdownLoader("spec/custom")
      },
    ]
  },
  {
    imports: {MultiselectWrapper, Controller},
    title: 'PlayGround',
    path: 'playground/playground',
    content: markdownLoader('playground/playground'),
  },
];

ReactDOM.render(
  <Catalog
    title="SM Select"
    logoSrc={logo}
    pages={pages}
    specimens={{
      'js': props => <ReactSpecimen {...props} lang="javascript" />,
    }}
  />,
  document.getElementById("catalog")
);
