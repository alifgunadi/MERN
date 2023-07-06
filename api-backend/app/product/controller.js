const path = require("path");
const fs = require("fs");
const config = require("../config.js");
const Product = require("./model.js");
const Category = require('../category/model.js');
const Tag = require('../tag/model.js');
const Users = require('../user/model.js');


const index = async (req, res, next) => {
    try {
        // let product = await Product.find().populate("category tags");
        let { skip = 0, limit = 100, search = '', category = '', tags = '' } = req.query;
        let criteria = {};

        if (search.length) {
            criteria = { ...criteria, name: {$regex: `${search}`, $options: `i`}};
        };

        if (category.length) {
            let categoryResult = await Category.findOne({name: {$regex: `${category}`, $options: 'i'}});
            if (categoryResult) {
                criteria = { ...criteria, category: categoryResult._id };
            } else {
                res.json({
                    status: 'Failed',
                    message: 'Resource Not Found: ' + req.originalUrl,
                });
            }
        };

        if (tags.length) {
            let tagsResult = await Tag.find({name: {$in: tags} });
            if (tagsResult.length > 0) {
                criteria = { ...criteria, tags: {$in: tagsResult.map(tag => tag._id)} };
            } else {
                res.json({
                    status: 'Failed',
                    message: 'Resource Not Found: ' + req.originalUrl,
                });
            }
        };

        console.log("HERE");
        
        let product = await Product.find(criteria).skip(parseInt(skip)).limit(parseInt(limit)).populate("category tags");
        // let count = await Product.find().countDocuments();
        return res.json(product);
    } catch (error) {
        console.log("ERROR", error);
        if (error && error.name === `Validations error`) {
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors,
            });
        }
        next(error);
    };
};

const getId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const product = await Product.findById(id, payload).populate("category tags");
      return res.json(product);
    } catch (error) {
        if (error && error.name === "Validation Error") {
            return res.status(400).json({
            error: 1,
            message: error.message,
            fields: error.errors,
            });
      } else {
        return next(error);
      }
    }
};

const deleteItem = async (req, res, next) => {
    try {
        // let payload = req.body;
        // let { id } = req.params.id;
        // let product = await Product.findByIdAndDelete(
        //   id, { ...payload }
        // );
        // console.log("Deleted", product);
        // return res.json(product);

        let { id } = req.params;
        let payload = req.body;
        let product = await Product.findByIdAndDelete(id, {...payload});
        let currentImage = `${config.rootPath}/images/products/${product.image_url}`;

        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
        };
        console.log("Deleted", product);
        return res.json(product);

        // let { id } = req.params;
        // let user_id = req.body;

        // const user = await Users.findById(user_id);
        // if (!user.admin) {
        //     return res.send({
        //         message: "You're not admin"
        //     })
        // };
        // const product = await Product.findByIdAndDelete(id);
        // return res.json(product);
    } catch (error) {
        if (error && error.name === `Validation Error`) {
            res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            });
        }
        next(error);
    };
};

const store = async (req, res, next) => {
    try {
        let payload = req.body;

      if (payload.category) {
        let category = await Category.findOne({name: {$regex: payload.category, $options: 'i'}});
        if (category) {
          payload = {...payload, category: category._id};
        } else {
          delete payload.category;
        }
      };

      if (payload.tags && payload.tags.length > 0) {
        let tags = await Tag.find({name: {$in: payload.tags}});
        if (tags.length) {
          payload = {...payload, tags: tags.map(tag => tag._id)};
        } else {
          delete payload.tags;
        }
      };

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
            let filename = req.file.filename + "." + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on("end", async () => {
                try {
                    let product = new Product({ ...payload, image_url: filename });
                    await product.save();
                    // console.log("done", product);
                    res.status(200).json(product);
                    return;
                } catch (error) {
                    fs.unlinkSync(target_path);
                    if (error && error.name === "Validation Error") {
                        return res.json({
                            error: 1,
                            message: error.message,
                            fields: error.errors,
                        });
                    }
                    next(error);
                }
            });

            src.on("error", async () => {
                next(error);
            });
            
        } else {

            let product = new Product({ ...payload, 
                image_url: payload.images.map(image => image.url)
            });
            await product.save();
            return res.json(product);
        }

        
    } catch (error) {
        if (error && error.name === `Validation Error`) {
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        };
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
      let payload = req.body;
      let { id } = req.params;
  
      if (payload.category) {
        let category = await Category.findOne({
          name: { $regex: payload.category, $options: "i" },
        });
        if (category) {
          payload = { ...payload, category: category._id };
        } else {
          delete payload.category;
        }
      }
  
      if (payload.tags && payload.tags.length > 0) {
        let tags = await Tag.find({ name: { $in: payload.tags } });
        if (tags.length) {
          payload = { ...payload, tags: tags.map((tag) => tag._id) };
        } else {
          delete payload.tags;
        }
      }
  
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/images/products/${filename}`
        );
  
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
  
        src.on("end", async () => {
          try {
            let product = await Product.findById(id);
            let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`;
  
            // console.log(currentImage);
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
  
            await Product.findByIdAndUpdate(id, payload, {
              new: true,
              runValidators: true,
            });
            product = await Product.findById(id);
            return res.json(product);
          } catch (error) {
            fs.unlinkSync(target_path);
            if (error && error.name === "Validation Error") {
              return res.json({
                error: 1,
                message: error.message,
                fields: error.errors,
              });
            }
            next(error);
          }
        });
  
        src.on("error", async (error) => {
          next(error);
        });
      } else {
        let product = await Product.findByIdAndUpdate(
          id, { ...payload, new: true, image_url: payload.images.map(image => image.url) }
        );
        console.log("Update Done", product);
        return res.json(product);
      }
    } catch (error) {
      if (error && error.name === "Validation Error") {
        return res.json({
          error: 1,
          message: error.message,
          fields: error.errors,
        });
      }
      next(error);
    }
  };

const addToCart = async (req, res) => {
    const {userId, productId, price} = req.body;

    try {
      const user = await Users.findById(userId);
      const userCart = user.cart;
      if(user.cart[productId]){
        userCart[productId] += 1;
      } else {
        userCart[productId] = 1;
      }
      userCart.count += 1;
      userCart.total = Number(userCart.total) + Number(price);
      const updated = await Users.findOneAndUpdate({ _id: userId }, {
        cart: userCart
      }, { new: true });
      user.markModified('cart');
      res.status(200).json(updated);
    } catch (error) {   
        console.log(error);
        if (error && error.name === "Validation Error") {
            return res.json({
                error: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

const increaseCart = async (req, res) => {
    const {userId, productId, price} = req.body;

    try {
      const user = await Users.findById(userId);
      const userCart = user.cart;
      userCart.total += Number(price);
      userCart.count += 1;
      userCart[productId] += 1;
      user.cart = userCart;
      const update = await Users.findOneAndUpdate({ _id: userId }, { cart: userCart }, { new: true });
      res.status(200).json(update);
    } catch (error) {
        if (error && error.name === "Validation Error") {
            return res.json({
                error: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

const decreaseCart = async (req, res) => {
    const {userId, productId, price} = req.body;

    try {
      const user = await Users.findById(userId);
      const userCart = user.cart;
      userCart.total -= Number(price);
      if (userCart.total < 0) {
        return userCart.total = 0;
      }
      userCart.count -= 1;
      if (userCart.count < 0) {
        return userCart.count = 0;
      }
      userCart[productId] -= 1;
      if (userCart[productId] < 0) {
        return userCart[productId] = 0;
      }
      user.cart = userCart;
      const update = await Users.findOneAndUpdate({ _id: userId }, { cart: userCart }, { new: true });
      res.status(200).json(update);
    } catch (error) {
        if (error && error.name === "Validation Error") {
            return res.json({
                error: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

const removeCart = async (req, res) => {
    const {userId, productId, price} = req.body;

    try {
      const user = await Users.findById(userId);
      const userCart = user.cart;
      userCart.total -= Number(userCart[productId]) * Number(price);
      userCart.count -= userCart[productId];
      delete userCart[productId];
      const update = await Users.findOneAndUpdate({ _id: userId }, { cart: userCart }, { new: true });
      res.status(200).json(update);
    } catch (error) {
        if (error && error.name === "Validation Error") {
            return res.json({
                error: error,
                message: error.message,
                fields: error.errors
            })
        }
    }
};

module.exports = {
    index,
    getId,
    deleteItem,
    store,
    update,
    addToCart,
    increaseCart,
    decreaseCart,
    removeCart,
};