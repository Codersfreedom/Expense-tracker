import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_,__, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error in getting transactions:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        
        const transaction = await Transaction.findById(transactionId);
        return transaction;
        
      } catch (error) {
        console.error("Error in getting transaction:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    //? Todo -> add categoryStatistics
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });

        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error in CreateTransaction:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    updateTransaction: async (_, { input }) => {
      console.log(input)
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true});
        console.log(updatedTransaction)
        return updatedTransaction;
      } catch (error) {
        console.error("Error in UpdateTransaction:", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
        try {
          console.log(transactionId);
            const deleteTransacton = await Transaction.findByIdAndDelete(transactionId);
            return deleteTransacton;
        } catch (error) {
            console.error("Error in DeleteTransaction:", error);
        throw new Error(error.message || "Internal server error");
        }
    },
    //? Add transaction delete user relationship
  },
};
export default transactionResolver;
