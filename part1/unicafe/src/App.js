import { useState } from "react";

const Button = (props) => {
	return (
		<button onClick={() => props.set(props.value + 1)}>{props.text}</button>
	);
};

const StatisticLine = (props) => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	);
};

const Statistics = (props) => {
	const all = props.data.good + props.data.bad + props.data.neutral;
	if (all === 0) {
		return (
			<div>
				<h1>Statistics</h1>
				<p>No feedback given</p>
			</div>
		);
	}
	return (
		<div>
			<h1>Statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="good" value={props.data.good} />
					<StatisticLine text="neutral" value={props.data.neutral} />
					<StatisticLine text="bad" value={props.data.bad} />
					<StatisticLine text="all" value={all} />
					<StatisticLine
						text="average"
						value={(-1 * props.data.bad + props.data.good) / all}
					/>
					<StatisticLine
						text="positive"
						value={props.data.good / all}
					/>
				</tbody>
			</table>
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const data = { good: good, bad: bad, neutral: neutral };

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" set={setGood} value={good} />
			<Button text="neural" set={setNeutral} value={neutral} />
			<Button text="bad" set={setBad} value={bad} />
			<Statistics data={data} />
		</div>
	);
};

export default App;
