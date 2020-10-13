const Mongoose = require("mongoose");
const storage = require("../config/storage");
const ResponseHelper = require("../helpers/response_helper");
const Batch = require("../models/batch");
const Material = require("../models/material");
const Subject = require("../models/subject");
const MaterialResource = require("../resources/material-resource");
const { v4: uuid } = require('uuid');
const { promises: fs } = require('fs');

module.exports = class MaterialController {
    // Get list of materials
    static async index(req, res) {
        const materials = await Material.find({}).populate('subject').populate('batch');

        return res.json({ materials: new MaterialResource(materials) });
    }

    //  create material
    static async create(req, res) {

        const { title, description, batchId, subject, isPrivate } = req.body;

        // check if subject exists
        const subjectObj = await Subject.findOne({ name: subject });
        if (!subjectObj) {
            return ResponseHelper.validationResponse(res, {
                subject: ["Invalid Subject!"]
            })
        }

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }

        const material = await Material.create({
            title,
            subject: subjectObj._id,
            batch: batch._id,
            description,
            isPrivate
        });

        // to populate subject as well
        const newVideo = await Material.findById(material._id)
            .populate('subject').populate('batch');

        return res.json({
            message: "Material added!",
            video: new MaterialResource(newVideo)
        });
    }

    // upload file to material
    static async updateMaterial(req, res) {
        const { id } = req.params;

        const { file } = req.files;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const material = await Material.findById(id);

        // if not found, return error
        if (!material) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // get file content
        const { data, mimetype, name, size } = file;

        const fileName = uuid() + "." + name.split(".").pop();

        // check for previous saved file and delete it
        if (material.file) {
            try {
                await fs.unlink(storage.getMaterialPath(material.file));
            } catch (error) {
                console.info("Older file " + material.file + " not deleted!");
            }
        }

        // save file
        await fs.writeFile(storage.getMaterialPath(fileName), data);

        // save file info
        material.file = fileName;
        material.fileType = mimetype;
        material.fileUploadedOn = new Date();
        await material.save();

        return res.json({ material: new MaterialResource(material) });
    }

    static async update(req, res) {

        const { id } = req.params;

        const { title, description, batchId, subject, isPrivate } = req.body;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const material = await Material.findById(id);

        // if not found, return error
        if (!material) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        // check if subject exists
        const subjectObj = await Subject.findOne({ name: subject });
        if (!subjectObj) {
            return ResponseHelper.validationResponse(res, {
                subject: ["Invalid Subject!"]
            })
        }

        const batch = await Batch.findById(batchId);

        if (!batch) {
            return ResponseHelper.validationResponse(res, {
                batchId: ["Invalid Batch Id!"]
            })
        }


        material.title = title;
        material.subject = subjectObj._id;
        material.batch = batch._id;
        material.description = description;
        material.isPrivate = isPrivate;

        await material.save();

        // to populate subject as well
        const updatedMaterial = await Material.findById(material._id)
            .populate('subject').populate('batch');

        return res.json({
            message: "Material updated!",
            video: new MaterialResource(updatedMaterial)
        });
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!Mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        const material = await Material.findById(id);

        // if not found, return error
        if (!material) {
            return res.status(404).json({
                message: "Resource with specific id not found"
            });
        }

        await material.remove();

        // check for previous saved file and delete it
        if (material.file) {
            try {
                await fs.unlink(storage.getMaterialPath(material.file));
            } catch (error) {
                console.info("Older file " + material.file + " not deleted!");
            }
        }

        return res.json({
            message: "Material deleted!",
            material: new MaterialResource(material)
        });
    }
}
