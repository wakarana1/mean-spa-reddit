var Article = require('../models/Article');

function index(request, response) {
    Article.find(function(error, articles) {
        if (error) console.error('could not get articles because', error);

        response.json(articles);
    });
}

function create(request, response) {
        console.log(request.body);
        var article = new Article(request.body);
        article.save(function(error) {
            if(error) console.error('Could not create because', error);

            response.json({message: 'Article successfully created'});
        });
    }

function show(request, response) {
        Article.findById(request.params.article_id, function(error, article) {
            if (error) console.error('could not get article');

            response.json(article);
        });
    }

function update(request, response) {
        var data = request.body;

        Article.findById(request.params.article_id, function(error, article) {
            if (error) console.error('could not update article');
            Object.keys(data).forEach(function(key) {
                article.set(key, data[key]); // set replaces the value of a field with the specified value
            });
            article.save(function(error) {
                if (error) console.error('could not patch');

                response.json({message: 'article successfully update'});
            });
        });
    }

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update
};