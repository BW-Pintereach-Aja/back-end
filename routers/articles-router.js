const router = require("express").Router();
const Articles = require("../models/articles-model");
const { findById } = require("../models/users-model");

// get a list of existing categories
router.get("/categories", async (req, res, next) => {
  try {
    res.status(200).json(await Articles.getCategories());
  } catch (error) {
    next(error);
  }
});

// get all articles
router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Articles.getArticles());
  } catch (error) {
    next(error);
  }
});

// get article by articleID
router.get("/:id", async (req, res, next) => {
  try {
    const article = await Articles.getArticleById(req.params.id);
    console.log(article);
    if (article.length === 0) {
      return res
        .status(404)
        .json({ message: "Article by that ID does not exist" });
    }
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
});

// get all articles from a user
router.get("/:userID/user", async (req, res, next) => {
  try {
    res.status(200).json(await Articles.getByUser(req.params.userID));
  } catch (error) {
    next(error);
  }
});

// get all articles from a category
router.get("/:categoryID/category", async (req, res, next) => {
  try {
    const found = await Articles.getByCategory(req.params.categoryID);
    if (found.length === 0) {
      return res
        .status(404)
        .json({ message: "Category by that ID does not exist" });
    }
    res.status(200).json(found);
  } catch (error) {
    next(error);
  }
});

// save new article
router.post("/:userID/user", async (req, res, next) => {
  try {
    const article = {
      url: req.body.url,
      title: req.body.title,
      desc: req.body.desc,
      userID: Number(req.params.userID),
    };

    const newArticle = await Articles.addArticle(article);

    const category = {
      categoryID: Number(req.body.categoryID),
      articleID: Number(newArticle[0]),
    };

    const posted = await Articles.addToCategory(category);

    res.status(201).json(posted);
  } catch (error) {
    next(error);
  }
});

// create new category
router.post("/new-category", async (req, res, next) => {
  try {
    const exists = await Articles.findCategory(req.body.name).first();
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }
    res.status(201).json(await Articles.addCategory(req.body));
  } catch (error) {
    next(error);
  }
});

// edit an article
router.put("/:articleID", async (req, res, next) => {
  try {
    const article = {
      url: req.body.url,
      title: req.body.title,
      desc: req.body.desc,
    };

    const edited = await Articles.editArticle(article, req.params.articleID);
    res.status(201).json({ edited });
  } catch (error) {
    next(error);
  }
});

// edit a category
router.put("/:categoryID/edit-category", async (req, res, next) => {
  try {
    const edited = await Articles.editCategory(req.body, req.params.categoryID);
    res.status(201).json({ edited });
  } catch (error) {
    next(error);
  }
});

// remove an article
router.delete("/:articleID/remove-article", async (req, res, next) => {
  try {
    res.status(200).json(await Articles.removeArticle(req.params.articleID));
  } catch (error) {
    next(error);
  }
});

// remove a category
router.delete("/:categoryID/remove-category", async (req, res, next) => {
  try {
    res.status(200).json(await Articles.removeCategory(req.params.categoryID));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
