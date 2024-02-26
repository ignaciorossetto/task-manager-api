"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneTask = exports.addTask = exports.modifyTitleDescrOfTask = exports.toggleCompleteTask = exports.fetchOneTask = exports.fetchAllTasks = void 0;
const task_repository_1 = require("../DAO/repository/task.repository");
const error_1 = __importDefault(require("../utils/error"));
const fetchAllTasks = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, task_repository_1.getAllTasks)(filter);
});
exports.fetchAllTasks = fetchAllTasks;
const fetchOneTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, task_repository_1.getOneTask)(id);
    if (!task) {
        throw (0, error_1.default)({
            name: "Task not found",
            code: 404,
            message: `Invalid id: ${id}`,
            layer: "Service",
            status: "Error",
        });
    }
    return task;
});
exports.fetchOneTask = fetchOneTask;
const toggleCompleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = (yield (0, exports.fetchOneTask)(id));
    return yield (0, task_repository_1.updateTask)(id, { completed: !task.completed });
});
exports.toggleCompleteTask = toggleCompleteTask;
const modifyTitleDescrOfTask = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, exports.fetchOneTask)(id);
    if (!task) {
        return (0, error_1.default)({
            name: "Task not found",
            message: "Task not found",
            code: 404,
            layer: "Service",
            status: "Error",
        });
    }
    return yield (0, task_repository_1.updateTask)(id, obj);
});
exports.modifyTitleDescrOfTask = modifyTitleDescrOfTask;
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    const _task = yield (0, task_repository_1.createTask)(task);
    return _task;
});
exports.addTask = addTask;
const deleteOneTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.fetchOneTask)(id);
    yield (0, task_repository_1.deleteTask)(id);
});
exports.deleteOneTask = deleteOneTask;
