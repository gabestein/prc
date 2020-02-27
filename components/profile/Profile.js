import './profile.scss';
import React from 'react';
import { FormGroup, NumericInput, Button } from '@blueprintjs/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PROFILE_QUERY from '../../graphql/profile.query';
import PROFILE_MUTATION from '../../graphql/profile.mutation';

const Profile = () => {
	const { data, loading, error } = useQuery(PROFILE_QUERY);
	const [updateQuiz] = useMutation(PROFILE_MUTATION);
	const incomeRef = React.createRef();
	const retirementRef = React.createRef();
	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <pre>Error: {JSON.stringify(error)}</pre>;
	}
	const profile = { income: data.users[0].income, retirement: data.users[0].retirement };
	return (
		<div className="profile">
			<h2>About You</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateQuiz({
						variables: {
							income: incomeRef.current.state.value,
							retirement: retirementRef.current.state.value,
						},
					});
				}}
			>
				<FormGroup
					helperText="How much money do you take home from your paycheck each month?"
					label="Monthly Income, After Taxes"
					labelFor="post-tax-income"
				>
					<NumericInput id="post-tax-income" value={profile.income} ref={incomeRef} />
				</FormGroup>
				<FormGroup
					helperText="How much money do you automatically take out of your paycheck to put into savings or retirement?"
					label="Savings Withheld From Paycheck"
					labelFor="savings"
				>
					<NumericInput
						id="savings-withheld"
						value={profile.retirement}
						ref={retirementRef}
					/>
				</FormGroup>
				<Button type="submit" text="Submit" />
			</form>
		</div>
	);
};

export default Profile;
