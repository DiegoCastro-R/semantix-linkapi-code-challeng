import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
    folderName: String,
    folderId: String,
    parentFolderId: String,
    createdAt: Date,
    updatedAt: Date,
});

const Folder = mongoose.model("Folder", FolderSchema);

export { Folder }
