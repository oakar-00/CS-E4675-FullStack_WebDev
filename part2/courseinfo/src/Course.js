const Header = (props) => {
	return (
		<div>
			<h1>{props.course.name}</h1>
		</div>
	);
};

const Part = (props) => {
	return (
		<div>
			<p>
				{props.part} {props.exercise}
			</p>
		</div>
	);
};

const Content = (props) => {
	return (
		<div>
			{props.course.parts.map((part) => (
				<Part part={part.name} exercise={part.exercises} />
			))}
		</div>
	);
};

const Total = (props) => {
	return (
		<div>
			<b>total of {props.total} exercises</b>
		</div>
	);
};

const Course = (props) => {
	const total = props.course.parts.reduce((s, p) => s + p.exercises, 0);
	return (
		<div>
			<Header course={props.course} />
			<Content course={props.course} />
			<Total total={total} />
		</div>
	);
};

export default Course;
