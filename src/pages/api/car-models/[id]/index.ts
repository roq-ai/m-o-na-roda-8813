import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { carModelValidationSchema } from 'validationSchema/car-models';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.car_model
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCarModelById();
    case 'PUT':
      return updateCarModelById();
    case 'DELETE':
      return deleteCarModelById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCarModelById() {
    const data = await prisma.car_model.findFirst(convertQueryToPrismaUtil(req.query, 'car_model'));
    return res.status(200).json(data);
  }

  async function updateCarModelById() {
    await carModelValidationSchema.validate(req.body);
    const data = await prisma.car_model.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCarModelById() {
    const data = await prisma.car_model.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
