import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    file_name: String,
    file_size: String,
    file_url: String,
    download_url: String
}, { versionKey: false } );

export const fileModel = mongoose.model("files", fileSchema)