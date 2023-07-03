import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { carModelValidationSchema } from 'validationSchema/car-models';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCarModels();
    case 'POST':
      return createCarModel();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCarModels() {
    const data = await prisma.car_model
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'car_model'));
    return res.status(200).json(data);
  }

  async function createCarModel() {
    await carModelValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.car?.length > 0) {
      const create_car = body.car;
      body.car = {
        create: create_car,
      };
    } else {
      delete body.car;
    }
    const data = await prisma.car_model.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
