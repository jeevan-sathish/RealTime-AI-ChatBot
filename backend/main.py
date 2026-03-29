from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import calculate

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def greet():
    return {
        "message":"hello form FastAPi"
    }

@app.get('/demo')
def demo():
    return {
        "me"
    }

app.include_router(calculate.router,prefix="/api")