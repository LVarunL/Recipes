import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)

        # with self.app.app_context():
        #     db.init_app(self.app)
        #     db.create_all()

    def test_miss_me(self):
        hello_response = self.client.get('/recipe/hello')
        # print(hello_response.json)
        self.assertEqual(hello_response.json, {"message": "Miss Me?"})

    def test_signup(self):
        signup_response = self.client.post('/auth/signup', json={
            "username": "testuser",
            "email": "testuser@testgmail.com",
            "password": "testpassword"
        })
        self.assertEqual(signup_response.status_code, 201)

    def test_login(self):
        signup_response = self.client.post('/auth/signup', json={
             "username": "testuser",
             "email": "testuser@testgmail.com",
             "password": "testpassword"
        })

        login_response = self.client.post('/auth/login', json={
            "username": "testuser",
            "password": "testpassword"
        })
             
        self.assertEqual(login_response.status_code,200)

    def test_get_all_recipes(self):
        response = self.client.get('/recipe/recipes')
        #print(response.json)
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_get_one_recipe(self):
        id = 1
        response = self.client.get(f'/recipe/recipes/{id}')
        status_code = response.status_code
        self.assertEqual(status_code, 404)

    def test_create_recipe(self):
        signup_response = self.client.post('/auth/signup', json={
             "username": "testuser",
             "email": "testuser@testgmail.com",
             "password": "testpassword"
        })

        login_response = self.client.post('/auth/login', json={
            "username": "testuser",
            "password": "testpassword"
        })

        access_token = login_response.json["access_token"]

        create_recipe_response = self.client.post('/recipe/recipes', json={
            "title": "test title",
            "description": "test description",
        }, headers = {"Authorization": f"Bearer {access_token}"})

        status_code = create_recipe_response.status_code
        self.assertEqual(status_code, 201)

    def test_update_recipe(self):
        signup_response = self.client.post('/auth/signup', json={
             "username": "testuser",
             "email": "testuser@testgmail.com",
             "password": "testpassword"
        })

        login_response = self.client.post('/auth/login', json={
            "username": "testuser",
            "password": "testpassword"
        })

        access_token = login_response.json["access_token"]

        create_recipe_response = self.client.post('/recipe/recipes', json={
            "title": "test title",
            "description": "test description",
        }, headers = {"Authorization": f"Bearer {access_token}"})

        id = 1

        update_response = self.client.put(f'/recipe/recipe/{id}', json={
            "title": "test title updated",
            "description": "test description updated",
        },  headers = {"Authorization": f"Bearer {access_token}"})

        # print(update_response.json)
        status_code = update_response.status_code
        self.assertEqual(status_code, 200)
        

    def test_delete_recipe(self):
        signup_response = self.client.post('/auth/signup', json={
             "username": "testuser",
             "email": "testuser@testgmail.com",
             "password": "testpassword"
        })

        login_response = self.client.post('/auth/login', json={
            "username": "testuser",
            "password": "testpassword"
        })

        access_token = login_response.json["access_token"]

        create_recipe_response = self.client.post('/recipe/recipes', json={
            "title": "test title",
            "description": "test description",
        }, headers = {"Authorization": f"Bearer {access_token}"})

        id = 1

        delete_response = self.client.delete(f'/recipe/recipe/{id}', 
            headers = {"Authorization": f"Bearer {access_token}"})
        
        #print(delete_response.json)

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)
    def tearDown(self):

        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == '__main__':
    unittest.main()

