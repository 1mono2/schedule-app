import { relations } from "drizzle-orm/relations";
import { users, accounts } from "./schema";

export const accountRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));

export const userRelations = relations(users, ({many}) => ({
	accounts: many(accounts),
}));