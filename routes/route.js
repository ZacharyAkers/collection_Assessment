const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/bicyclePlus");

const collectionSchema = new Schema({
  brand: {type:String, required:true,},
  details: [{
      type: {type:String},
      numberStrings: {type: Number},
      price: {type: Number},
  }],
  color: {type: String} 
});

const Collection = mongoose.model("Collection", collectionSchema);

router.get('/', function(req, res){
  Collection.find({}).then(function(collections){
    res.render("guitar", {collections: collections})
  })
})

router.post("/guitar",function (req,res) {
  let newCollection = new Collection({
    brand:req.body.brand,
    color:req.body.color
  });
    newCollection.details.push ({
        type:req.body.type,
        numberStrings:req.body.numOfStrings,
        price:req.body.price
    });
    console.log(newCollection.toObject());
    newCollection.save().then(function(guitar){
        console.log(guitar);
        res.redirect('/');
    });
});

router.post("/:newCollectionId/delete", function(req, res) {
    Collection.deleteOne({_id: req.params.newCollectionId}).then(function(newCollection){
      res.redirect("/");
    })
});

router.get("/:newCollectionId/edit", function(req, res){
  Collection.findOne({_id: req.params.newCollectionId}).then(function(collection){
    res.render("edit", {collection: collection})
  })
});

router.post("/edit", function(req, res){
  cards.updateOne({
    _id: req.body.button
    },

    { brand:req.body.brand,
    color:req.body.color,
      'details.0': {
        type:req.body.type,
        numberStrings:req.body.numOfStrings,
        price:req.body.price}
    }).then(function(newCollection){
    res.redirect("/");
  })
});

module.exports = router;