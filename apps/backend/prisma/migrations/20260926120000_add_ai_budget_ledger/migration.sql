CREATE TABLE "AiBudgetLedger" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "budgetUsd" DECIMAL(12,8) NOT NULL DEFAULT 5.00000000,
    "spentUsd" DECIMAL(12,8) NOT NULL DEFAULT 0,
    "reservedUsd" DECIMAL(12,8) NOT NULL DEFAULT 0,
    "requests" INTEGER NOT NULL DEFAULT 0,
    "inputTokens" BIGINT NOT NULL DEFAULT 0,
    "outputTokens" BIGINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiBudgetLedger_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "AiBudgetLedger_singleton_check" CHECK ("id" = 1),
    CONSTRAINT "AiBudgetLedger_budget_check" CHECK ("budgetUsd" = 5.00000000),
    CONSTRAINT "AiBudgetLedger_spend_nonnegative_check" CHECK ("spentUsd" >= 0 AND "reservedUsd" >= 0)
);

INSERT INTO "AiBudgetLedger" ("id", "budgetUsd", "spentUsd", "reservedUsd", "requests", "inputTokens", "outputTokens")
VALUES (1, 5.00000000, 0, 0, 0, 0, 0);
