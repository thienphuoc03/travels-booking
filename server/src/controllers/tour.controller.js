import { PrismaClient } from '@prisma/client';
import responseHandler from '../handlers/response.handler.js';
import { validatePageAndLimit } from '../common/utils.js';

const prisma = new PrismaClient();

const getAllTour = async (req, res) => {
  try {
    const { currentPage, perPage } = validatePageAndLimit(
      req.query.page,
      req.query.limit
    );

    const totalTour = await prisma.tour.count();
    const totalPages = Math.ceil(totalTour / perPage);

    const offset = (currentPage - 1) * perPage;

    const tours = await prisma.tour.findMany({
      skip: offset,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    responseHandler.ok(res, {
      currentPage,
      totalPages,
      data: tours,
    });
  } catch (error) {
    responseHandler.error(error);
  }
};

const getTourById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const tour = await prisma.tour.findUnique({
      where: {
        id,
      },
    });

    if (!tour) responseHandler.notFound(res, `Not found Tour with Id: ${id}`);

    responseHandler.ok(res, tour);
  } catch (error) {
    responseHandler.error(error);
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await prisma.tour.create({
      data: {
        ...req.body,
      },
    });

    responseHandler.created(res, newTour);
  } catch (error) {
    responseHandler.error(error);
  }
};

const updateTour = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const tour = await prisma.tour.findUnique({
      where: {
        id,
      },
    });

    if (!tour) responseHandler.notFound(res, `Not found Tour with Id: ${id}`);

    const newTour = await prisma.tour.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });

    responseHandler.ok(res, newTour);
  } catch (error) {
    responseHandler.error(error);
  }
};

const deleteTour = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const tour = await prisma.tour.findUnique({
      where: {
        id,
      },
    });

    if (!tour)
      return responseHandler.notFound(res, `Not found Tour with Id: ${id}`);

    await prisma.tour.delete({
      where: {
        id,
      },
    });

    responseHandler.ok(res, 'Tour deleted successfully');
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  getAllTour,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
