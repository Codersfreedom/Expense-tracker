import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import GET_AUTH_USER from "../graphql/queries/user.query";

const Cards = () => {
	const {data,loading} = useQuery(GET_TRANSACTIONS);
	// console.log( data)

	const {data:authUser} = useQuery(GET_AUTH_USER);
	
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
				{!loading && data.length ==0  && (<p className="text-3xl font-bold text-center">Add some transactions </p>)}
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				
				{!loading && data.transactions.map(transaction=>(
					<Card key={transaction._id} transaction={transaction} authUser={authUser.authUser} />
				))}
			</div>
		</div>
	);
};
export default Cards;