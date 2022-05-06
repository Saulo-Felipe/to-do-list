import { Sequelize } from "sequelize";

// postgres://jgsmcymc:x-4wCGm1Cl2z4UxH1qT6vXubP4p5_L3B@tuffi.db.elephantsql.com/jgsmcymc

export const sequelize = new Sequelize("jgsmcymc", "jgsmcymc", "x-4wCGm1Cl2z4UxH1qT6vXubP4p5_L3B", {
  host: "tuffi.db.elephantsql.com",
  dialect: "postgres"
});
