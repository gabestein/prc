import PropTypes from 'prop-types';
import './monthSelector.scss';
import moment from 'moment';
import Link from 'next/link';
import { Button, ButtonGroup } from '@blueprintjs/core';

const MonthSelector = (props) => {
	const { current } = props;
	const currentMoment = moment(current).utc();
	const today = moment()
		.utc()
		.format('YYYY-MM-DD');
	const currentMonthDate = currentMoment.utc().format('MMMM YYYY');
	const prevStartDate = moment(currentMoment)
		.utc()
		.subtract(1, 'month')
		.startOf('month')
		.format('YYYY-MM-DD');
	const prevEndDate = moment(currentMoment)
		.utc()
		.subtract(1, 'month')
		.endOf('month')
		.format('YYYY-MM-DD');
	const nextStartDate = moment(currentMoment)
		.utc()
		.add(1, 'month')
		.startOf('month')
		.format('YYYY-MM-DD');
	const nextEndDate = moment(currentMoment)
		.utc()
		.add(1, 'month')
		.endOf('month')
		.format('YYYY-MM-DD');

	return (
		<div className="month-selector">
			<ButtonGroup>
				<Link href={`?startDate=${prevStartDate}&endDate=${prevEndDate}`}>
					<Button type="button" text="Prev" />
				</Link>
				<Button>{currentMonthDate}</Button>
				<Link href={`?startDate=${nextStartDate}&endDate=${nextEndDate}`}>
					<Button type="button" disabled={nextStartDate > today} text="Next" />
				</Link>
			</ButtonGroup>
		</div>
	);
};

MonthSelector.propTypes = {
	current: PropTypes.string.isRequired,
};

export default MonthSelector;
