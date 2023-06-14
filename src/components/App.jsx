import { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import PropTypes from 'prop-types';

export function App () {
const [good, setGood] = useState(0);
const [neutral, setNeutral] = useState(0);
const [bad, setBad] = useState(0);

const handleFeedback = option => {
  const feedbackMap = {
    good: setGood,
    neutral: setNeutral,
    bad: setBad
  };

  if (option in feedbackMap) {
    feedbackMap[option](prevState => prevState + 1);
  }
};

  const calculateTotalFeedback = () => {
    return good + neutral + bad;
  };

  const totalFeedback = calculateTotalFeedback();

  const calculatePositivePercentage = () => {
    return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  };

    return (
      <div className="container">
        <Section title="Please leave feedback">
          <FeedbackOptions options={['good', 'neutral', 'bad' ]} onLeaveFeedback={handleFeedback} />

        </Section>

        <Section title="Statistics">
          {totalFeedback === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={calculateTotalFeedback()}
              positivePercentage={calculatePositivePercentage()}
            />
          )}
        </Section>
      </div>
    );
  }

App.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
  handleFeedback: PropTypes.func,
};
