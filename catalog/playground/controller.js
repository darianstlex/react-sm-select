import React from 'react';
import './controller.css';

const is = (type, target) => target.constructor === type;

export class Controller extends React.Component {
  constructor(props) {
    super(props);

    this.toParse = [];
    this.state = {};

    props.controls.forEach(control => {
      if (control.type === 'array') {
        const [first] = control.value;
        const pretty = first && is(String, first) ? 0 : 2;
        this.toParse.push(control.prop);
        this.state[control.prop] = JSON.stringify(control.value, null, pretty);
      }
      else this.state[control.prop] = control.value;
    });
  }

  string = control =>
    <div key={control.prop} className="field">
      <label className="label">Property: <span className="propName">{control.prop}</span></label>
      <div className="control">
        <input className="input" type="text"
          value={this.state[control.prop]}
          onChange={event => this.setState({[control.prop]: event.target.value})}
        />
      </div>
    </div>;

  number = control =>
    <div key={control.prop} className="field">
      <label className="label">Property: <span className="propName">{control.prop}</span></label>
      <div className="control">
        <input className="input" type="number"
          value={this.state[control.prop]}
          onChange={event => this.setState({[control.prop]: parseInt(event.target.value)})}
        />
      </div>
    </div>;

  boolean = control =>
    <div key={control.prop} className="field">
      <input id={control.prop} type="checkbox" name="switchRtlExample" className="switch is-info"
        checked={this.state[control.prop]}
        onChange={() => this.setState(state => ({
          [control.prop]: !state[control.prop],
        }))}
      />
      <label htmlFor={control.prop}><span className="propName">{control.prop}</span></label>
    </div>;

  array = control =>
    <div key={control.prop} className="field">
      <label className="label">Property: <span className="propName">{control.prop}</span></label>
      <div className="control">
        <textarea className="textarea"
          defaultValue={this.state[control.prop]}
          rows={control.rows}
          onChange={event => this.setState({[control.prop]: event.target.value})}
        />
      </div>
    </div>;

  select = control =>
    <div key={control.prop} className="field">
      <label className="label">Property: <span className="propName">{control.prop}</span></label>
      <div className="control">
        <div className="select is-fullwidth">
          <select
            defaultValue={this.state[control.prop]}
            onChange={event => this.setState({[control.prop]: event.target.value})}
          >
            {control.options.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>
    </div>;

  onUpdate = () => {
    const state = { ...this.state};
    this.toParse.forEach(prop => state[prop] = JSON.parse(state[prop]));
    this.props.onUpdate(state)
  };

  renderControls = (controls, type) =>
    controls.map(control => control.type === type
      ? this[type](control)
      : null
    );

  render() {
    const {controls} = this.props;
    return (
      <div className="controlsWrapper">
        <div className="columns">
          <div className="column is-8 leftColumn">
            {this.renderControls(controls, 'string')}
          </div>
          <div className="column rightColumn">
            {this.renderControls(controls, 'select')}
            {this.renderControls(controls, 'number')}
            <div className="divider"/>
            {this.renderControls(controls, 'boolean')}
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <a className="button is-info is-pulled-right" onClick={this.onUpdate}>Update</a>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            {this.renderControls(controls, 'array')}
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <a className="button is-info is-pulled-right" onClick={this.onUpdate}>Update</a>
          </div>
        </div>
      </div>
    );
  }
}
