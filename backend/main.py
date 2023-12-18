import os
from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from config import DevConfig, TestConfig
from models import Recipe, User
from exts import db
from flask_migrate import Migrate
from auth import auth_ns
from recipes import recipe_ns
from flask_jwt_extended import JWTManager

def create_app(config):

    app = Flask(__name__)
    

    app.config.from_object(config)

    
    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app,doc='/docs')

    api.add_namespace(auth_ns)
    api.add_namespace(recipe_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            'db':db,
            'Recipe':Recipe,
            'User':User 
        }
        


    with app.app_context():
        db.create_all()


    return app