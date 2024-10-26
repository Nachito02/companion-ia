const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Famous people" },
                { name: "Movies and TV" },
                { name: "Musicians" },
                { name: "Games" },
                { name: "Philosophy" },
                { name: "Scientists" },
            ]
        })
    } catch (error) {
        console.log('error seding caregorys')
    } finally {
        await db.$disconnect();
    }
}

main();