"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneTask = exports.toggleCompletedTask = exports.updateTask = exports.addOneTask = exports.getOneTask = exports.getAllTasksFromUser = void 0;
const taskService = __importStar(require("../services/task.service"));
const getAllTasksFromUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const tasks = yield taskService.fetchAllTasks({
            ownerId: id,
        });
        res.json({
            status: "OK",
            payload: tasks,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTasksFromUser = getAllTasksFromUser;
const getOneTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const tasks = yield taskService.fetchOneTask(id);
        res.json({
            status: "OK",
            payload: tasks,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneTask = getOneTask;
const addOneTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = {
            title: req.body.title,
            description: req.body.description,
            completed: false,
            ownerId: req.body.ownerId,
        };
        const newTask = yield taskService.addTask(task);
        res.json({
            status: "OK",
            payload: newTask,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addOneTask = addOneTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const title = { title: req.body.title } || undefined;
    const description = { description: req.body.description } || undefined;
    const obj = Object.assign(Object.assign({}, title), description);
    try {
        const updatedTask = yield taskService.modifyTitleDescrOfTask(id, obj);
        res.json({
            status: "OK",
            payload: updatedTask,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
const toggleCompletedTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const updatedTask = yield taskService.toggleCompleteTask(id);
        // cubrir que venga null
        res.json({
            status: "OK",
            payload: updatedTask,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.toggleCompletedTask = toggleCompletedTask;
const deleteOneTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield taskService.deleteOneTask(id);
        res.json({
            status: "OK",
            payload: "Deleted",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOneTask = deleteOneTask;
