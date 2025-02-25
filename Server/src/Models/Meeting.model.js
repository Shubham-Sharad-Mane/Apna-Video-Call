import mongoose from "mongoose";

const MeetingSchema=new mongoose.Schema({
    user_id:{
        type:String,
    },
    meetingCode:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    }
});

const Meeting=mongoose.model("Meeting",MeetingSchema);

export default Meeting;