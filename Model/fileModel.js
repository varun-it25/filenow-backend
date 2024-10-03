import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    file_name: String,
    file_url: String,
    file_size: String
}, { versionKey: false } );

export const fileModel = mongoose.model("files", fileSchema)