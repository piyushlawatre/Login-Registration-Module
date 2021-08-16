import { connect } from "mongoose";

export const connectMongoDB = async () => {
    try {
        await connect(process.env.MONGO_CONNECTION_STRING as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log();
        console.log(`-------------------- Successfully Connected To MongoDB -------------------`);
        return true;
    } catch (e) {
        throw { message: "Could Not Connect To MongoDB"}
    }
}