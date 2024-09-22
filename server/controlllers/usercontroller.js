const users = require('../db/models/user')
const { successfunction, errorfunction } = require('../util/responseHandler')


exports.Create = async  function (req,res){
    try {
        let body = req.body;
        console.log('body',body);
        let view = await users.create(body);
        console.log('view',view);

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "successfully added.."
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.items = async function (req,res){
    try {
        let sections = await users.find();
        console.log('sections',sections)
        // let strsection = JSON.stringify(sections);

        if(sections){
            res.status(200).json(sections);
        }else{
            res.status(404).send('Not data found')
        }
    } catch (error) {
        res.status(500).send('server error');
    }
}

exports.value = async function(req,res){

    let single_id = req.params.id;
    console.log('id from single',single_id);

    let one_data = await users.findOne({_id: single_id})
    console.log('one_data',one_data);

    // let Stringfy_data = JSON.stringify(one_data)
    // console.log('Stringfy_data',Stringfy_data);

    if(one_data){
        res.status(200).send(one_data)
    }else{
        res.status(404).send('stringfy_data fetching fail');
    }
    
}

exports.del = async function(req,res){
    try {
        let delete_id =req.params.id;
        console.log('delete_id',delete_id);

        let delete_onedata = await users.deleteOne({_id : delete_id});
        res.status(200).send(delete_onedata)
    } catch (error) {
        console.log('error',error)
    }
}
exports.edit = async function(req,res){
    try {
        let body = req.body;
        console.log('body',body);

        // let obj = {
        //     Title: body.Title,
        //     Publisher:body.Publisher,
        //     Author:body.Author,
        //     Price:body.Price,
        //     Description:body.Description,
        //     About:body.About,
        //     Released:body.Released,
        //     Reviews:body.Reviews,
        //     Coverartist:body.Coverartist
        // };

        // console.log('obj',obj);

        let id = req.params.id;

        let updatedata = await users.updateOne({ _id : id }, { $set: body });
        console.log('updatedata',updatedata);

        let strupdatedata = JSON.stringify(updatedata);
        console.log('strupdatedata',strupdatedata)

        if(updatedata){
            res.status(200).send(strupdatedata)
        }else{
            res.status(400).send('update failed')
        }

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product'); 
    }
}

