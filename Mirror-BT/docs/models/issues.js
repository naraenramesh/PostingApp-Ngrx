const mongoose=require('mongoose')
const unique_validator=require('mongoose-unique-validator');
const betterId = require('mongoose-better-id');
//const autoIncrement = require('mongoose-sequence')(mongoose);
const issuesschema=mongoose.Schema({
    issueId:{type:String, required:true, unique:true},
    issue_title:{type:String, required:true, unique:true},
    issue_desc:{type:String, required:true},
    issue_date:{type:Date, required:true},
    issue_type:{type:String, required:true},
    related_team:{type:String, required:true},
    issue_status:{type:String, required:true},
    issue_updates:{type:String}
})
var connection = mongoose.createConnection("mongodb+srv://mirror:9GJRW8geA2FAMsdG@cluster0.hkf6m.mongodb.net/MIRROR_PROD?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology : true});
issuesschema.plugin(unique_validator);
issuesschema.plugin(betterId, {
    connection,
    field: 'issueId',
    prefix: 'MR_IS',
    suffix: {
      start: 10000000,
      step: 1,
      max:99999999,
    },  timestamp: {
        enable: false
      }
  });

    
module.exports=mongoose.model('IssuesModel',issuesschema)
