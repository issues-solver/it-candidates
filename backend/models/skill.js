import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    value: {
        type: String,
    },
});

export default mongoose.model('Skill', skillSchema);
