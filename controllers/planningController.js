const Planning = require('../models/planningModel');
const Location = require("../models/locationModel");

module.exports.insertPlan = async (req, res) => {
    console.log(req.body);
    const { trip_id, user_id, plan } = req.body;
    let planning = new Planning({
        trip_id: trip_id,
        user_id: user_id,
        plan: plan,
    });

    try {
        await planning.save();
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.updatePlan = async (req, res) => {
    const { trip_id, plan } = req.body;
    try {
        const plan_updated = await Planning.updateOne({ trip_id: trip_id }, { plan: plan });
        // console.log(plan_updated);
        if (plan_updated.nModified === 0) {
            throw new Error('Cannot update');
        } else {
            res.status(201).json(
                {
                    message: "Update completed",
                    success: true
                });
        }
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.getUserPlan = async (req, res) => {
    const { user_id } = req.params;
    try {
        const plan = await Planning.find({ user_id: user_id });
        res.status(200).json({
            success: true,
            data: plan
        });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.getPlanFromID = async (req, res) => {
    const { trip_id } = req.params;
    try {
        const plan = await Planning.findOne({ trip_id: trip_id });
        res.status(200).json({
            success: true,
            data: plan
        });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.getPlanFromLocationTag = async (req, res) => {
    const { tags } = req.body;
    let locations_id = []
    try {
        //find location_id from tags
        const place = await Location.find({ tag: { $in: tags } });
        place.map(location => {
            locations_id.push(location.location_id)
        })
        if (locations_id !== null) {
            //find plan from location_id
            const plan = await Planning.find({ "plan.location_id": { $in: locations_id } });
            res.status(200).json({
                success: true,
                found: plan.length,
                data: plan
            });
        } else {
            res.status(200).json({
                success: true,
                data: null
            });
        }
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}