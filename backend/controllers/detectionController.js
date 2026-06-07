import Detection from "../models/Detection.model.js";
export const getDetections = async (
  req,
  res
) => {
  try {

    const detections =
      await Detection.find({
        userId: req.user.userId,
      }).sort({
        createdAt: -1,
      });

    res.json(detections);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch history",
    });
  }
};