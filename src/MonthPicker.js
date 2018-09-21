import React, { Component } from "react";
import ReactDOM from "react-dom";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec"
];

const daysInMonth = date => {
  return new Date(date.getYear(), date.getMonth(), 0).getDate();
};

export default class MonthPicker extends Component {
  static state = {
    date: null,
    year: 1970,
    selected: null
  };

  componentWillMount() {
    const date = new Date();

    this.setState({
      date: date,
      year: date.getFullYear()
    });
  }

  prevYear = () => {
    this.setState({ year: this.state.year - 1 });
  };

  nextYear = () => {
    this.setState({ year: this.state.year + 1 });
  };

  setMonth = month => {
    const newDate = new Date();
    newDate.setYear(this.state.year);
    newDate.setMonth(month);
    newDate.setDate(1);
    this.setState({ selected: newDate });

    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(newDate);
    }
  };

  renderMonth = (name, num) => {
    let className = "month-picker__month";
    let disabled = false;

    if (
      this.state.selected &&
      this.state.selected.getMonth() === num &&
      this.state.selected.getFullYear() === this.state.year
    ) {
      className += " month-picker__month--active";
    }

    if (this.props.disableFrom) {
      if (
        (this.state.year === this.props.disableFrom.getFullYear() &&
          num < this.props.disableFrom.getMonth()) ||
        this.state.year < this.props.disableFrom.getFullYear()
      ) {
        className += " month-picker__month--disabled";
        disabled = true;
      }
    }

    if (this.props.disableTo) {
      if (
        (this.state.year === this.props.disableTo.getFullYear() &&
          num > this.props.disableTo.getMonth()) ||
        this.state.year > this.props.disableTo.getFullYear()
      ) {
        className += " month-picker__month--disabled";
        disabled = true;
      }
    }

    return (
      <button
        className={className}
        disabled={disabled}
        onClick={() => this.setMonth(num)}
      >
        {name}
      </button>
    );
  };

  render() {
    const today = new Date();

    return (
      <div className="month-picker">
        <div className="month-picker__header">
          <button className="month-picker__button" onClick={this.prevYear}>
            &#60;
          </button>
           {this.state.year}
          <button className="month-picker__button" onClick={this.nextYear}>
            &#62;
          </button>
        </div>
        <div className="month-picker__body">{months.map(this.renderMonth)}</div>
      </div>
    );
  }
}
