import PropTypes from 'prop-types';
import './monthSelector.scss';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Button, ButtonGroup } from '@blueprintjs/core';

const MonthSelector = (props) => {
	const { current } = props;
	const currentMoment = moment(current).utc();
	const today = moment()
		.utc()
		.format('YYYY-MM-DD');
	const currentDate = currentMoment.utc().format('YYYY-MM-DD');
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

	const router = useRouter();
	return (
		<div className="month-selector">
			<ButtonGroup>
				<Button
					type="submit"
					onClick={() => {
						router.push(
							`${router.pathname}?startDate=${prevStartDate}&endDate=${prevEndDate}`,
						);
					}}
				>
					Prev
				</Button>
				<Button>{currentMonthDate}</Button>
				<Button
					type="submit"
					disabled={nextStartDate > today}
					onClick={() => {
						router.push(
							`${router.pathname}?startDate=${nextStartDate}&endDate=${nextEndDate}`,
						);
					}}
				>
					Next
				</Button>
			</ButtonGroup>
		</div>
	);
};

MonthSelector.propTypes = {
	current: PropTypes.string.isRequired,
};

export default MonthSelector;
