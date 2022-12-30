
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import re, jwt, pymongo

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'access': str(refresh.access_token),
    }

def test_password(password):
    regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$"
    pattern = re.compile(regex)
    match = re.match(pattern, password)

    if match:
        return True
    else:
        return False

def check_bearer_token(request):
    try:
        # Retrieving bearer token from headers.
        bearer = request.headers["Authorization"]

        # Retrieving JWT token.
        token = bearer.split(" ")[1]

        # Decoding token.
        return jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"])
    except:
        return None

def get_user_id_from_token(request):
    jwt = check_bearer_token(request)

    if jwt is None:
        return None

    return jwt["user_id"]

def get_collection(collection_name):
    try:
        client = pymongo.MongoClient("mongodb+srv://open_food_imie:open-food-facts-ms2d@openfoodcluster.nxwyor0.mongodb.net/?ssl=true&ssl_cert_reqs=CERT_NONE&retryWrites=true&w=majority")
        db = client["test"]
        collection = db[collection_name]

        return collection
    except:
        raise Exception(settings.INTERNAL_ERROR_MESSAGE)