from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
from flask import Flask,request,jsonify
import secrets
app = Flask(__name__)
PORT = 8004
from flask_cors import CORS

CORS(app)  # Allows all origins by default

from dotenv import load_dotenv
import os

load_dotenv()  # Load .env variables
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")  # Now Flask recognizes it

jwt = JWTManager(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

# intialize SQLAlchemy
db= SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        if not data.get("username") or not data.get("password"):
            return jsonify({"error": "Username and password required"}), 400

        existing_user = User.query.filter_by(username=data["username"]).first()
        if existing_user:
            return jsonify({"error": "Username already exists"}), 409

        new_user = User(username=data["username"])
        new_user.set_password(data["password"])
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
            return jsonify({"status": "Failed", "error": str(e)}), 500


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(username=data["username"]).first()

    if user and user.check_password(data["password"]):
        access_token = create_access_token(identity=str(user.id))
        #  The identity parameter is used to specify the identity of the user for whom the token is being created.
        return jsonify({"access_token": access_token}), 200

    return jsonify({"error": "Invalid credentials"}), 401

with app.app_context():
    db.create_all()  

if __name__ == "__main__":

    app.run(debug=True,port=PORT)


