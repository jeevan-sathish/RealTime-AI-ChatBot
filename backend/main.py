from fastapi import FastAPI
from routers import user

app=FastAPI()

@app.get("/")
def home():
    return {"message":"Fast Api running"}

@app.get('/add')
def add(a:int,b:int):
    result =a=b
    return {
        "message":"the sum is :",
        "result":result
    }

app.include_router(user.router ,prefix='/api',tags=['Users'])