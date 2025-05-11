const router = require("express").Router(); 
const Task = require("../Modals/task"); 
const User = require("../Modals/user");
const authentication = require("../middleware/auth");

// create task 
router.post('/create-task',authentication, async (req,res) => {

    try {
        const { title, desc } = req.body;    
        const {id} = req.headers
        const newTask = new Task({title:title,desc:desc})
        const saveTask = await newTask.save()   
        const taskId = saveTask._id
        await User.findByIdAndUpdate(id,{$push:{tasks:taskId._id}}) 
        res.status(200).json({message:"task created successfully",success:true,saveTask})
    } catch (error) {
        console.error(error.message)    
        return res.status(500).send(" Some external error ocurred")
    }

})

// get all tasks
router.get('/get-all-task',authentication, async (req, res) => {

    try {
        const {id} = req.headers
        const user = await User.findById(id).populate({
            path:"tasks",
            options:{
                sort:{createdAt:-1}
            }
        })
        res.status(200).json({success:true, user})
    } catch (error) {
        console.error(error.message)
        return res.status(500).send(" Some external error ocurred")
    }

})  

// Delete task

router.delete('/delete-task/:id',authentication,async  (req,res) => {
    try {
        const {id} = req.params
        const userId = req.headers.id
        await Task.findByIdAndDelete(id)
        await User.findByIdAndUpdate(userId, {$pull:{tasks:id}}) 
        return res
                .status(200)
                .json({message:"task deleted successfully", success:true})
    } catch (error) {
        console.log(error)
        return res.
                status(500)
                .send(" Some external error ocurred") 
    }
})

// update task 

router.put('/update-task/:id',authentication, async (req,res) => {
    try {
        const {id} = req.params
        const {title, desc} = req.body  
        await Task.findByIdAndUpdate(id, {title:title, desc:desc})
        return res
                .status(200)
                .json({message:"task updated successfully", success:true})
    } catch (error) {
        console.log(error)
        return res.
                status(500)
                .send(" Some external error ocurred")
    }
})

// update imp task

router.put('/update-imp-task/:id',authentication, async (req, res) => {
    try {
        const {id} = req.params
        const TaskData = await Task.findById(id)
        const ImpTask = TaskData.important
        await Task.findByIdAndUpdate(id, {important:!ImpTask})
        return res
                .status(200)
                .json({message:"task updated successfully", success:true})
    } catch (error) {
        console.log(error)
        return res.
                status(500)
                .send(" Some external error ocurred")
    }
})

// update complete task

router.put('/update-complete-task/:id',authentication,async (req, res) => {
    try {
        const {id} = req.params
        const TaskData = await Task.findById(id)
        const CompleteTask = TaskData.completed
        await Task.findByIdAndUpdate(id, {completed:!CompleteTask})
        return res
                .status(200)
                .json({message:"task updated successfully", success:true})
    } catch (error) {
        console.log(error)
        return res.
                status(500)
                .send(" Some external error ocurred")
    }
})  

// get imp task

router.get('/get-imp-tasks',authentication,async (req, res) => {
    try {
        const {id} = req.headers
        const Data = await User.findById(id).populate({
            path:"tasks",
            match:{important:true},
            options:{
                sort:{createdAt:-1}
            }
        })
        const ImpTaskData = Data.tasks
        res.status(200).json({success:true, ImpTaskData})
    } catch (error) {
        console.error(error.message)
        return res.status(500).send(" Some external error ocurred")
    }

})

// get completed task

router.get('/get-complete-tasks',authentication,async (req, res) => {
    try {
        const {id} = req.headers
        const Data = await User.findById(id).populate({
            path:"tasks",
            match:{completed:true},
            options:{
                sort:{createdAt:-1}
            }
        })
        const CompleteTaskData = Data.tasks
        res.status(200).json({success:true, data:CompleteTaskData})
    } catch (error) {
        console.error(error.message)
        return res.status(500).send(" Some external error ocurred")
    }

})
// get imcompleted task 
router.get('/get-incomplete-tasks',authentication,async (req, res) => {
    try {
        const {id} = req.headers
        const Data = await User.findById(id).populate({
            path:"tasks",
            match:{completed:false},
            options:{
                sort:{createdAt:-1}
            }
        })
        const InCompleteTaskData = Data.tasks
        res.status(200).json({success:true, data:InCompleteTaskData})
    } catch (error) {
        console.error(error.message)
        return res.status(500).send(" Some external error ocurred")
    }

})
module.exports = router;