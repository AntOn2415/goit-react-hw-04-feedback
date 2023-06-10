import React, { Component } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import PropTypes from 'prop-types';

export class App extends Component {
  static propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
    handleFeedback: PropTypes.func,
  };

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  calculateTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  calculatePositivePercentage = () => {
    const { good } = this.state;
    const totalFeedback = this.calculateTotalFeedback();
    return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.calculateTotalFeedback();
    const positivePercentage = this.calculatePositivePercentage();

    return (
      <div className="container">
        <Section title="Please leave feedback">
          <FeedbackOptions options={['good', 'neutral', 'bad' ]} onLeaveFeedback={this.handleFeedback} />

        </Section>

        <Section title="Statistics">
          {totalFeedback === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </div>
    );
  }
}
