-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameZh" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "descriptionZh" TEXT,
    "contact" TEXT,
    "customerService" TEXT,
    "shopSuffix" TEXT NOT NULL,
    "defaultStyle" TEXT NOT NULL DEFAULT 'style1',
    "shopStatus" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantDomain" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "defaultStyle" TEXT NOT NULL DEFAULT 'style1',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'active',
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantDomain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_shopSuffix_key" ON "Merchant"("shopSuffix");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantDomain_suffix_key" ON "MerchantDomain"("suffix");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantDomain_domain_suffix_key" ON "MerchantDomain"("domain", "suffix");

-- CreateIndex
CREATE INDEX "MerchantDomain_merchantId_idx" ON "MerchantDomain"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantDomain" ADD CONSTRAINT "MerchantDomain_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
