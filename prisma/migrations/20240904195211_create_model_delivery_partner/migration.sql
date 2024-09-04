-- CreateTable
CREATE TABLE "delivery_partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "UpdateAt" TIMESTAMP(3),

    CONSTRAINT "delivery_partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_partner_email_key" ON "delivery_partner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_partner_cpf_key" ON "delivery_partner"("cpf");
