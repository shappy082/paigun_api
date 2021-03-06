const mongoose = require("mongoose");
const Location = require("../models/locationModel");

module.exports.getLocation = async function (req, res, next) {
  const { location_id } = req.params;
  try {
    const location = await Location.findOne({ location_id: location_id });
    res.status(200).json({
      success: true,
      data: location,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createLocation = async (req, res) => {
  // console.log(req.body);
  const { tag, location_name, location } = req.body;
  Location.find().countDocuments(async function (error, count) {
    if (error) {
      res.status(500).json({
        errors: { error },
      });
    }

    let post = new Location({
      location_id: count + 1,
      tag: tag,
      location_name: location_name,
      location: location,
    });
    const exist = await Location.findOne({
      location_name: location_name,
      tag: tag,
    });
    if (exist !== null) {
      res.status(500).json({
        errors: "Location exist",
      });
    } else {
      try {
        await post.save();
        res.status(201).json({ success: true });
      } catch (err) {
        res.status(500).json({
          errors: { err },
        });
      }
    }
  });
};

module.exports.updateLocation = async (req, res) => {
  try {
    //const { id } = req.params;
    const { location_id, tag, location_name, location } = req.body;
    console.log(req.body);
    // console.log(`user_id : ${user_id}`);
    // console.log(`user_id_req : ${user_id_req}`);
    // console.log(`flag_submit : ${flag_submit}`);
    const post = await Location.updateOne(
      {
        location_id: location_id,
      },
      {
        tag: tag,
        location_name: location_name,
        location: location,
      }
    );
    console.log(post);
    if (post.nModified === 0) {
      throw new Error("Cannot update");
    } else {
      res.status(201).json({
        message: "Update completed",
        success: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: [
        {
          code: 500,
          message: err.message,
        },
      ],
    });
  }
};

module.exports.tagLocation = async (req, res) => {
  const { tag } = req.body;
  // console.log(tag);
  // console.log(`comment _id : ${_id}`);
  try {
    //{ tags: ["red", "blank"] }
    const tag_found = await Location.find({ tag: { $all: tag } });
    res.status(200).json({
      success: true,
      found: tag_found.length,
      data: tag_found,
    });
  } catch (err) {
    res.status(500).json({
      errors: { err },
    });
  }
};

module.exports.nameLocation = async (req, res) => {
  const { location_name } = req.body;
  // console.log(tag);
  // console.log(`comment _id : ${_id}`);
  try {
    //{ tags: ["red", "blank"] }
    const location_found = await Location.find({
      location_name: location_name,
    });
    res.status(200).json({
      success: true,
      found: location_found.length,
      data: location_found,
    });
  } catch (err) {
    res.status(500).json({
      errors: { err },
    });
  }
};
