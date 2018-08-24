import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog, pageLoader, ReactSpecimen} from 'catalog';
import logo from "./static/r-logo.svg";
import {MultiSelect} from '../src';
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
    imports: {MultiSelect},
    path: 'specimens',
    title: 'Specimens',
    content: markdownLoader('specimens'),
  },
  {
    imports: {MultiSelect},
    title: 'SandBox',
    path: 'sandbox',
    content: markdownLoader('sandbox'),
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
