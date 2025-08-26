const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

module.exports = { getUserByEmail };
