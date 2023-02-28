import {categorias} from './data/categorias'
import { productos } from './data/productos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  try {

    await prisma.categoria.deleteMany();
    console.log('Deleted records in category table');

    await prisma.producto.deleteMany();
    console.log('Deleted records in product table');

    await prisma.$queryRaw`ALTER TABLE Producto AUTO_INCREMENT = 1`;
    console.log('reset product auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Categoria AUTO_INCREMENT = 1`;
    console.log('reset category auto increment to 1');

    await prisma.categoria.createMany({
      data: categorias
    })

    await prisma.producto.createMany({
      data: productos
    })

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
main()