import { asyncHandeller } from "../../../utils/errorHandeling.js";
import userModel from "../../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../../../utils/cloudinary.js";

export const userProfile = asyncHandeller(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    return res.status(200).json({ massege: "Hello", user });
});

export const changePassword = asyncHandeller(async (req, res, next) => {
    const password = req.user.password;
    const { oldPassword, newPassword, cPassword } = req.body;
    console.log({ oldPassword, newPassword, cPassword });

    if (req.user.isDeleted) {
        return next(new Error("this email is deleted please login again"));
    }
    if (req.user.isOnline) {
        if (newPassword != cPassword) {
            return next(new Error("Password miss match confirmpassword"));
        }
        if (!bcrypt.compareSync(oldPassword, password)) {
            return next(new Error("password not match your password"));
        }
        const newHash = bcrypt.hashSync(newPassword, 4);
        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { password: newHash },
            { new: true }
        );
        return res
            .status(200)
            .json({ massege: "password Updated Sucessfully", user });
    }
    return next(new Error("plz login first"));
});

export const updateUser = asyncHandeller(async (req, res, next) => {
    const { age, fName, lName } = req.body;
    console.log({ age, fName, lName });

    if (req.user.isDeleted) {
        return next(new Error("this email is deleted please login again"));
    }
    if (req.user.isOnline) {
        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { age, fName, lName },
            { new: true }
        );
        return res.status(200).json({ message: "User Updated Sucessfully", user });
    }
    return next(new Error("plz login first"));
});

export const softDelete = asyncHandeller(async (req, res, next) => {
    if (req.user.isDeleted) {
        return next(
            new Error("this email is deleted please login again", { cause: 404 })
        );
    }
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { isDeleted: true },
        { new: true }
    );
    return res.status(200).json({ message: "User Deleted Sucessfully", user });
});

export const logout = asyncHandeller(async (req, res, next) => {
    if (req.user.isDeleted) {
        return next(
            new Error("this email is deleted please login again", { cause: 404 })
        );
    }
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { isOnline: false },
        { new: true }
    );
    return res.status(200).json({ message: "User loggedout Sucessfully", user });
});

export const profileImage = asyncHandeller(async (req, res, next) => {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `saraha/user/${req.user._id}/profile` }
    );
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { profileImage: { public_id, secure_url } },
        { new: true }
    );
    if (!user) {
        await cloudinary.uploader.destroy(public_id);
    }
    return res.json({ message: "Done", file: req.file, user });
});

export const profileCoverImages = asyncHandeller(async (req, res, next) => {
    const coverImage = [];
    for (const file of req.files) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(
            file.path,
            { folder: `saraha/user/${req.user._id}/cover` }
        );
        coverImage.push({ public_id, secure_url });
    }
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { coverImage },
        { new: true }
    );

    return res.json({ message: "Done", user, file: req.files });
});

export const deleteUser = asyncHandeller(
    async(req,res,next)=>{
        const {profileImage} = req.user
        const {coverImage} = req.user
        if(req.user.isDeleted){
            return next(new Error("this email is deleted please login again"))
        }if(req.user.isOnline){
            if (coverImage.length > 0) {
                const publicIdsToDelete = coverImage.map((img) => img.public_id);
                await cloudinary.api.delete_resources(publicIdsToDelete);
            }
            const user = req.user.profileImage.public_id
            await cloudinary.uploader.destroy(profileImage.public_id)
            const deleteduser = await userModel.findByIdAndDelete(req.user._id)
            return res.status(200).json({message:"User Deleted Sucessfully",deleteduser})
        }
        return next(new Error("plz login first"))
    }
)


