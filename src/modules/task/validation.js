import joi from "joi";

export const addtask = {
  body: joi
    .object({
      title: joi.string().alphanum().min(5).max(15).required(),
      description: joi.string().min(20).max(40).required(),
      deadline: joi.date().greater("now"),
      assignTo: joi.string().max(24).min(24).required(),
    }).required(),
  headers: joi.object({
      authorization: joi.string().required(),
    }).required().options({ allowUnknown: true }),
};

export const updatetask = {
  body: joi
    .object({
      title: joi.string().alphanum().min(5).max(15).required(),
      description: joi.string().min(20).max(40).required(),
      deadline: joi.date().greater("now"),
      assignTo: joi.string().max(24).min(24).required(),
      status: joi.string().valid("toDo", "doing", "done"),
    }).required(),
  params: joi.object({
      taskId: joi.string().max(24).min(24).required(),
    }).required(),
  headers: joi.object({
      authorization: joi.string().required(),
    }).required().options({allowUnknown:true})
};

export const deletetask = {
  params: joi.object({
      taskId: joi.string().max(24).min(24).required(),
    })
    .required(),
  headers: joi.object({
      authorization: joi.string().required(),
    }).required().options({allowUnknown:true})
};

export const mytask = {
  headers: joi.object({
      authorization: joi.string().required(),
    }).required().options({allowUnknown:true})
};

export const getoneusertask = {
  headers: joi.object({
      authorization: joi.string().required(),
    }).required().options({allowUnknown:true})
};
