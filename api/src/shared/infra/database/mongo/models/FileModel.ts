import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    fileName: String,
    fileId: String,
    folderId: String,
    deleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
});

const File = mongoose.model("File", FileSchema);

export { File }
