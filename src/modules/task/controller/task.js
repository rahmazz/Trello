import userModel from "../../../../DB/models/user.model.js";
import taskModel from "../../../../DB/models/task.model.js";
import { asyncHandeller } from "../../../utils/errorHandeling.js";
import cloudinary from "../../../utils/cloudinary.js"



export const addTask = asyncHandeller( 
    async (req, res,next) => {
    const userId = req.user._id
    console.log({userId});
    const { title, description, assignTo, deadline } = req.body;
    console.log({ title, description, assignTo, deadline});

    const user =await userModel.findById(assignTo)
    if(!user){
        return next( new Error('this user you want to assign task not exist'));
    }
    const task = await taskModel.create({ title, description, status:'toDo', assignTo,userId, deadline });
    res.status(201).json({ message: 'Task added successfully', task });    
})



export const updateTask = asyncHandeller(
    async(req, res,next) => {
        // const allowedAssignToValues =['toDo', 'doing', 'done']
        const { taskId } = req.params;
        // const userId = req.user
        const { title, description,status, assignTo,userId } = req.body;
        console.log({ title, description,status, assignTo,userId});

        // if (!allowedAssignToValues.includes(status)) {
        //     return res.status(400).json({ error: "Invalid 'statue' value." });
        // }

        const task = await taskModel.findById(taskId);
        if (!task) {
            return next( new Error('Task not found'));
        }
        if (task.userId.toString()!==req.user._id.toString()) {
            return next(new Error('You are not authorized to update this task'));
        }
        const user =await userModel.findById(assignTo)
        if(user){
            const updateTask= await taskModel.findByIdAndUpdate(taskId,{title, description,status, assignTo},{new:true});
            res.status(200).json({ message: 'Task updated successfully', updateTask}); 
        }
            return next( new Error('this user you want to assign task not exist'));

        
});




export const getAllTask =asyncHandeller(
    async(req, res,next) => {
        // const userId = req.user._id; 
        // const {assignTo}=req.task

        const tasks = await taskModel.find().populate([
        {    
            path: "userId assignTo",
            select: "email userName phone "
        }
    ]
            );
        res.status(200).json({ message: 'Done', tasks });
});



export const myTask =asyncHandeller(
    async(req, res,next) => {
        // const  userId  = req.user._id;
        // { userId } = req.user; 
        // const { userId } = req.body;
        const user = await taskModel.findById(req.user._id)
        if(user){
            const tasks = await taskModel.findById(req.user._id).populate(
                'userId', 'userName email'
                );
            res.status(200).json({ message: 'Done', tasks });
            }
            next (new Error("you didn't write any tasks "))
});




export const getOneUserTask=asyncHandeller(
    async(req, res,next) => {
        // const  userId  = req.user._id;

        const tasks = await taskModel.find( {assignTo:req.user._id}).populate(
            'userId', 'userName email'
            );
        res.status(200).json({  message: 'Done',tasks });
});



export const tasksDoneBeforeDeadline = asyncHandeller(
    async(req, res,next) => {
        const currentDate = new Date();

        const tasks = await taskModel.find({status: { $ne: 'done' },
            deadline: { $lt: currentDate }
          }).populate(
            'userId', 'userName email'
            );
        res.status(200).json({  message: 'Done',tasks });
});



export const addAttachmentToTask = asyncHandeller(
    async(req ,res ,next) =>{
        const { public_id , secure_url } = await cloudinary.uploader.upload(
            req.file.path,
            {folder:`saraha/task/${req.task._id}/attachment`}
        )
        const task = await taskModel.findByIdAndUpdate(
            req.task._id,
            {attachment : { public_id , secure_url }},
            {new: true}
    )
        res.json({message:"Done",file :req.file ,task})
    }
)

export const deleteTask = asyncHandeller(
    async(req, res,next) => {
        const { taskId } = req.params;
        console.log({ taskId });
        // const userId = req.user

        const task = await taskModel.findById(taskId);
        if (!task) {
            return next( new Error('Task not found'));
        }
        if (task.userId.toString()!==req.user._id.toString()) {
            return next(new Error('You are not authorized to delete this task'));
        }
            await cloudinary.uploader.destroy(attachment.public_id)
            const deletedTask = await taskModel.findByIdAndDelete(taskId);
            res.status(200).json({ message: 'Task deleted successfully', deletedTask});
        
});

