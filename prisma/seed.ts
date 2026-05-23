import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.adminUser.upsert({
    where: { email: "demo@minishop.pro" },
    update: {},
    create: { email: "demo@minishop.pro", name: "Demo Admin", role: "admin" },
  });

  const defaultDomain = process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL).host
    : "localhost:3000";

  const merchants = [
    {
      id: "merchant-demo",
      name: "小店智选 Demo Store",
      shopSuffix: "demo-shop",
      defaultStyle: "style1",
    },
    {
      id: "merchant-demo-2",
      name: "WeCatalog Style Reference Shop",
      shopSuffix: "7IOvjtH",
      defaultStyle: "style2",
    },
  ] as const;

  for (const m of merchants) {
    await prisma.merchant.upsert({
      where: { shopSuffix: m.shopSuffix },
      update: { name: m.name, defaultStyle: m.defaultStyle },
      create: {
        id: m.id,
        name: m.name,
        shopSuffix: m.shopSuffix,
        defaultStyle: m.defaultStyle,
        description: "Public demo shop",
        contact: "contact@minishop.pro",
        customerService: "minishop-demo",
      },
    });
    await prisma.merchantDomain.upsert({
      where: { suffix: m.shopSuffix },
      update: { domain: defaultDomain, defaultStyle: m.defaultStyle, status: "active" },
      create: {
        merchantId: m.id,
        domain: defaultDomain,
        suffix: m.shopSuffix,
        defaultStyle: m.defaultStyle,
        isPrimary: true,
        status: "active",
      },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
