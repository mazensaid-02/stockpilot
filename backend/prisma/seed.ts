import { prisma } from "../src/lib/prisma.js";

async function main() {
  const beverages = await prisma.category.upsert({
    where: { name: "Beverages" },
    update: {},
    create: { name: "Beverages", description: "Drinks and bottled water" },
  });

  const snacks = await prisma.category.upsert({
    where: { name: "Snacks" },
    update: {},
    create: { name: "Snacks", description: "Packaged snack foods" },
  });

  const suppliers = [
    { name: "Acme Distributors", email: "orders@acme.example", phone: "+1-555-0100" },
    { name: "Global Foods", email: "sales@globalfoods.example", phone: "+1-555-0101" },
  ];

  for (const supplier of suppliers) {
    const existing = await prisma.supplier.findFirst({
      where: { name: supplier.name },
    });
    if (!existing) {
      await prisma.supplier.create({ data: supplier });
    }
  }

  const products = [
    {
      sku: "BEV-001",
      name: "Sparkling Water 500ml",
      unitCost: "0.850",
      minimumStock: 20,
      categoryId: beverages.id,
    },
    {
      sku: "BEV-002",
      name: "Orange Juice 1L",
      unitCost: "1.750",
      minimumStock: 15,
      categoryId: beverages.id,
    },
    {
      sku: "SNK-001",
      name: "Salted Chips 150g",
      unitCost: "1.200",
      minimumStock: 30,
      categoryId: snacks.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }

  console.log("Seed complete: categories, suppliers, products");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
