from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe, User
from exts import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

migrate = Migrate(app, db)

api = Api(app,doc='/docs')

#model serializer
recipe_model = api.model(
    'Recipe',
    {
        'id':fields.Integer(required=True,description='Recipe ID'),
        'title':fields.String(required=True,description='Recipe Title'),
        'description':fields.String(required=True,description='Recipe Description')
    }
)


# @app.before_first_request
# def create_tables():
#     db.create_all()


@api.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {'message':'Miss Me?'}

@api.route('/recipes')
class RecipesResource(Resource):

    @api.marshal_list_with(recipe_model)
    def get(self):
        """get all the recipes"""
        recipes = Recipe.query.all()

        return recipes

    @api.marshal_with(recipe_model)
    def post(self):
        """create a new recipe"""
        data = request.get_json()

        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description')
        )

        new_recipe.save()

        return new_recipe,201

@api.route('/recipe/<int:id>')
class RecipeResource(Resource):

    @api.marshal_with(recipe_model)
    def get(self,id):
        """get a recipe by id"""
        recipe = Recipe.query.get_or_404(id)

        return recipe
    
    @api.marshal_with(recipe_model)
    def put(self,id):
        """update a recipe by id"""
        recipe_to_update = Recipe.query.get_or_404(id)

        data = request.get_json()

        recipe_to_update.update(data.get('title'),data.get('description'))

        return recipe_to_update

    @api.marshal_with(recipe_model)
    def delete(self,id):
        """delete a recipe by id"""
        recipe_to_delete = Recipe.query.get_or_404(id)
        
        recipe_to_delete.delete()

        return recipe_to_delete


@app.shell_context_processor
def make_shell_context():
    return {
        'db':db,
        'Recipe':Recipe
    }
    


with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run()